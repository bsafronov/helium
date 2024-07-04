"use client";

import { useMutation } from "@tanstack/react-query";
import { LoadingButton } from "./ui/loading-button";
import { signOut } from "@/actions/sign-out";

export const SignOutButton = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: signOut,
  });

  return (
    <LoadingButton onClick={() => mutate()} isLoading={isPending}>
      Выйти
    </LoadingButton>
  );
};
