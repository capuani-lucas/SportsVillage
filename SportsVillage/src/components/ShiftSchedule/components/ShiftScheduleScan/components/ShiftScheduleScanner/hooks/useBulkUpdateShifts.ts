import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import { createDateAtMidnight, generateDateStringsBetweenDates } from "src/components/common/service/date";
import { DateData } from 'react-native-calendars';
import { ShiftScheduleResponse } from '../types';
import { getAllShiftsForIndex } from '../service/shiftScheduleScanner';
import { useState } from 'react';

const useBulkUpdateShifts = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const bulkUpdateShifts = (startDate: DateData, endDate: DateData, scheduleData: ShiftScheduleResponse, rowOffset: number) => {

    setLoading(true);
    const shifts = scheduleData.slice(rowOffset, scheduleData.length);

    const batch = firestore().batch();
    const dates = generateDateStringsBetweenDates(startDate.dateString, endDate.dateString);
    const collectionRef = firestore()
      .collection('UserData')
      .doc(auth().currentUser?.uid)
      .collection("ScheduleDays");

    dates.forEach((date, index) => {
      const documentRef = collectionRef.doc(date);
      batch.set(documentRef, {
        date: firestore.Timestamp.fromDate(new Date(createDateAtMidnight(date))),
        shifts: getAllShiftsForIndex(shifts, index),
        notes: ""
      }, { merge: false })
    });

    return batch.commit()
      .then(() => {
        setLoading(false);
        setError(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(true);
        console.log("Error bulk creating shifts: ", err);
      });
  }

  return { bulkUpdateShifts, loading, error };
}

export default useBulkUpdateShifts;

