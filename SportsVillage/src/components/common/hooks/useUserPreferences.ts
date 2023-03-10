import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetchUserPreferences();
  }, []);

  const fetchUserPreferences = () => {
    firestore()
      .collection('UserData')
      .doc(auth().currentUser?.uid)
      .collection("UserPreferences")
      .doc("data")
      .onSnapshot((documentSnapshot) => {
        if (documentSnapshot.exists) {
          //Replace underscores with periods
          const override: UserPreferences = {
            ...documentSnapshot.data() as UserPreferences,
            name: documentSnapshot.data()?.name.replace(/_/g, '.')
          }
          setUserPreferences(override);
        }
        setLoading(false);
        setError(false);
      })
  }

  const updateUserPreferences = (preferences: UserPreferences) => {

    const override = {
      ...preferences,
      name: preferences.name.replace(/\./g, '_').trim()
    }

    firestore()
      .collection('UserData')
      .doc(auth().currentUser?.uid)
      .collection("UserPreferences")
      .doc("data")
      .set(override)
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