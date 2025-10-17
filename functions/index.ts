// functions/index.ts
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

admin.initializeApp();
const db = admin.firestore();

const sendgridApiKey = functions.config().sendgrid.api_key;
const senderEmail = functions.config().sender.email; // This is configured in Firebase env vars

sgMail.setApiKey(sendgridApiKey);

// --- Set Tenant ID on New User Creation (NEW) ---
export const setTenantOnUserCreate = functions.auth.user().onCreate(async (user) => {
    // This function creates a tenant for the user and sets it as a custom claim.
    // This is crucial for our multi-tenant backend agent.
    const { uid } = user;
    const tenantId = `tenant_${uid}`; // Simple tenant ID based on user UID

    try {
        // 1. Create a tenant document in Firestore
        await db.collection('tenants').doc(tenantId).set({
            ownerUid: uid,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
            plan: 'core', // Default plan
        });

        // 2. Set custom claims on the user's auth token
        await admin.auth().setCustomUserClaims(uid, {
            tenantId: tenantId,
            roles: ['admin'] // Assign a default role
        });

        console.log(`Successfully created tenant ${tenantId} and set custom claims for user ${uid}.`);
        return null;
    } catch (error) {
        console.error(`Error setting tenant and claims for user ${uid}:`, error);
        // We could potentially delete the user here to force a retry,
        // but for now, we'll just log the error.
        return null;
    }
});


// --- Simple Playbook Email Sender (Existing) ---
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
      from: {
        name: 'Raystrat',
        email: 'team@raystratsystems.com'
      },
      subject: "Your Playbook",
      text: "Thank you for requesting our playbook! Please find it attached.",
      html: "<p>Thank you for requesting our playbook! Please find it attached.</p>",
      attachments: [],
    };

    try {
      await sgMail.send(msg);
      console.log(`Playbook email sent to ${recipientEmail}`);
      return null;
    } catch (error) {
      console.error(`Error sending playbook email to ${recipientEmail}:`, error);
      if (error.response) {
        console.error(error.response.body);
      }
      return null;
    }
  });
