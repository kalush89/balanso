import { FC, useState } from 'react';
import { useAuthContext } from '../../../../../firebase/auth';
import { addRecToFirestoreCol } from '../../../../../firebase/firestore';
import { Campaign } from '../../../../../models/campaign';

interface NewCampaignModalProps {
  onClose: () => void;
}

const NewCampaignModal: FC<NewCampaignModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<Campaign>({} as Campaign);
  const {authUser} = useAuthContext();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTextAreaChange = (e:React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
     const newCampaign: Campaign = {
      ...formData,
      isLive: true
     }
      // Add the form data to the "campaigns" subcollection under the user's UID
      await addRecToFirestoreCol('users', 'campaigns', authUser?.uid!, newCampaign)

      
      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
    
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg max-w-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            required
          />

          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />

          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-full">
            Create Campaign
          </button>
        </form>

        <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded-full mt-4 w-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default NewCampaignModal;
