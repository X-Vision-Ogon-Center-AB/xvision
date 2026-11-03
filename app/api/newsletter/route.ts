
import { Resend } from "resend";

const usermail = process.env.MARKNAD_EMAIL;
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const { email } = await req.json();

  const messageBody = `
    <div style="background-color: #f9f9f9; padding: 20px;">
      <p>Newsletter for popup</p>
      <h3>Email: ${email}</h3>
    </div>
  `;
  try {
    const { data, error } = await resend.emails.send({
      from: "Notifikation Newsletter <onboarding@resend.dev>",
      to: [`${usermail}`],
      subject: `Notifikation newsletter`,
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
