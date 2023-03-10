import { useState } from "react";
import { makeRequest } from "../service/shiftScheduleScanner";
import { ImageData, ShiftScheduleResponse } from "../types";


const useFetchScheduleData = () => {

  const [scheduleData, setScheduleData] = useState<ShiftScheduleResponse>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchScheduleData = async (imageData: ImageData) => {
    setLoading(true);
    makeRequest(imageData)
      .then(response => response.json())
      .then(response => {
        setScheduleData(response);
        setLoading(false);
        setError(false);
      })
      .catch(error => {
        setError(true);
        setLoading(false);
        console.log("upload error", error);
      });
  }

  return { fetchScheduleData, scheduleData, loading, error, setScheduleData };

}

export default useFetchScheduleData;

