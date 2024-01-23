'use client'
import React from 'react';
import { Campaign } from '../../../../../models/campaign';

interface CampaignPageProps {
  campaign: Campaign;
}

const CampaignPage: React.FC<CampaignPageProps> = ({ campaign }) => {
  return (
    <div>
      <h1>{campaign.title}</h1>
      <p>Description: {campaign.description}</p>
      <p>Start Date: {campaign.startDate}</p>
      <p>End Date: {campaign.endDate}</p>
      {/* Add more details or components related to the campaign */}
    </div>
  );
};

export default CampaignPage;
