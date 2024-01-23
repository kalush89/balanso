'use client'
import { useState, useEffect } from 'react';

import {useRouter} from 'next/navigation';

import { FirebaseError } from 'firebase/app';

import { sendEmailVerification } from 'firebase/auth';
import {auth} from '../../../../firebase/config';
import { useAuthContext } from '../../../../firebase/auth';



const VerifyEmail: React.FC = () => {
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const router = useRouter();
  const{ user } = useAuthContext();
  let error: FirebaseError | null = null;

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (resendDisabled) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }
    user?.reload().then(() => {
      if(user?.emailVerified){
        clearInterval(timer)
        router.push('/pages/dashboard');
      }
    }).catch((e: unknown) => {
      if (e instanceof FirebaseError) {
        error = e;
      } else {
        console.error('Error ridirecting:', error?.message);
      }
    })


    return () => clearInterval(timer);
  }, [resendDisabled, user]);

  const handleResendEmail = async () => {
    try {
        // Logic to resend email
        await sendEmailVerification(auth.currentUser!);
    
        // Disable the button and start the countdown
        setResendDisabled(true);
        setCountdown(60);
    
        // Enable the button after 60 seconds
        setTimeout(() => {
          setResendDisabled(false);
        }, 60000);
      } catch (e) {
        if (e instanceof FirebaseError) {
            error = e;
          } else {
            console.error('Error resending email:', error?.message);
          }
      }
  };

  return (
    <div className="min-h-screen flex items-center justify-center mx-4">
      <div className="w-full max-w-md p-4 bg-white rounded-md shadow-md">
        <h1 className="text-2xl font-semibold mb-4">Verify your Email Address</h1>

        <p>A verification email has been sent to: <strong>{user?.email}</strong></p>
        <p>Follow the instructions in the email to verify your account.</p>

        <div className="mt-4">
          <button
            type="button"
            onClick={handleResendEmail}
            disabled={resendDisabled}
            className={`w-full bg-blue-500 text-white p-2 rounded-md ${resendDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-blue-600'} focus:outline-none focus:ring focus:ring-blue-200 transition duration-300`}
          >
            Resend Email {resendDisabled && `(${countdown}s)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
