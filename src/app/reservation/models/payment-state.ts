export enum PaymentState {
  ACCEPTED = "ACCEPTED", //Indicates that the payment has been accepted and the transaction has been successfully processed
  CANCELED = "CANCELED", // Indicates that the transaction has been cancelled before being finalized. This can result from voluntary cancellation by the customer or a payment failure.
  PENDING = "PENDING", // Indicates that the payment is being processed or under review, and the transaction has not been finalized yet. This may include payments pending verification by the payment processor or payments requiring additional authorization.
  REFUNDED = "REFUNDED", // Indicates that the payment has been refunded, either partially or in full, either voluntarily by the merchant or in response to a customer refund request

}
