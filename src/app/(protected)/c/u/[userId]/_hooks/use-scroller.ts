"use client";
import { useEffect } from "react";
import { type UCMessage } from "../_types";

type Props = {
  bottomRef: React.RefObject<HTMLDivElement | null>;
  messages?: UCMessage[];
};
export function useScroller({ bottomRef, messages }: Props) {
  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [messages]);
}
