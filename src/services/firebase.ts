import { db, storage } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp,
  doc,
  updateDoc
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { RegistrationState } from '../redux/slices/registrationSlice';

export const submitRegistrationToFirebase = async (registrationData: Omit<RegistrationState, 'currentStep' | 'isSubmitting' | 'submitError' | 'submitSuccess' | 'validationErrors'>) => {
  try {
    // First, handle the passport photo upload if it exists
    let photoUrl = '';
    if (registrationData.personalData.passportPhoto) {
      const photoFile = registrationData.personalData.passportPhoto;
      const storageRef = ref(storage, `passport-photos/${Date.now()}-${photoFile.name}`);
      await uploadBytes(storageRef, photoFile);
      photoUrl = await getDownloadURL(storageRef);
    }

    // Prepare the registration data
    const registrationDoc = {
      ...registrationData,
      personalData: {
        ...registrationData.personalData,
        passportPhoto: photoUrl
      },
      createdAt: serverTimestamp(),
      status: 'pending' // You can use this for admin approval workflow
    };

    // Add the document to Firestore
    const docRef = await addDoc(collection(db, 'registrations'), registrationDoc);

    // Create a separate profile document for quick access
    await addDoc(collection(db, 'profiles'), {
      registrationId: docRef.id,
      name: `${registrationData.personalData.surname} ${registrationData.personalData.firstName}`,
      email: registrationData.personalData.email,
      telephone: registrationData.personalData.telephone,
      photoUrl,
      createdAt: serverTimestamp()
    });

    return docRef.id;
  } catch (error) {
    console.error('Error submitting registration:', error);
    throw error;
  }
};

export const updateRegistrationStatus = async (registrationId: string, status: string) => {
  try {
    const registrationRef = doc(db, 'registrations', registrationId);
    await updateDoc(registrationRef, {
      status,
      updatedAt: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error('Error updating registration status:', error);
    throw error;
  }
};