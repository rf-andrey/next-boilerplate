import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Login } from "./loginForm";

export default function LoginPage() {
  const loginAction = async (formData: FormData) => {
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const user = await signIn("credentials", { email, password });
      console.log(user);
      redirect("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        return error.message;
      } else {
        return String(error);
      }
    }
  };

  return (
    <div>
      <h2 className="p-2 text-center text-slate-600">Login Page</h2>
      <div className="flex flex-col gap-2">
        <Login />
      </div>
    </div>
  );
}
