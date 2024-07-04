import { validateRequest } from "@/lib/validate-request";
import { Card } from "./ui/card";
import { NavbarItem } from "./navbar-item";
import { GalleryHorizontalEnd, Music, User2 } from "lucide-react";

export const Navbar = async () => {
  const { session, user } = await validateRequest();

  if (!session || !user) {
    return null;
  }

  return (
    <Card>
      <div className="flex flex-col gap-1">
        <NavbarItem href={`/profile/${user.username}`} label="Профиль">
          <User2 className="h-4 w-4" />
        </NavbarItem>
        <NavbarItem href={`/gallery/${user.username}`} label="Галерея">
          <GalleryHorizontalEnd className="h-4 w-4" />
        </NavbarItem>
        <NavbarItem href={`/music/${user.username}`} label="Музыка">
          <Music className="h-4 w-4" />
        </NavbarItem>
      </div>
    </Card>
  );
};
