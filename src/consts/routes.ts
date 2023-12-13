export type Route = {
  label: string;
  href: string;
};

export const MAIN: Route = {
  label: "Главная",
  href: "/",
};

export const DASHBOARD: Route = {
  label: "Панель управления",
  href: "/dashboard",
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

export const MY_GROUPS: Route = {
  label: "Мои группы",
  href: "/dashboard/groups",
};

export const NEW_GROUP: Route = {
  label: "Создание группы",
  href: "/dashboard/groups/new",
};
