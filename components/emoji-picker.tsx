"use client";

import EmojiPickerReact, { Categories } from "emoji-picker-react";
import { Smile } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CategoriesConfig } from "emoji-picker-react/dist/config/categoryConfig";
import { useState } from "react";

const categories: CategoriesConfig = [
  {
    category: Categories.SUGGESTED,
    name: "Недавние",
  },
  {
    category: Categories.SMILEYS_PEOPLE,
    name: "Смайлы и люди",
  },
  {
    category: Categories.ACTIVITIES,
    name: "Активности",
  },
  {
    category: Categories.ANIMALS_NATURE,
    name: "Животные и природа",
  },
  {
    category: Categories.FOOD_DRINK,
    name: "Еда и напитки",
  },

  {
    category: Categories.TRAVEL_PLACES,
    name: "Путешествия и места",
  },
  {
    category: Categories.SYMBOLS,
    name: "Символы",
  },
  {
    category: Categories.FLAGS,
    name: "Флаги",
  },
];

type Props = React.ComponentPropsWithoutRef<typeof EmojiPickerReact>;
export const EmojiPicker = ({ ...props }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="absolute bottom-2 right-2">
        <Smile className="size-4" onClick={() => setOpen((prev) => !prev)} />
      </button>
      <EmojiPickerReact
        open={open}
        lazyLoadEmojis
        searchPlaceholder="Искать эмодзи..."
        {...props}
      />
    </>
  );
};
