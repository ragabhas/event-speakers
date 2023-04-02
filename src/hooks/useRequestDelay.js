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

  function updateRecord(record, doneCallback) {
    const originalData = [...data];
    const newRecords = data.map(function (rec) {
      return rec.id == record.id ? record : rec;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
        if (doneCallback) {
          doneCallback();
        }
      } catch (e) {
        console.log(e);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalData);
      }
    }

    delayFunction();
  }

  function insertRecord(record, doneCallback) {
    const originalData = [...data];
    const newRecords = [record, ...data];

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
        if (doneCallback) {
          doneCallback();
        }
      } catch (e) {
        console.log(e);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalData);
      }
    }

    delayFunction();
  }

  function deleteRecord(record, doneCallback) {
    const originalData = [...data];
    const newRecords = data.filter(function (rec) {
      return rec.id != record.id;
    });

    async function delayFunction() {
      try {
        setData(newRecords);
        await delay(delayTime);
        if (doneCallback) {
          doneCallback();
        }
      } catch (e) {
        console.log(e);
        if (doneCallback) {
          doneCallback();
        }
        setData(originalData);
      }
    }

    delayFunction();
  }

  return {
    data,
    requestStatus,
    error,
    updateRecord,
    insertRecord,
    deleteRecord,
  };
}

export default useRequestDelay;
