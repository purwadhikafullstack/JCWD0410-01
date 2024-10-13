import { PaymentStatus, Prisma } from '@prisma/client';

export const updatePaymentStatusService = async (
  invoice: string,
  status: PaymentStatus,
  tx: Prisma.TransactionClient,
) => {
  try {

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
