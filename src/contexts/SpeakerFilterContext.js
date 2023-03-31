import { createContext, useContext } from "react";
import useSpeakerFilter from "../hooks/useSpeakerFilter";

const SpeakerFilterContext = createContext();

function SpeakerFilterProvider({ startingShowSessions = false, children }) {
  const { showSessions, setShowSessions } =
    useSpeakerFilter(startingShowSessions);

  return (
    <SpeakerFilterContext.Provider value={{ showSessions, setShowSessions }}>
      {children}
    </SpeakerFilterContext.Provider>
  );
}

export { SpeakerFilterContext, SpeakerFilterProvider };
