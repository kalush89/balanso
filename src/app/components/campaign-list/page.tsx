'use client'
import React from 'react';
import { Campaign } from '../../../../models/campaign';
import CampaignCard from '../campaign-card/page';

interface CampaignListProps {
  campaigns: Campaign[];
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => {
  return (
    <div className='mx-5 sm:mx-20 sm:w-1/2'>
      <h2 className='text-center text-2xl mt-5 sm:text-3xl'>Live Campaigns</h2>
      <ul className=''>
        {campaigns?.map((campaign) => (
          <li key={campaign.cid}>
            <CampaignCard campaign={campaign} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignList;
