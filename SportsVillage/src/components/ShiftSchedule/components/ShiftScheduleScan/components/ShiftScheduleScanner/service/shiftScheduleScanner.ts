import { ImageData, ShiftScheduleResponse } from "../types";
import { BACKEND_URL } from "src/config";
import { Shifts } from "src/components/ShiftSchedule/types";
import auth from "@react-native-firebase/auth";
  
const createFormData = (imageData: ImageData, body: any) => {
  const data = new FormData();

  data.append("image", imageData);

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
}

export const makeRequest = async (imageData: ImageData) => {
  const idToken = await auth().currentUser?.getIdToken();
  return fetch(`${BACKEND_URL}/getScheduleData`, {
    method: "POST",
    body: createFormData(imageData, {}),
    headers: {
      "Authorization": idToken || ''
    }
  });
}

export const getAllShiftsForIndex = (shifts: ShiftScheduleResponse, index: number): Shifts => {
  return shifts.reduce((acc: Shifts, row: string[]) => {
    acc[row[0].replace(/\./g, '_').trim()] = row[index + 1];
    return acc;
  }, {})
}

