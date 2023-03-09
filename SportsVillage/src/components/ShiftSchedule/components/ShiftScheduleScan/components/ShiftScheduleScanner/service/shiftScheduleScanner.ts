import { ImageData } from "../types";
import { BACKEND_URL } from "src/config";
  
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

