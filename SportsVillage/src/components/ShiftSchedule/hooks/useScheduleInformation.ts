
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import { useEffect, useState } from 'react';
import { mergeSchedules } from '../service/shiftScheduleService';
import { ScheduleData, ScheduleInformation } from '../types';

export const useScheduleInformation = () => {

  const [scheduleInformation, setScheduleInformation] = useState<ScheduleInformation>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const subscriber = firestore()
      .collection('UserData')
      .doc(auth().currentUser?.uid)
      .collection("Schedules")
      .orderBy("scheduleUploaded", "desc")
      .limit(3)
      .onSnapshot(querySnapshot => {
        if (!querySnapshot) {
          setLoading(false);
          return;
        }
        setScheduleInformation(
          mergeSchedules(
            querySnapshot.docs.map(documentSnapshot => documentSnapshot.data() as ScheduleData)
          )
        );
        setLoading(false);
      })

      return () => subscriber();
  }, []);

  return { scheduleInformation, loading };
}
