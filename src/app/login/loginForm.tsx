"use client";

import React from "react";
import { useFormState } from "react-dom";

import { loginAction } from "./actions";

export const Login = () => {
  const [state, formAction] = useFormState(loginAction, undefined);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    formAction(formData);
  };

  return (
    <div className="flex flex-col gap-2 w-3/4 m-auto">
      {state && (
        <p className="bg-red-100 text-red-600 text-center p-2">{state}</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input type="email" name="email" required className="border-2" />
        <input type="password" name="password" required className="border-2" />
        <button type="submit" className="bg-slate-300">
          Login
        </button>
      </form>
    </div>
  );
};
