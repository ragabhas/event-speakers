import Speaker from './Speaker'
import {data} from "../../SpeakerData";
import { useState, useEffect } from "react";
import ReactPlaceHolder from 'react-placeholder';

function SpeakersList({showSessions}){
    const [speakersData, setSpeakersData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasErrors, setHasErrors] = useState(false);
    const [error, setError] = useState("");

    const delay = (ms)=> new Promise((resolve)=>{setTimeout(resolve, ms)});
    
    useEffect(()=>{
        async function delayFunc(){
            try
            {
                await delay(2000);
                setSpeakersData(data);
                setIsLoading(false);
            }catch(e){
                setIsLoading(false);
                setHasErrors(true);
                setError(e);
            }
        };
        
        delayFunc();
    },[]);
    function onFavoriteToggle(id){
        const speakerPrev = speakersData.find(function(rec){
            return rec.id === id;
        });

        const speakerUpdated = {...speakerPrev, favorite:!speakerPrev.favorite};
        const speakersUpdated = speakersData.map(function(rec){
            return rec.id === id ? speakerUpdated : rec;
        });

        setSpeakersData(speakersUpdated);
    }

    if(hasErrors === true) return(
        <div className='text-danger'>
            ERROR:<b>Loading speaker data failed. Reason: {error}</b>
        </div>
    );
    
    return(<div className="container speakers-list">
        <ReactPlaceHolder type="media" rows={15} className="speakerslist-placeholder"
        ready={isLoading === false}>
            <div className="row">
                {speakersData.map((speaker)=>{ return(<Speaker key={speaker.id} speaker={speaker} 
                showSessions={showSessions} onFavoriteToggle={()=>{onFavoriteToggle(speaker.id)}}/>);})}
                </div>
        </ReactPlaceHolder>
</div>);
}

export default SpeakersList;