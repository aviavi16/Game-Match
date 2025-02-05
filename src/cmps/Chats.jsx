import { useSelector } from "react-redux";
import { Chat } from "./Chat";

export function Chats(){
    let userData = useSelector( storeState => storeState.userData ) 

    if (!userData.likedGamesArray[0]) return <p> No likes yet, Please discover new games. </p>
    return(
        <section className="chats-container">
            {userData.likedGamesArray.map(boardGame =>{  
                const { id, name, image} = boardGame
                if ( name === null || image  === null)
                    return

                
                return <Chat 
                    id={id}
                    name={name} 
                    timestamp="40 seconds ago"
                    key={id}
                    profilePic={image}
                    message = "Did we play it already?"
                    >
                </Chat>  
            }              
            )}
        </section>
    )
}