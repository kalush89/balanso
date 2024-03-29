'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from '../../firebase/auth';
import Link from 'next/link';


import { auth } from '../../firebase/config';
import { signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

import { useAuthContext } from '../../firebase/auth';
import Spinner from './spinner/page';

const Home: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  const { authUser, isLoading } = useAuthContext();

  useEffect(() => {
    if(!isLoading && authUser){
      router.push("/pages/dashboard");
    }
  }, [authUser, isLoading])
  
  const handleSignIn = async () => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push('/pages/dashboard');
      } catch (error: unknown) {
        if (error instanceof FirebaseError) {
          if (error.code === 'auth/email-already-in-use') {
            setAuthError('Email is already in use');
          } else if(error.code === 'auth/invalid-email'){
            setAuthError('Please enter a valid email address');
          } else if(error.code === 'auth/missing-password'){
            setAuthError('Please enter a password');
          } else {
            console.error('Error signing up:', error.message);
          }
        } else {
          console.error('General error signing up:', error);
        }
      };
  }
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push('/pages/dashboard');
    } catch (e: unknown) {
      console.error('Error signing in with Google:');
      }
  };

  return ((isLoading || (!isLoading && !!authUser))?<Spinner/>:
    <div className="min-h-screen flex flex-col sm:flex-row items-center justify-center mx-5">
      {/* Left Section - Logo (Top for smaller screens) */}
      <div className="flex-none mb-6 sm:mb-0 sm:mr-10">
        <span className="text-4xl font-bold text-blue-500">Balanso</span>
      </div>

      {/* Right Section - Sign-up Form Card */}
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md mx-5 sm:w-1/2 p-6">
       
          <div className="space-y-4">
            <div className="text-red-500">{authError}</div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 border w-full rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 border w-full rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              />
            </div>

            <button
              type="button"
              onClick={handleSignIn}
              className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 transition duration-300"
            >
              Sign In
            </button>

            <div className="flex items-center justify-center mt-4">
              <span className="bg-gray-200 h-px w-1/3 block"></span>
              <span className="mx-2">OR</span>
              <span className="bg-gray-200 h-px w-1/3 block"></span>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-yellow-200 transition duration-300"
              >
                Sign In with Google
              </button>
            </div>

            <div className="mt-4">
              <span className="text-sm">Don't have an account? </span>
              <Link href="/pages/sign-up" className="text-blue-500 hover:underline cursor-pointer">
                Sign Up
              </Link>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default Home;
