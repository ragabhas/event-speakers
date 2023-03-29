import { data } from "../../SpeakerData";
import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
    LOADING: "loading",
    SUCCESS: "success",
    FAILURE: "failure"
};

function useRequestSpeakers(delayTime = 1000) {

    const [speakersData, setSpeakersData] = useState([]);
    const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
    const [error, setError] = useState("");

    const delay = (ms) => new Promise((resolve) => { setTimeout(resolve, ms) });

    useEffect(() => {
        async function delayFunc() {
            try {
                await delay(delayTime);
                setSpeakersData(data);
                setRequestStatus(REQUEST_STATUS.SUCCESS);
            } catch (e) {
                setRequestStatus(REQUEST_STATUS.FAILURE);
                setError(e);
            }
        };

        delayFunc();
    }, []);
    function onFavoriteToggle(id) {
        const speakerPrev = speakersData.find(function (rec) {
            return rec.id === id;
        });

        const speakerUpdated = { ...speakerPrev, favorite: !speakerPrev.favorite };
        const speakersUpdated = speakersData.map(function (rec) {
            return rec.id === id ? speakerUpdated : rec;
        });

        setSpeakersData(speakersUpdated);
    }

    return {
        speakersData, requestStatus,
        error, onFavoriteToggle
    };
}

export default useRequestSpeakers;