import Speaker from './Speaker'
import {data} from "../../SpeakerData";
import { useState } from "react";

function SpeakersList({showSessions}){
    const [speakersData, setSpeakersData] = useState(data);
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
    return(<div className="container speakers-list">
    <div className="row">
        {speakersData.map((speaker)=>{ return(<Speaker key={speaker.id} speaker={speaker} 
        showSessions={showSessions} onFavoriteToggle={()=>{onFavoriteToggle(speaker.id)}}/>);})}
    </div>
</div>);
}

export default SpeakersList;