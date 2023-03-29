import SpeakersToolBar from "./SpeakersToolBar";
import SpeakersList from "./SpeakersList";
import { useState } from "react";

function Speakers() {
  const [showSessions, setShowSessions] = useState(true);
  return (
    <>
      <SpeakersToolBar
        showSessions={showSessions}
        setShowSessions={setShowSessions}
      />
      <SpeakersList showSessions={showSessions} />
    </>
  );
}

export default Speakers;
