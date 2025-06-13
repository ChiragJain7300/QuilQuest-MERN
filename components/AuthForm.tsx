"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import { ZodType } from "zod";

interface Props<T extends FieldValues> {
  schemaValidation: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; error?: string }>;
  formType: "SIGN_IN" | "SIGN_UP";
}
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FIELD_NAMES, FIELD_TYPES } from "@/constants";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import FileUpload from "./FileUpload";

const AuthForm = <T extends FieldValues>({
  formType,
  onSubmit,
  defaultValues,
  schemaValidation,
}: Props<T>) => {
  const router = useRouter();
  const isSignIn = formType === "SIGN_IN";

  // 1. Define your form.
  const form: UseFormReturn<T> = useForm({
    resolver: zodResolver(schemaValidation),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (data) => {
    const result = await onSubmit(data);
    if (result.success) {
      toast({
        title: isSignIn ? "Welcome back!" : "Account created!",
        description: isSignIn
          ? "You have successfully signed in."
          : "Your account has been created successfully.",
      });
      router.push("/");
    } else {
      console.log("Error:", result);

      toast({
        title: "Error",
        description:
          result.error ||
          result?.message ||
          "An error occurred. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold text-white">
        {isSignIn
          ? "Welcome back to QuillQuest"
          : "Create your Library Account"}
      </h1>
      <p className="text-sm text-muted-background">
        {isSignIn
          ? "Access the vast collection of resources, and stay updated"
          : "Please complete all fields and upload a valid university ID to gain access to the library"}
      </p>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="space-y-6 w-full"
        >
          {Object.keys(defaultValues).map((field) => (
            <FormField
              key={field}
              control={form.control}
              name={field as Path<T>}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="capitalize">
                    {FIELD_NAMES[field.name as keyof typeof FIELD_NAMES]}
                  </FormLabel>
                  <FormControl>
                    {field.name === "universityCard" ? (
                      <FileUpload
                        type="image"
                        placeholder="Upload your ID"
                        variant="dark"
                        folder="ids"
                        onFileChange={field.onChange}
                      />
                    ) : (
                      <Input
                        required
                        type={
                          FIELD_TYPES[field.name as keyof typeof FIELD_TYPES]
                        }
                        {...field}
                        className="form-input"
                      />
                    )}
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          ))}

          <Button
            type="submit"
            className="p-6 bg-primary text-lg text-secondary-foreground font-bold w-full"
          >
            {isSignIn ? "Sign In" : "Sign Up"}
          </Button>
          <p className="text-md text-muted-background text-center">
            {isSignIn
              ? "Already have an account?"
              : "New here? Create an account"}{" "}
            <Link
              className="text-primary"
              href={isSignIn ? "/sign-up" : "/sign-in"}
            >
              {isSignIn ? "Sign Up" : "Sign In"}
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
};

export default AuthForm;
