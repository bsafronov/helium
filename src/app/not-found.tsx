import Link from "next/link";
import { buttonVariants } from "~/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2">
      <h1 className="text-4xl font-extrabold">404</h1>
      <h3 className="text-muted-foreground">Пользователь не найден</h3>
      <Link
        href={"/"}
        className={buttonVariants({ variant: "outline", size: "sm" })}
      >
        Вернуться на главную
      </Link>
    </div>
  );
}
