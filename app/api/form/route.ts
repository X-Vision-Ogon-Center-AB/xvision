import { Resend } from "resend";
import { sendLeadToHubSpot } from "@/lib/hubspot";

const usermail = process.env.MARKNAD_EMAIL;
// Created on demand so the build does not need RESEND_API_KEY (preview deployments may not have it).
const getResend = () => new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message, phone, birthday, beskriv, attribution } = await req.json();

  const messageBody = `
    <div style="background-color: #f9f9f9; padding: 20px;">
      <p>Meddelande från: ${name}</p>
      <h3>Email: ${email}</h3>
      <p>Tel: ${phone}</p>
      <p>Födelsedatum: ${birthday}</p>
      <p>Vad vill du uppnå med en ögonoperation?: ${beskriv}</p>
      <p>Meddelande: ${message}</p>
    </div>
  `;
  try {
    const { data, error } = await getResend().emails.send({
      from: "Notifikation Kontakt Form <onboarding@resend.dev>",
      to: [`${usermail}`],
      subject: `Notifikation Kund ${name}`,
      html: messageBody,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    // Contact details + traffic source only; message and birth date stay in the e-mail above.
    await sendLeadToHubSpot({ name, email, phone, formType: "kontakt", attribution });

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
