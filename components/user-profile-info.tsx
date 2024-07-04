import { Calendar } from "lucide-react";
import { Card } from "./ui/card";

export const UserProfileInfo = () => {
  return (
    <Card>
      <h5 className="font-semibold mb-8">Богдан Сафронов</h5>
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <Calendar className="size-4 inline-block" />
        Пришёл 4 июля 2024 г.
      </div>
    </Card>
  );
};
