import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as sgMail from "@sendgrid/mail";

admin.initializeApp();

const sendgridApiKey = functions.config().sendgrid.api_key;
const senderEmail = functions.config().sender.email;

sgMail.setApiKey(sendgridApiKey);

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
      from: senderEmail,
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


// --- Follow-Up Agent ---

const sequence = [
    {
      delayDays: 2,
      subject: "Following up on your interest",
      body: "<p>Hi {{name}},</p><p>Just wanted to follow up on your interest in the {{agentName}}. Have you had a chance to look at the details? Let me know if you have any questions.</p><p>Best,<br>The Raystrat Systems Team</p>",
    },
    {
      delayDays: 3,
      subject: "Any questions about {{agentName}}?",
      body: "<p>Hi {{name}},</p><p>Circling back one more time. We find that clients who use the {{agentName}} save an average of 10 hours per week. If that sounds like a priority, you can book a demo here: [Calendly Link]</p><p>Best,<br>The Raystrat Systems Team</p>",
    }
];

export const followUpAgent = functions.pubsub.schedule("every 60 minutes").onRun(async (context) => {
    console.log("Running Follow-Up Agent...");

    const now = new Date();
    const query = admin.firestore().collection("favorite_agent_leads")
        .where("sequenceState", "==", "active")
        .where("nextStepScheduledAt", "<=", now);

    const dueLeads = await query.get();

    if (dueLeads.empty) {
        console.log("No leads due for follow-up.");
        return null;
    }

    const promises = dueLeads.docs.map(async (doc) => {
        const lead = doc.data();
        const stepIndex = lead.currentStep;

        if (stepIndex >= sequence.length) {
            console.log(`Lead ${doc.id} has completed the sequence.`);
            return doc.ref.update({ sequenceState: "completed" });
        }

        const step = sequence[stepIndex];
        
        console.log(`Processing lead ${doc.id} for step ${stepIndex + 1}.`);

        const msg = {
            to: lead.email,
            from: senderEmail,
            subject: step.subject.replace("{{agentName}}", lead.agentName),
            html: step.body.replace("{{name}}", lead.name).replace("{{agentName}}", lead.agentName),
        };

        try {
            await sgMail.send(msg);

            const nextStepIndex = stepIndex + 1;
            let updateData: any = {
                currentStep: nextStepIndex,
                lastStepCompletedAt: new Date(),
            };

            if (nextStepIndex < sequence.length) {
                const nextStep = sequence[nextStepIndex];
                const nextStepDate = new Date();
                nextStepDate.setDate(nextStepDate.getDate() + nextStep.delayDays);
                updateData.nextStepScheduledAt = nextStepDate;
            } else {
                updateData.sequenceState = "completed";
                updateData.nextStepScheduledAt = null;
            }

            return doc.ref.update(updateData);

        } catch (error) {
            console.error(`Failed to send email for lead ${doc.id}:`, error);
            if (error.response) {
                console.error(error.response.body)
            }
            // Optional: Mark as "failed" to prevent retries
            return doc.ref.update({ sequenceState: "failed" });
        }
    });

    await Promise.all(promises);
    console.log(`Follow-Up Agent finished processing ${dueLeads.size} leads.`);
    return null;
});
