import SpeakersToolBar from "./SpeakersToolBar"
import SpeakersList from "./SpeakersList"
import { useState } from "react";

function Speakers({theme, setTheme}){
    const [showSessions, setShowSessions] = useState(true);
    return (
    <>
    <SpeakersToolBar theme={theme} setTheme={setTheme}
    showSessions={showSessions} setShowSessions={setShowSessions}/>
    <SpeakersList showSessions={showSessions}/>
    </>
    );
}

export default Speakers;