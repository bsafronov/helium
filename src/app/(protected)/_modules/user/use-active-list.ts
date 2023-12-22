import { create } from "zustand";

interface ActiveListStore {
  members: string[];
  add: (id: string) => void;
  remove: (id: string) => void;
  set: (ids: string[]) => void;
  isOnline: (id?: string | null) => boolean;
}

export const useActiveList = create<ActiveListStore>((set, get) => ({
  members: [],
  add: (id) => {
    const updatedMembers = [...get().members, id];
    set({ members: updatedMembers });
  },
  remove: (id) => {
    const updatedMembers = get().members.filter((memberId) => memberId !== id);
    set({ members: updatedMembers });
  },
  set: (ids) => set({ members: ids }),
  isOnline: (id) => {
    if (!id) return false;
    return get().members.includes(id);
  },
}));
