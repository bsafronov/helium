import { validateRequest } from "@/lib/validate-request";
import { useQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const { data } = useQuery({
    queryKey: ["validate-request"],
    queryFn: validateRequest,
  });

  return data;
};
