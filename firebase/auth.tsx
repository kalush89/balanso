"use client"
import React, { createContext, useContext } from 'react';
import {
        UserCredential, 
        signInWithEmailAndPassword, 
        createUserWithEmailAndPassword,
       } from 'firebase/auth';
import { auth } from './config';
import { FirebaseError } from 'firebase/app';
import useFirebaseAuth from '../hooks/usefirebaseAuth';
import { AuthUser } from '../models/authUser';
import { FirebaseAuthProps } from '../models/firebaseAuth';


const AuthContext = createContext<FirebaseAuthProps>({ authUser: null, isLoading: true , logOut: async () => {}});

export const useAuthContext = () => useContext(AuthContext);

interface AuthUserProviderProps {
  children: React.ReactNode;
}

export const AuthUserProvider: React.FC<AuthUserProviderProps> = ({ children }) => {
  const auth = useFirebaseAuth();

  return (
    <AuthContext.Provider value={ auth }>
      { children }
    </AuthContext.Provider>
  );
};


interface AuthResult {
  result: UserCredential | null; // Change the type based on the actual return type of createUserWithEmailAndPassword
  error: FirebaseError | null; // Change the type based on the actual error type
}

export async function signUp(email: string, password: string): Promise<AuthResult> {
  let result: UserCredential | null = null,
    error: FirebaseError | null = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
    
  } catch (e: unknown) {
      // Check if the caught error is an instance of FirebaseError
      if (e instanceof FirebaseError) {
        error = e;
      } else {
        // Handle other types of errors if needed
        console.error("Unexpected error:", e);
      }
    }

  return { result, error };
}

export async function signIn(email: string, password: string): Promise<AuthResult> {
  let result: UserCredential | null = null,
    error: FirebaseError | null = null;
  try {
      result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e: unknown) {
    // Check if the caught error is an instance of FirebaseError
    if (e instanceof FirebaseError) {
      error = e;
    } else {
      // Handle other types of errors if needed
      console.error("Unexpected error:", e);
    }
  }

  return { result, error };
}

