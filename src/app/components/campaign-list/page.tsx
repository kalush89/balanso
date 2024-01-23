'use client'
import React from 'react';
import { Campaign } from '../../../../models/campaign';
import CampaignCard from '../campaign-card/page';

interface CampaignListProps {
  campaigns: Campaign[];
}

const CampaignList: React.FC<CampaignListProps> = ({ campaigns }) => {
  return (
    <div>
      <h2>Live Campaigns</h2>
      <ul>
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
