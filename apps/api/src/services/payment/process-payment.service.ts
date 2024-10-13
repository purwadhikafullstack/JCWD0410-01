import { MIDTRANS_CLIENT_KEY, MIDTRANS_SERVER_KEY } from '@/config';
import prisma from '@/prisma';
import { Prisma } from '@prisma/client';
import { MidtransClient } from 'midtrans-node-client';
import { scheduleJob } from 'node-schedule';
import { updatePaymentStatusService } from './update-payment-status.service';

interface ProcessPayment {
  orderId: number;
}

export const processPaymentService = async (
  body: ProcessPayment,
  userId: number,
) => {
  try {
    const { orderId } = body;

    const user = await prisma.user.findFirst({
      where: { id: userId, isDeleted: false },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const existingOrder = await prisma.order.findFirst({
      where: { id: orderId, isDeleted: false },
    });

    if (!existingOrder) {
      throw new Error('Order Not Found!');
    }

    if (existingOrder.userId !== userId) {
      throw new Error('User not authorized');
    }

    if (
      existingOrder.orderStatus === 'WAITING_FOR_PICKUP_DRIVER' ||
      existingOrder.orderStatus === 'PICKUP_ON_THE_WAY_TO_CUSTOMER' ||
      existingOrder.orderStatus === 'PICKUP_ON_THE_WAY_TO_OUTLET' ||
      existingOrder.orderStatus === 'ARRIVED_AT_OUTLET'
    ) {
      throw new Error('Waiting for admin to process');
    }

    if (existingOrder.isPaid) {
      const successPayment = await prisma.payment.findFirst({
        where: { orderId: orderId, status: 'SUCCESS' },
      });
      return successPayment;
    }

    const outstandingPayment = await prisma.payment.findFirst({
      where: {
        isDeleted: false,
        orderId: orderId,
        status: 'PENDING',
        snapToken: { not: null },
      },
    });

    if (outstandingPayment) {
      return outstandingPayment;
    }

    return await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const count = await tx.payment.count({
        where: { orderId },
      });

      const invoiceNumber =
        'INV-' + existingOrder.orderNumber + `-${count + 1}`;

      const payload = {
        transaction_details: {
          order_id: invoiceNumber,
          gross_amount: existingOrder.total,
        },
      };

      const snap = new MidtransClient.Snap({
        isProduction: false,
        clientKey: MIDTRANS_CLIENT_KEY,
        serverKey: MIDTRANS_SERVER_KEY,
      });

      const transaction = await snap.createTransaction(payload);

      const payment = await tx.payment.create({
        data: {
          orderId,
          invoiceNumber,
          amount: existingOrder.total,
          snapToken: transaction.token,
          snapRedirectUrl: transaction.redirect_url,
        },
      });

      const fiveMinuteFromNow = new Date(Date.now() + 180 * 1000);
      scheduleJob(invoiceNumber, fiveMinuteFromNow, async () => {
        updatePaymentStatusService(invoiceNumber, 'EXPIRED', tx)
      });

      return payment;
    });
  } catch (error) {
    throw error;
  }
};
