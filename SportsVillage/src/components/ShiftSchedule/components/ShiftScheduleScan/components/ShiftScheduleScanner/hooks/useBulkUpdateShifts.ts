import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import { createDateAtMidnight, generateDateStringsBetweenDates } from "src/components/common/service/date";
import { DateData } from 'react-native-calendars';
import { ShiftScheduleResponse } from '../types';
import { getAllShiftsForIndex } from '../service/shiftScheduleScanner';

const useBulkUpdateShifts = () => {

    const bulkUpdateShifts = (startDate: DateData, endDate: DateData, scheduleData: ShiftScheduleResponse, rowOffset: number) => {

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
      }, { merge: true })
    });

    return batch.commit()
  }
}

export default useBulkUpdateShifts;

