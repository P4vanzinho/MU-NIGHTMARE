import type { State, User } from "@/types/domain";
export function updateUser(state: State, next: User): State {
  return {
    ...state,
    users: state.users.map((u) => (u.username === next.username ? next : u)),
  };
}
