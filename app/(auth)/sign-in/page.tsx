"use client";
import AuthForm from "@/components/AuthForm";
import { signInWithCredentials } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/validations";
import React, { use } from "react";

const SignInPage = () => {
  return (
    <AuthForm
      formType="SIGN_IN"
      schemaValidation={signInSchema}
      defaultValues={{ email: "", password: "" }}
      onSubmit={signInWithCredentials}
    />
  );
};

export default SignInPage;
