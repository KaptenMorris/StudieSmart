"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {Form} from "@/components/ui/form";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import FormField from "./FormField";
import { useRouter } from "next/navigation";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase/client";
import { signUp, signIn } from "@/lib/actions/auth.actions";




const authFormSchema = (type: FormType) => {
    return z.object({
        name: type as string === 'registrera' ? z.string().min(3) : z.string().optional(),
        email: z.string().email(),
        password: z.string().min(6),
    })
}

const AuthForm = ({ type }: { type: FormType }) => {
    const router = useRouter();
    const formSchema = authFormSchema(type);
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
        if(type as string === "registrera") {
          const { name, email, password } = data;

          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );

          const result = await signUp({
            uid: userCredential.user.uid,
            name: name!,
            email,
            password,
          });

          if(!result?.success) {
            toast.error(result?.message);
            return;
          }

            toast.success("Registrering lyckades");
            router.push("/logga-in");
        } else {
            const { email, password } = data;

            const userCredentials = await signInWithEmailAndPassword(
              auth, 
              email, 
              password);

            const idToken = await userCredentials.user.getIdToken();

            if(!idToken) {
              toast.error("Inloggning misslyckades");
              return;
            }

            await signIn({ email, idToken });

            toast.success("Inloggning lyckades");
            router.push("/");
        }
    } catch (error) {
        console.log(error);
        toast.error("Något gick fel: ${error}");
    }
  }

  const isSignIn = type as string === "logga-in";

  return (
    <div className="card-border lg:min-w-[566px]">
      <div className="flex flex-col gap-6 card py-14 px-10">
        <div className="flex flex-row gap-2 justify-center">
          <Image src="/logo.svg" alt="logo" width={32} height={38} />
          <h2 className="text-primary-100">StudieSmart</h2>
        </div>
        <h3>Öva anställningsintervju med AI</h3>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 mt-4 form"
          >
            {!isSignIn && (
              <FormField 
              control={form.control} 
              name="name" 
              label="Namn"
              placeholder="Ditt Namn"
              type="text"
              />
            )}
            <FormField 
              control={form.control} 
              name="email" 
              label="E post"
              placeholder="Din e post"
              type="email"
              />
            <FormField 
              control={form.control} 
              name="password" 
              label="Lösenord"
              placeholder="Ditt Lösenord"
              type="password"
              />
            <Button className="btn" type="submit">
              {isSignIn ? "Logga in" : "Skapa konto"}
            </Button>
          </form>
        </Form>

        <p className="text-center">
          {isSignIn ? "Har du inget konto?" : "Har du redan ett konto?"}
          <Link
            href={!isSignIn ? "/logga-in" : "/registrera"}
            className="font-bold text-user-primary"
          >
            {" "}
            {!isSignIn ? "Logga in" : "Skapa konto"}{" "}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
