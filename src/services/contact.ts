import { supabase } from "@/lib/supabase";

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export async function sendContactMessage(data: ContactMessage) {
  try {
    const { error } = await supabase
      .from("contact_messages") // A Supabase tábla neve
      .insert([data]);

    if (error) {
      console.error("Error inserting data: ", error);
      throw error;
    }

    return "Message sent successfully";
  } catch (error) {
    console.error("Error sending message: ", error);
    throw error;
  }
}