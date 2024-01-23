export interface AuthUser {
    uid: string;
    email: string;
    displayName?: string; // displayName is an optional property
    photoURL?: string;
  }