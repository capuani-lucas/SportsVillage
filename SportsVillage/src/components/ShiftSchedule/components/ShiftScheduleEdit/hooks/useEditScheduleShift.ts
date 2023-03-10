
import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth";
import { createDateAtMidnight } from 'src/components/common/service/date';
const useEditScheduleShift = () => {

  const addEditShift = (date: string, user: string, newShift: string, notes: string) => {
    user = user.replace(/\./g, '_').trim();
    return firestore()
      .collection('UserData')
      .doc(auth().currentUser?.uid)
      .collection("ScheduleDays")
      .doc(date)
      .update({
        ...(newShift && { [`shifts.${user}`]: newShift }),
        notes
      })
      .catch((error) => {
        return firestore()
          .collection('UserData')
          .doc(auth().currentUser?.uid)
          .collection("ScheduleDays")
          .doc(date)
          .set({
            date: firestore.Timestamp.fromDate(new Date(createDateAtMidnight(date))),
            shifts: {
              ...(newShift && { [user]: newShift })
            },
            notes
          })
      })
  }

  const deleteShift = async (date: string, user: string) => {
    const scheduleDay = await firestore()
      .collection('UserData')
      .doc(auth().currentUser?.uid)
      .collection("ScheduleDays")
      .doc(date)
      .get();
    if (scheduleDay.exists) {
      const shifts = scheduleDay.data()?.shifts;
      delete shifts[user.replace(/\./g, '_')];
      return firestore()
        .collection('UserData')
        .doc(auth().currentUser?.uid)
        .collection("ScheduleDays")
        .doc(date)
        .update({
          shifts
        })
    }
  };

  return { addEditShift, deleteShift };
}

export default useEditScheduleShift;

