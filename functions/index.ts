import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

admin.initializeApp();

const sendgridApiKey = functions.config().sendgrid.api_key;
const senderEmail = functions.config().sender.email;

sgMail.setApiKey(sendgridApiKey);

export const sendPlaybookEmail = functions.firestore
  .document("playbook_leads/{leadId}")
  .onCreate(async (snapshot, context) => {
    const leadData = snapshot.data();
    const recipientEmail = leadData.email;

    if (!recipientEmail) {
      console.error("No email found for the new lead.");
      return null;
    }

    const msg = {
      to: recipientEmail,
      from: senderEmail,
      subject: "Your Playbook",
      text: "Thank you for requesting our playbook! Please find it attached.",
      html: "<p>Thank you for requesting our playbook! Please find it attached.</p>",
      attachments: [
        // TODO: Add logic here to read the PDF file and attach it.
        // Example for a file in your functions directory (you'll need to adjust the path):
        // {
        //   content: fileBase64, // Base64 encoded content of the PDF
        //   filename: 'playbook.pdf',
        //   type: 'application/pdf',
        //   disposition: 'attachment',
        // },
      ],
    };

    try {
      await sgMail.send(msg);
      console.log(`Playbook email sent to ${recipientEmail}`);
      return null;
    } catch (error) {
      console.error(`Error sending playbook email to ${recipientEmail}:`, error);
      // Depending on the error, you might want to log more details or handle specific errors
      if (error.response) {
        console.error(error.response.body);
      }
      return null;
    }
  });