import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function useRequestDelay(delayTime = 1000, initialData = []) {
  const [data, setData] = useState(initialData);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  const delay = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  useEffect(() => {
    async function delayFunc() {
      try {
        await delay(delayTime);
        setData(data);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
      } catch (e) {
        setRequestStatus(REQUEST_STATUS.FAILURE);
        setError(e);
      }
    }

    delayFunc();
  }, []);

  function updateRecord(recordUpdated, doneCallback) {
    const newRecords = data.map(function (record) {
      return record.id == recordUpdated.id ? recordUpdated : record;
    });

    async function delayFunction() {
      try {
        await delay(delayTime);

        if (doneCallback) {
          doneCallback();
        }

        setData(newRecords);
      } catch (e) {}
    }

    delayFunction();
  }
  return {
    data,
    requestStatus,
    error,
    updateRecord,
  };
}

export default useRequestDelay;
