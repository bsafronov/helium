"use client";

import { useMutation } from "@tanstack/react-query";
import { Tiptap } from "./tiptap";
import { Button } from "./ui/button";
import { createPost } from "@/actions/create-post";
import { toast } from "sonner";
import { useState } from "react";

export const CreatePostForm = () => {
  const [text, setText] = useState("");
  console.log(text);

  const { mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: () => toast.success("Пост опубликован!"),
    onError: (error) => toast.error(error.message),
  });

  const handleSubmit = () => {
    mutate({ text });
    setText("");
  };

  return (
    <div className="border rounded-md bg-background relative">
      <Tiptap onChange={(text) => setText(text)} />
      <div className="flex justify-end border-t p-2">
        <Button size={"sm"} onClick={handleSubmit}>
          Опубликовать
        </Button>
      </div>
    </div>
  );
};
