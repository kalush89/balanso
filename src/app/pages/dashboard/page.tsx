'use client'
import React, { useEffect, useState } from 'react';
import { Campaign } from '../../../../models/campaign';
import { useAuthContext } from '../../../../firebase/auth';
import CampaignList from '@/app/components/campaign-list/page';
import { fetchCampaignsData } from '../../../../firebase/firestore';
import {firestore} from '../../../../firebase/config';
import { useRouter } from 'next/navigation';
import Spinner from '@/app/spinner/page';

const Dashboard: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const router = useRouter();
  const { authUser, isLoading } = useAuthContext();
  const [ isLoadingCampaigns, setIsLoadingCampaigns ] = useState(false);

  useEffect(() => {
    if(!authUser && !isLoading){
      router.push("/");
    }
  }, [authUser, isLoading]);

const setCampaignsInState = async () => {
  setCampaigns( await fetchCampaignsData(authUser?.uid!));
}

useEffect(() => {
  const fetchData = async () => {
    if (authUser) {
      setIsLoadingCampaigns(true);
      await setCampaignsInState();
      setIsLoadingCampaigns(false);
    }
  };

  fetchData();
}, [authUser, campaigns]);
  // Check if the campaigns array is null or empty
  const isCampaignsEmpty = !campaigns || campaigns.length === 0;

  return (
    (!authUser)?<Spinner/>:
    <div className="">
      <h1>Dashboard</h1>
      {isCampaignsEmpty && (
        <p className="text-center text-gray-500 mt-10">
          No campaigns found. Click button at the bottom to start a new campaign.
        </p>
      )}
      <CampaignList campaigns={campaigns} />
      {/* Add more dashboard components as needed */}
    </div>
  );
};

export default Dashboard;
