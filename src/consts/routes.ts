export type Route = {
  label: string;
  href: string;
};

export const MAIN: Route = {
  label: "Главная",
  href: "/",
};

export const AUTH: Route = {
  label: "Авторизация",
  href: "/auth",
};

export const PROFILE: Route = {
  label: "Профиль",
  href: "/profile",
};

export const MARKET: Route = {
  label: "Торговая площадка",
  href: "/market",
};

export const GROUPS: Route = {
  label: "Группы",
  href: "/groups",
};

export const NEW_GROUP: Route = {
  label: "Создание группы",
  href: "/groups/new",
};
