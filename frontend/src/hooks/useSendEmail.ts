import { getFirestore, collection, addDoc, doc, getDoc } from "firebase/firestore";

export const sendMissedMedicationEmail = async (
  userId: string,
  medicineName: string,
  date: string,
  time: string
): Promise<void> => {
  const db = getFirestore();

  try {
    // Fetch the user's document
    const userDocRef = doc(db, `Users/${userId}`);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error("User document does not exist.");
      return;
    }

    const userData = userDoc.data();
    const guardianEmail = userData?.guardianEmail;
    const firstName = userData?.firstName || "Your ward";

    if (!guardianEmail) {
      console.error("Guardian email is missing.");
      return;
    }

    // Compose the email details
    const subject = `🚨 Missed Medication Alert for ${firstName}!`;
    const text = `
Hi there,

This is a friendly reminder from MedAlert 💊. We noticed that ${firstName} has missed a scheduled medication. Staying on track with medications is crucial for maintaining health and wellness. 🩺✨

Here are the details:
- 📝 Medication Name: ${medicineName}
- 📅 Scheduled Date: ${date}
- 🕒 Scheduled Time: ${time}

Please ensure that ${firstName} takes this medication as soon as possible to avoid any complications. 💪

If you have any questions or concerns, don't hesitate to reach out to the MedAlert team. We're here to help! 🌟

Warm regards,  
The MedAlert Team 💊🚀
    `;

    // Add the email document to the mail collection
    await addDoc(collection(db, "mail"), {
      to: [guardianEmail], // Email recipient(s)
      message: {
        subject,
        text,
      },
    });

    console.log("Email queued for delivery.");
  } catch (error) {
    console.error("Error queuing email for delivery:", error);
  }
};
