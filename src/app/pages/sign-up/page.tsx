'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signUp } from '../../../../firebase/auth';
import Link from 'next/link';

import { auth } from '../../../../firebase/config';
import { AuthError, signInWithPopup, GoogleAuthProvider, sendEmailVerification, createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';

const Home: React.FC = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  
  const handleSignUp = async () => {
    try {
      if(fullName === ''){
        setAuthError('Please enter your full name');
        return;
      }
      const result = await createUserWithEmailAndPassword(auth, email, password);

      // Send email verification
      await sendEmailVerification(auth.currentUser!);
      setAuthError('');
      // Redirect or perform any other actions after successful signup
      //router.push('/verify-email');
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
    }
  };

  const verifyUserEmail = async () => {
      try{
        await sendEmailVerification(auth.currentUser!);
        router.push('/verify-email');
      } catch (e: unknown) {
          console.error('Error verifying user email:', e);
        }
      
  }
  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();

    try{
      const result = await signInWithPopup(auth, provider);
      router.push('/pages/dashboard');
      
    } catch (e: unknown) {
        console.log('Error signing up with Google:', e);
      }
  };

  return (
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
              <label htmlFor="fullName" className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="mt-1 p-2 border w-full rounded-md focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-300"
              />
            </div>

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
              onClick={handleSignUp}
              className="w-full bg-green-500 text-white p-3 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-green-200 transition duration-300"
            >
              Sign Up
            </button>

            <div className="flex items-center justify-center mt-4">
              <span className="bg-gray-200 h-px w-1/3 block"></span>
              <span className="mx-2">OR</span>
              <span className="bg-gray-200 h-px w-1/3 block"></span>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={handleGoogleSignUp}
                className="w-full bg-red-500 text-white p-3 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:ring-yellow-200 transition duration-300"
              >
                Sign Up with Google
              </button>
            </div>

            <div className="mt-4">
              <span className="text-sm">Already have an account? </span>
              <Link href="/" className="text-blue-500 hover:underline cursor-pointer">
                Sign In
              </Link>
            </div>
          </div>
        
      </div>
    </div>
  );
};

export default Home;
