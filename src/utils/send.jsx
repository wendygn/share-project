import Email from "@/app/_component/email-Reset";
import { Resend } from "resend";
import { render } from "@react-email/render";

export async function sendResetEmail(email) {
  const resendApi = process.env.RESEND_API_KEY;
  const resend = new Resend(resendApi);
  const emailHtml = await render(<Email email={email}/>)
  await resend.emails.send({
    from: "Resend <onboarding@resend.dev>",
    to: [email],
    subject: "Hello world",
    html : emailHtml
  });
}
