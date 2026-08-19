import twilio from "twilio";
import { env } from "../config/env.js";

let client: twilio.Twilio | null = null;

const getClient = (): twilio.Twilio | null => {
  if (!env.TWILIO_ACCOUNT_SID || !env.TWILIO_AUTH_TOKEN) {
    return null;
  }

  if (!client) {
    client = twilio(env.TWILIO_ACCOUNT_SID, env.TWILIO_AUTH_TOKEN);
  }

  return client;
};

export const sendWhatsAppOtp = async (phone: string, otp: string): Promise<void> => {
  const twilioClient = getClient();

  if (!twilioClient || !env.TWILIO_WHATSAPP_FROM) {
    return;
  }

  await twilioClient.messages.create({
    from: `whatsapp:${env.TWILIO_WHATSAPP_FROM}`,
    to: `whatsapp:${phone}`,
    body: `Your CommerceX verification code is ${otp}. It expires in 5 minutes. Do not share this code with anyone.`,
  });
};
