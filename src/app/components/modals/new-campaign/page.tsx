import { FC, useState } from 'react';
import { useAuthContext } from '../../../../../firebase/auth';
import { addRecToFirestoreCol } from '../../../../../firebase/firestore';
import { Campaign } from '../../../../../models/campaign';

interface NewCampaignModalProps {
  onClose: () => void;
}

const NewCampaignModal: FC<NewCampaignModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState<Campaign>({} as Campaign);
  const { authUser } = useAuthContext();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const newCampaign: Campaign = {
        ...formData,
        isLive: true,
      };
      // Add the form data to the "campaigns" subcollection under the user's UID
      await addRecToFirestoreCol('users', 'campaigns', authUser?.uid!, newCampaign);

      onClose(); // Close the modal after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const today = new Date(); // Get the current date

// Calculate the maximum date allowed for the start date (30 days from today)
const startMaxDate = new Date();
startMaxDate.setDate(today.getDate() + 30);

// Format the startMaxDate to 'YYYY-MM-DD' format
const startFormattedMaxDate = startMaxDate.toISOString().split('T')[0];

// Calculate the minimum date allowed for the end date (30 days after the selected start date)
const endMinDate = new Date(formData.startDate ? formData.startDate : today.getDate());
endMinDate.setDate(endMinDate.getDate() + 30);

// Format the endMinDate to 'YYYY-MM-DD' format
const endFormattedMinDate = endMinDate.toISOString().split('T')[0];

// Calculate the maximum date allowed for the end date (365 days from today)
const endMaxDate = new Date();
endMaxDate.setDate(today.getDate() + 365);

// Format the endMaxDate to 'YYYY-MM-DD' format
const endFormattedMaxDate = endMaxDate.toISOString().split('T')[0];


  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-4 rounded-lg w-80 max-w-2xl mx-auto ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="border rounded-md p-2 outline-none focus:border-blue-500"
          />

          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleTextAreaChange}
            required
            className="border rounded-md p-2 outline-none focus:border-blue-500"
          />

          <label htmlFor="startDate">Start Date:</label>
          <input
            type="date"
            id="startDate"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="border rounded-md p-2 outline-none focus:border-blue-500"
            min={today.toISOString().split('T')[0]}  // Set the minimum date to the current date
            max={startFormattedMaxDate}  // Set the maximum date to 30 days from the current date
          />

          <label htmlFor="endDate">End Date:</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="border rounded-md p-2 outline-none focus:border-blue-500"
            min={endFormattedMinDate}
            max={endFormattedMaxDate}
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
