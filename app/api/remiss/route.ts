
import { Resend } from "resend";

const usermail = process.env.MARKNAD_EMAIL;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { name, email, message, beskriv, birthday, othercontact, phone } = await req.json();

  const messageBody = `
    <div style="background-color: #f9f9f9; padding: 20px;">
      <p>Meddelande från: ${name}</p>
      <h3>Email: ${email}</h3>
      <p>Tel: ${phone}</p>
      <p>Födelsedag: ${birthday}</p>
      <p>Beskrivning: ${beskriv}</p>
      <p>Meddelande: ${message}</p>
      <p>Annan kontakt med vårdcentral etc? ${othercontact ? "Ja" : "Nej"}</p>
    </div>
  `;
  try {
    const { data, error } = await resend.emails.send({
      from: "Remiss Form <onboarding@resend.dev>",
      to: [`${usermail}`],
      subject: `Notifikation Kund ${name}`,
      html: messageBody,
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
