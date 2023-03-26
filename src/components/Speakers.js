import {data} from "../../SpeakerData";
import SpeakersList from "./SpeakersList"
import Header from "./Header"
import SpeakersToolBar from "./SpeakersToolBar"

function Speakers(){
    return(
        <div className="container-fluid">
            <Header/>
            <SpeakersToolBar/>
            <SpeakersList data={data}/>
        </div>
    );
}

export default Speakers;