import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as nodemailer from 'nodemailer';

admin.initializeApp();

// Configure nodemailer with your email provider details
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'example@gmail.com', // Your Gmail email address
    pass: 'pass' // Your Gmail email password
  }
});

export const onUserSignup = functions.auth.user().onCreate(async (user) => {
  const { uid, email, displayName, photoURL  } = user;

  // Send a welcome email to the user
  const mailOptions = {
    from: 'albertkombol@gmail.com', // Sender's email address
    to: email, // Recipient's email address
    subject: 'Welcome to Balansake', // Email subject
    html: `
      <div style="background-color: #f0f0f0; padding: 20px; text-align: center;">
        <h2 style="color: #3498db;">Welcome to Balansake!</h2>
      </div>
  
      <div style="padding: 20px;">
        <p style="color: #333;">Hello ${displayName || 'User'},</p>
        <p style="color: #333;">Congratulations! You've just unleashed the Balancing Act! 🎉 Your personal hub for harmony!</p>
        <p style="color: #333;">We're excited to have you on board.</p>
      </div>
  
      <div style="background-color: #2c3e50; padding: 10px; color: #ecf0f1; text-align: center;">
        <p>Best regards,<br/>Balansake Team</p>
      </div>
  
      <div style="background-color: #34495e; padding: 20px; color: #ecf0f1; text-align: center;">
        <p>Sample Address:<br/>123 Balancing Street, Suite 456<br/>Harmony City, Balansaland</p>
      </div>
    `,
  };
  

  try {
    await admin.firestore().collection('users').doc(uid).set({
      email,
      displayName,
      photoURL,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
    console.log('User details added to Firestore:', uid);
    await transporter.sendMail(mailOptions);
    console.log('Welcome email sent successfully');
  } catch (error) {
    console.error('Error adding user details to Firestore:', error);
  }

  return null;
});
