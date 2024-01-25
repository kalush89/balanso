// 'use client'
import React, { useState } from 'react';
import { Campaign } from '../../../../models/campaign';
import Link from 'next/link';
import Image from 'next/image';

interface CampaignCardProps {
  campaign: Campaign;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ campaign }) => {
  const [isActionSheetVisible, setIsActionSheetVisible] = useState(false);

  const toggleOptions = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the click event from propagating to the parent Link
    setIsActionSheetVisible(!isActionSheetVisible);
  };

  return (
    //
      <div className="flex mt-5 mb-5 rounded-lg hover:shadow-md transition items-center">

        <Image
          src="https://via.placeholder.com/50" // Replace with your image source
          alt={campaign.title}
          //layout="fill"
          objectFit="contain"
          className="w-1/2 h-24 w-24 sm:h-32 sm:w-32 rounded-l-lg"
          width={50}
          height={50}
        />

        <div className="flex flex-row justify-between w-full p-4">
          <Link href={`/campaign/${campaign.cid}`}>
            <h3 className="text-lg font-semibold w-full">{campaign.title}</h3>
          </Link>
          <div className="flex items-center space-x-2">
            <button onClick={toggleOptions} className="focus:outline-none">
              <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h0m6 0h0m6 0h0" />
              </svg>
            </button>
            {/* {isOptionsVisible && (
              <div className="flex items-center space-x-2">
                <Link href={`/edit-campaign/${campaign.cid}`} className="text-blue-500">
                  Edit
                </Link>
                <span>|</span>
                <button className="text-red-500" onClick={() => console.log('Delete clicked')}>
                  Delete
                </button>
              </div>
            )} */}
          </div>
        </div>
      </div>
  );
};

export default CampaignCard;
