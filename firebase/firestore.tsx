import { collection, addDoc, doc, query, getDocs, orderBy , where} from "firebase/firestore";
import { firestore } from "./config";
import { Campaign } from "../models/campaign";

// const docRef = doc(db, "customers", user.uid);
// const colRef = collection(docRef, "checkout_sessions")
// addDoc(colRef, {
//  price: priceId,
//  and: two,
//  more: pairs,
// });
  // Function to add a user to Firestore
export const addRecToFirestoreCol = async (collectionName: string, subCollectionName: string, recId: string, recData: {}) => {
  const userDocumentRef = doc(firestore, collectionName, recId);
  const collectionRef = collection(userDocumentRef, subCollectionName);

  try {
    // Add a new document with a generated ID
    const docRef = await addDoc(collectionRef, recData );

    console.log('item added with ID:', docRef.id);
  } catch (error) {
    console.error('Error adding item to Firestore:', error);
  }
};


export const fetchCampaignsData = async (uid: string): Promise<Campaign[]> => {
  try {
    // Reference to the 'campaigns' subcollection under the user's UID
    const campaignsRef = collection(firestore, 'users', uid, 'campaigns');

    // Query to get all documents in the 'campaigns' subcollection
    const q = query(campaignsRef, where("isLive", "==", true), orderBy("startDate", "desc"));

    // Fetch data from the subcollection
    const querySnapshot = await getDocs(q);

    // Extract data from the query snapshot
    const subcollectionData: Campaign[] = querySnapshot.docs.map((doc) => ({
      cid: doc.id,
      title: doc.get('title'), // Replace with your actual field names
      description: doc.get('description'),
      startDate: doc.get('startDate'),
      endDate: doc.get('endDate'),
      isLive: true,
    }));

    // Return the fetched campaigns
    return subcollectionData;
  } catch (error) {
    console.error('Error fetching subcollection data:', error);
    // Handle the error as needed (e.g., throw it, log it, etc.)
    throw error;
  }
};

