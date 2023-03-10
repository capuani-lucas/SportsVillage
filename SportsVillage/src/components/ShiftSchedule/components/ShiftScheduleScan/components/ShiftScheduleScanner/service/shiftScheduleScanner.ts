import { ImageData, ShiftScheduleResponse } from "../types";
import { BACKEND_URL } from "src/config";
import { Shifts } from "src/components/ShiftSchedule/types";
  
const createFormData = (imageData: ImageData, body: any) => {
  const data = new FormData();

  data.append("image", imageData);

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
}

export const makeRequest = (imageData: ImageData) => {
  return fetch(`${BACKEND_URL}/getScheduleData`, {
    method: "POST",
    body: createFormData(imageData, {})
  });
}

export const getAllShiftsForIndex = (shifts: ShiftScheduleResponse, index: number): Shifts => {
  return shifts.reduce((acc: Shifts, row: string[]) => {
    acc[row[0]] = row[index + 1];
    return acc;
  }, {})
}