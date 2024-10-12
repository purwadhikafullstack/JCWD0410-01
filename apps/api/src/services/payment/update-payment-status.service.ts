import { OrderStatus, PaymentStatus, Prisma } from '@prisma/client';

export const updatePaymentStatusService = async (
  invoice: string,
  status: PaymentStatus,
  tx: Prisma.TransactionClient,
) => {
  try {
    if (!status) {
      throw new Error('Wajib ada status, ini placeholder, pindah ke validator');
    }

    if (!invoice) {
      throw new Error(
        'Wajib ada invoice, ini placeholder, pindah ke validator',
      );
    }

    const payment = await tx.payment.findFirst({
      where: { invoiceNumber: invoice, isDeleted: false },
    });

    if (!payment) {
      throw new Error(
        'Payment not found',
      );
    }

    await tx.payment.update({
      where: {invoiceNumber: invoice},
      data: {status}
    })

    return { message: 'Update payment status success' };
  } catch (error) {
    throw error;
  }
};
