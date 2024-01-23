// 'use client'
import React, { useState } from 'react';
import { Campaign } from '../../../../models/campaign';
import Link from 'next/link';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const [isOptionsVisible, setOptionsVisible] = useState(false);

  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent Link
    setOptionsVisible(!isOptionsVisible);
  };

  return (
    <Link href={`/campaign/${campaign.cid}`}>
      <div className="flex border p-4 mb-4 rounded-md hover:shadow-md transition items-center">
        <img
          src="https://via.placeholder.com/50" // Replace with your image source
          alt={campaign.title}
          className="w-12 h-12 object-cover rounded-full mr-4"
        />
        <div className="flex-grow">
          <h3 className="text-lg font-semibold mb-2">{campaign.title}</h3>
          <div className="flex items-center space-x-2">
            <button onClick={toggleOptions} className="focus:outline-none">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-5 w-5 text-gray-500"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
            {isOptionsVisible && (
              <div className="flex items-center space-x-2">
                <Link href={`/edit-campaign/${campaign.cid}`} className="text-blue-500">
                  Edit
                </Link>
                <span>|</span>
                <button className="text-red-500" onClick={() => console.log('Delete clicked')}>
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CampaignCard;
