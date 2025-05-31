import { transporter } from './transporter';

type Product = {
  id: string;
  name: string;
  image_url: string;
};

type Customer = {
  full_name: string;
  email: string;
  phone_number: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
};

function generateOrderConfirmationEmail({
  orderId,
  products,
  customer
}: {
  orderId: string;
  products: Product[];
  customer: Customer;
}) {
  const productList = products
    .map(
      p => `
        <li style="margin-bottom: 12px;">
          <img src="${p.image_url}" alt="${p.name}" width="80" style="border-radius: 8px; display: block; margin-bottom: 4px;" />
          <strong>${p.name}</strong> (ID: ${p.id})
        </li>
      `
    )
    .join('');

  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>Order Confirmation - Order #${orderId}</h2>
      <p>Thank you for your purchase, <strong>${customer.full_name}</strong>!</p>

      <h3>🛍️ Order Summary:</h3>
      <ul style="list-style-type: none; padding-left: 0;">
        ${productList}
      </ul>

      <h3>📦 Shipping Details:</h3>
      <p>
        ${customer.full_name}<br />
        ${customer.address}<br />
        ${customer.city}, ${customer.state} - ${customer.zip_code}<br />
        Phone: ${customer.phone_number}<br />
        Email: ${customer.email}
      </p>

      <p>We are processing your order and will notify you once it's shipped.</p>
      <p>Thank you for shopping with <strong>FemmeLady</strong>!</p>
    </div>
  `;
}

export async function sendOrderConfirmationEmail({
  to,
  orderId,
  products,
  customer
}: {
  to: string;
  orderId: string;
  products: Product[];
  customer: Customer;
}) {
  const html = generateOrderConfirmationEmail({ orderId, products, customer });

  await transporter.sendMail({
    from: 'no-reply@femmelady.store',
    to,
    subject: `Your Order #${orderId} Confirmation`,
    html
  });
}

function generateTransactionFailedEmail({ customer }: { customer: Customer }) {
  return `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h2>⚠️ Transaction Failed - Order Not Completed</h2>
      <p>Dear <strong>${customer.full_name}</strong>,</p>

      <p>We regret to inform you that your recent transaction could not be completed due to a payment issue.</p>

      <h3>❌ What went wrong?</h3>
      <p>
        The payment was declined or could not be processed. This may happen due to:
      </p>
      <ul>
        <li>Insufficient funds</li>
        <li>Incorrect card details</li>
        <li>Your bank declining the payment</li>
      </ul>

      <h3>💳 Next Steps:</h3>
      <p>
        Please try again using a different payment method, or contact your bank for assistance.
        You can return to your cart and complete your purchase at any time.
      </p>

      <p>If you need help, please reach out to our support team at <a href="mailto:support@femmelady.store">support@femmelady.store</a>.</p>

      <p>We hope to serve you soon!</p>
      <p>— The <strong>FemmeLady</strong> Team</p>
    </div>
  `;
}

export async function sendTransactionFailedEmail({
  to,
  customer
}: {
  to: string;
  customer: Customer;
}) {
  const html = generateTransactionFailedEmail({ customer });

  await transporter.sendMail({
    from: 'no-reply@femmelady.store',
    to,
    subject: '⚠️ Your transaction could not be completed',
    html
  });
}
