import { useParams } from "react-router-dom";

function PhotoDetails(){
    const {id} = useParams();
    return <h1>Photo {id}</h1>;
}

export default PhotoDetails;