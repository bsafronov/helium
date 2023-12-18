import { type RouterOutputs } from "~/trpc/shared";

type Props = {
  message: RouterOutputs["message"]["getMany"][number];
};

export function MessageItem({ message }: Props) {
  return <li>MessageItem</li>;
}
