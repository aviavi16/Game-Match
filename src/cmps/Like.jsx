import { Link } from "react-router-dom";
import { Avatar } from '@material-ui/core'
export function Like({ name, message, timestamp, profilePic}){

    function navigate(path){

    }
    
    return (
        <section >
            <div className="like-container" onClick={navigate(`/like/${name}`)}>
                <div className="like-details">
                    <h2> {name} </h2>
                    <p> {message} </p>
                </div>
                <div className="like">
                    <Avatar className="like-image" alt={name}
                        src={profilePic} />
                        <p className="like-timestamps"> {timestamp} </p>
                </div>
            </div>
        </section>
    )
}