import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";

export const loginAction = async (
  _prevState: string | undefined,
  formData: FormData
) => {
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  try {
    await signIn("credentials", { ...credentials, callbackUrl: "/dashboard" });
  } catch (error) {
    if (error instanceof Error) {
      return error.message;
    } else {
      return String(error);
    }
  }
};
