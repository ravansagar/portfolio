import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method === 'POST') {
    try {
      const { name, email, message } = await req.json();

      const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = twilio(accountSid, authToken);

    const twilioWhatsappNumber = `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`;
    const myWhatsappNumber = `whatsapp:${process.env.MY_WHATSAPP_NUMBER}`;

    const response = await client.messages.create({
      to: myWhatsappNumber, // Receiver's WhatsApp number
      from: twilioWhatsappNumber, // Twilio WhatsApp number
      body: `New contact form submission:
      
      Name: ${name}
      Email: ${email}
      Message: ${message}`, // Template with dynamic variables
    });

    // Return a success response
    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error("Error sending WhatsApp message: ", error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
}