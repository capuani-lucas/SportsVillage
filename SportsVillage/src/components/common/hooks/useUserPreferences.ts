import { useState } from "react";

import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";

export type UserPreferences = {
  name: string;
  scheduleOffset: number;
}

const useUserPreferences = () => {

  const [userPreferences, setUserPreferences] = useState<UserPreferences>(
    {
      name: '',
      scheduleOffset: 3
    }
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchUserPreferences = () => {
    // setLoading(true);
    firestore()
      .collection('UserData')
      .doc(auth().currentUser?.uid)
      .collection("UserPreferences")
      .doc("data")
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          setUserPreferences(documentSnapshot.data() as UserPreferences);
        }
        setLoading(false);
        setError(false);
      })
  }

  const updateUserPreferences = (preferences: UserPreferences) => {
    firestore()
      .collection('UserData')
      .doc(auth().currentUser?.uid)
      .collection("UserPreferences")
      .doc("data")
      .set(preferences)
      .then((response) => {
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        setError(true);
        setLoading(false);
        console.log("fetch error", error);
      });
  }

  return { userPreferences, loading, error, fetchUserPreferences, updateUserPreferences };

}

export default useUserPreferences;