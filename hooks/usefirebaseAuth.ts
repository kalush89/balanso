import { User, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { AuthUser } from "../models/authUser";


interface FirebaseAuthProps {
  authUser: AuthUser | null;
  isLoading: boolean;
  logOut: () => {};
}

const useFirebaseAuth = (): FirebaseAuthProps => {
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const clear = () => {
    setAuthUser(null);
    setIsLoading(false);
  };

  const authStateChanged = (user: User | null) => {
    setIsLoading(true);
    if (!user) {
      clear();
    } else {
      setAuthUser({
        uid: user.uid,
        email: user.email || '',
        displayName: user.displayName || '',
        photoURL: user.photoURL || '',
      });
      setIsLoading(false);
    }
  };
  const logOut = () => signOut(auth).then(clear);
  // Listen for Firebase Auth state change
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    authUser,
    isLoading,
    logOut
  };
};

export default useFirebaseAuth;