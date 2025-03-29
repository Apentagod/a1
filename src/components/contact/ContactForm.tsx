import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { contactService } from "@/services/contact";
import { PopupMessage } from "./PopupMessage";

const formSchema = z.object({
  name: z.string().min(2, "A név legalább 2 karakter hosszú legyen"),
  email: z.string().email("Érvénytelen email cím"),
  message: z.string().min(10, "Az üzenet legalább 10 karakter hosszú legyen")
});

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [popup, setPopup] = useState<{
    show: boolean;
    message: string;
    type: "success" | "error";
  }>({
    show: false,
    message: "",
    type: "success"
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: ""
    }
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const result = await contactService.sendMessage(values);
      if (result.success) {
        setPopup({
          show: true,
          message: "Sikeresen elküldted az e-mailt, hamarosan válaszolunk!",
          type: "success"
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setPopup({
        show: true,
        message: "Hiba történt, kérjük próbáld újra később!",
        type: "error"
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1A2238] font-montserrat font-medium">
                  Név
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white rounded-xl border-2 border-transparent focus:border-[#00DDEB] 
                      transition-colors duration-200 font-montserrat"
                    placeholder="Add meg a neved"
                    aria-label="Név"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="font-montserrat text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1A2238] font-montserrat font-medium">
                  Email cím
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    className="bg-white rounded-xl border-2 border-transparent focus:border-[#00DDEB] 
                      transition-colors duration-200 font-montserrat"
                    placeholder="Add meg az email címed"
                    aria-label="Email cím"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="font-montserrat text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="message"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-[#1A2238] font-montserrat font-medium">
                  Üzenet
                </FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    className="bg-white rounded-xl min-h-[120px] border-2 border-transparent focus:border-[#00DDEB] 
                      transition-colors duration-200 font-montserrat resize-none"
                    placeholder="Írd le az üzeneted"
                    aria-label="Üzenet"
                    disabled={isSubmitting}
                  />
                </FormControl>
                <FormMessage className="font-montserrat text-red-500" />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-[#7B3FE4] hover:bg-[#00DDEB] text-white font-semibold
              py-6 rounded-xl transform hover:scale-105 transition-all duration-300"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Küldés..." : "Üzenet Küldése"}
          </Button>
        </form>
      </Form>

      {popup.show && (
        <PopupMessage
          message={popup.message}
          type={popup.type}
          onClose={() => setPopup({ ...popup, show: false })}
        />
      )}
    </>
  );
}
