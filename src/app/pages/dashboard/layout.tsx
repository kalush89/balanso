'use client'
import Navigation from '@/app/components/navigation/page'
import { useAuthContext } from '../../../../firebase/auth'
import { useState } from 'react';
import NewCampaignModal from '@/app/components/modals/new-campaign/page';


export default function Layout({
  children,
}: {
  children: React.ReactNode
}) {

    const{authUser} = useAuthContext();
    const [showModal, setShowModal] = useState(false);

  const handleCreateCampaign = () => {
    // Add logic to handle the creation of a new campaign
    setShowModal(true)
    // Optionally, you can navigate to a new page or perform other actions
  };
  

    return (
      <div className="relative">
        {authUser && <Navigation />}
        {children}

        {/* Visible on smaller screens */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 sm:hidden">
        <button
         onClick={handleCreateCampaign}
          className="bg-blue-500 text-white p-2 rounded-full"
        >
          {/* Plus sign icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-10 w-10"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="7"
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
        </button>
      </div>


        {/* Visible on larger screens */}
        <div className="hidden sm:block fixed bottom-8 right-8">
          <button
            onClick={handleCreateCampaign}
            className="bg-blue-500 text-white px-4 py-2 rounded-full"
          >
            Create New Campaign
          </button>
        </div>

         {/* Render modal if showModal state is true */}
      {showModal && (
        <NewCampaignModal onClose={() => setShowModal(false)} />
      )}
      </div>
    );
}
