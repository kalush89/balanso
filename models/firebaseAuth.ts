import { AuthUser } from "./authUser";
export interface FirebaseAuthProps {
    authUser: AuthUser | null;
    isLoading: boolean;
    logOut: () => {};
  }