const nodemailer = require("nodemailer");

// Set up the "Post Office" (Transporter)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mzulfiqarahmad1122@gmail.com", // Your Gmail
    pass: "kplk vwvr dlmj wdqn",   // The 16-character App Password
  },
});

const sendOrderEmail = async (userEmail, userName, orderDetails) => {
  // Generate the HTML for the items list
  const itemsHtml = orderDetails
    .map(item => `
      <li style="border-bottom: 1px solid #ddd; padding: 10px 0; list-style: none;">
        <strong>${item.name}</strong> - Rs. ${item.price}
      </li>`)
    .join("");

  const mailOptions = {
    from: '"7 Guys Restaurant" <your-email@gmail.com>',
    to: userEmail,
    subject: "Order Confirmed! 🍕",
    html: `
      <div style="font-family: Arial, sans-serif; border: 2px solid #15803d; padding: 20px; border-radius: 10px;">
        <h1 style="color: #15803d;">7 <span style="color: #facc15;">Guys</span></h1>
        <h2>Hi ${userName},</h2>
        <p>Your order has been received and is being prepared!</p>
        <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
          <h3>Order Details:</h3>
          <ul>${itemsHtml}</ul>
        </div>
        <p>Thank you for choosing 7 Guys!</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent to: " + userEmail);
  } catch (error) {
    console.error("Email Error:", error);
  }
};

module.exports = sendOrderEmail;