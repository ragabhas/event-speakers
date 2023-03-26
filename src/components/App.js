import {data} from "../../SpeakerData";
import SpeakersList from "./SpeakersList"
import Header from "./Header"
import SpeakersToolBar from "./SpeakersToolBar"
import { useState } from "react";

function App(){
    
    const [theme, setTheme] = useState("light");
    
    return(
        <div className={
            theme == "light"? "container-fluid light":"container-fluid dark"}>
            <Header theme={theme}/>
            <SpeakersToolBar theme={theme} setTheme={setTheme}/>
            <SpeakersList data={data}/>
        </div>
    );
}

export default App;