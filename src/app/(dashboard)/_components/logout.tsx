"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import { Button } from "~/components/ui/button";

export function Logout() {
  return (
    <Button variant={"outline"} size={"icon"} onClick={() => void signOut()}>
      <LogOut className="h-4 w-4" />
    </Button>
  );
}
