
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from 'react';
import { ScheduleDayInformation, ScheduleInformation } from '../types';
import { formatScheduleDayInformation } from '../service/shiftScheduleService';

export const useScheduleInformation = () => {

  const [scheduleInformation, setScheduleInformation] = useState<ScheduleInformation>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('UserData')
      .doc(auth().currentUser?.uid)
      .collection("ScheduleDays")
      .orderBy("date", "desc")
      .limit(90)
      .onSnapshot(querySnapshot => {
        if (!querySnapshot) {
          setLoading(false);
          return;
        }
        setScheduleInformation(
          formatScheduleDayInformation(
            querySnapshot.docs.map((documentSnapshot) => documentSnapshot.data() as ScheduleDayInformation)
          )
        );
        setLoading(false);
      })

      return () => subscriber();
  }, []);

  return { scheduleInformation, loading };
}
