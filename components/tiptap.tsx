"use client";

import { cn } from "@/lib/utils";
import Placeholder from "@tiptap/extension-placeholder";
import Text from "@tiptap/extension-text";
import TextStyle from "@tiptap/extension-text-style";
import {
  BubbleMenu,
  Editor,
  EditorContent,
  FloatingMenu,
  useEditor,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code2,
  Heading1,
  Heading2,
  Italic,
  ListOrdered,
  LucideIcon,
  Palette,
  Strikethrough,
} from "lucide-react";
import { HexColorPicker } from "react-colorful";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

type Props = {
  value?: string;
  onChange?: (text: string) => void;
};

export const Tiptap = ({ onChange, value }: Props) => {
  const editor = useEditor({
    editorProps: {
      attributes: {
        class:
          "p-2 hover:outline-none outline-none prose-sm focus:outline-none prose-amber ",
      },
    },
    extensions: [
      StarterKit,
      TextStyle,
      Text,
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "paragraph") {
            return "Напишите свой текст...";
          }

          return "Напишите что-нибудь...";
        },
      }),
    ],
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    content: value,
  });

  if (!editor) return null;

  return (
    <>
      <BubbleMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="flex items-center gap-1 rounded-md bg-sky-200 p-1 border"
      >
        <EditorMenu editor={editor} />
      </BubbleMenu>

      <FloatingMenu
        editor={editor}
        tippyOptions={{ duration: 100 }}
        className="flex items-center gap-1 rounded-md bg-sky-200 p-1 border"
      >
        <EditorMenu editor={editor} />
      </FloatingMenu>

      <EditorContent editor={editor} />
    </>
  );
};

type EditorButtonProps = {
  icon: LucideIcon;
} & React.ComponentPropsWithoutRef<"button">;

const EditorButton = ({
  icon: Icon,
  className,
  ...props
}: EditorButtonProps) => {
  return (
    <button
      className={cn(
        "flex items-center justify-center border rounded-sm size-6",
        className
      )}
      {...props}
    >
      <Icon className="size-4" />
    </button>
  );
};

const EditorMenu = ({ editor }: { editor: Editor }) => {
  return (
    <>
      <EditorButton
        icon={Heading1}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={cn(
          editor.isActive("heading", { level: 1 }) && "bg-background"
        )}
      />
      <EditorButton
        icon={Heading2}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={cn(
          editor.isActive("heading", { level: 2 }) && "bg-background"
        )}
      />
      <EditorButton
        icon={ListOrdered}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={cn(editor.isActive("orderedList") && "bg-background")}
      />
      <EditorButton
        icon={Bold}
        onClick={() => editor?.chain().focus().toggleBold().run()}
        disabled={!editor?.can().chain().focus().toggleBold().run()}
        className={cn(editor?.isActive("bold") && "bg-background")}
      />
      <EditorButton
        icon={Italic}
        onClick={() => editor?.chain().focus().toggleItalic().run()}
        disabled={!editor?.can().chain().focus().toggleItalic().run()}
        className={cn(editor?.isActive("italic") && "bg-background")}
      />
      <EditorButton
        icon={Strikethrough}
        onClick={() => editor?.chain().focus().toggleStrike().run()}
        disabled={!editor?.can().chain().focus().toggleStrike().run()}
        className={cn(editor?.isActive("strike") && "bg-background")}
      />
      <EditorButton
        icon={Code2}
        onClick={() => editor?.chain().focus().toggleCode().run()}
        disabled={!editor?.can().chain().focus().toggleCode().run()}
        className={cn(editor?.isActive("code") && "bg-background")}
      />
      <Popover>
        <PopoverTrigger asChild>
          <EditorButton icon={Palette} />
        </PopoverTrigger>
        <PopoverContent>
          <HexColorPicker />
        </PopoverContent>
      </Popover>
    </>
  );
};
