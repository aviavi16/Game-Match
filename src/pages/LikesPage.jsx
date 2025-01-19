import { Like } from "../cmps/Like"
import { useEffect, useState } from "react"
import { bggService } from "../services/bgg.service"

export function LikesPage(){
    const [ likedGamesArray, setLikedGamesArray] = useState([])

    useEffect( () => {
        loadLikes()
    }, [])

    async function loadLikes(){
        const likedGames =  await bggService.getLikedGames()
        setLikedGamesArray(await likedGames.likedGamesArray)
    }

    if (!likedGamesArray || !likedGamesArray[0]) return <p> No likes yet, Please discover new games. </p>
    return ( 
        <section className="likes-page">
            <div className="likes-header">
                Likes
            </div>
            <div className="likes-page-container">
                <div className="likes-title-container">
                    <div className="likes-title">
                        Boardgames you like
                    </div>
                    <div className="likes-subtTitle">
                        subTitle
                    </div>
                </div>
               
                <div className="like-list-container">
                {likedGamesArray.map(boardGame =>{  
                    const { id, name, image} = boardGame
                    if ( name === null || image  === null)
                        return

                    
                    return <Like 
                        name={name} 
                        timestamp="40 seconds ago"
                        key={id}
                        profilePic={image}
                      >
                    </Like>  
                }              
                )}
                   
                </div>
            </div>
        </section>    
    )
}