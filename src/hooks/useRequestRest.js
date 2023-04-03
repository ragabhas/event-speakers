import { useState, useEffect } from "react";
import axios from "axios";

const restUrl = "api/speakers";

export const REQUEST_STATUS = {
  LOADING: "loading",
  SUCCESS: "success",
  FAILURE: "failure",
};

function useRequestRest() {
  const [data, setData] = useState([]);
  const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
  const [error, setError] = useState("");

  const delay = (ms) =>
    new Promise((resolve) => {
      setTimeout(resolve, ms);
    });

  useEffect(() => {
    async function delayFunc() {
      try {
        const result = await axios.get(restUrl);
        setRequestStatus(REQUEST_STATUS.SUCCESS);
        setData(result.data);
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
        await axios.put(`${restUrl}/${record.id}`, record);
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
        await axios.post(`${restUrl}/99999`, record);
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
        await axios.delete(`${restUrl}/${record.id}`, record);
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

export default useRequestRest;
