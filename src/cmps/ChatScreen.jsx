import { useEffect, useState } from "react"
import { Avatar } from '@material-ui/core'
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux";

export function ChatScreen(){
    let loggedinUser = useSelector( storeState => storeState.loggedinUser ) 
    const game = useParams()
    const [input, setInput] = useState('')
    const [gameData, setGameData] = useState(null)

    useEffect( () => {
        loadMessages()
    }, [])

    function loadMessages(){
        var res = loggedinUser.likedGamesArray.find(likedGame=>{
            if(likedGame.id === game.boardgame )
                return game
            }
        )
        setGameData(res)
    }

    function handleSend(e){
        e.preventDefault()
        setMessages([...messages, { message: input}])
        setInput('')
    }

    if (!gameData) return <p> loading game messages. </p>
    return(
        <section className="chat-screen-container">
            <p className="chat-screen-time"> 
                {`YOU MATCHED WITH ${ (gameData.name.toUpperCase())} ON 
                    ${new Date().toLocaleDateString()}`} </p>
            {gameData.messages.map((item, index) =>(
                item.name ? (
                <div className="chat-screen-message" key={item.name + index}>
                    <Avatar 
                        className="chat-screen-image" 
                        alt={item.name}
                        src={item.image}
                        key={index}
                    />
                    <p className="chat-screen-text" key={index + item.name}> 
                        {item.message} 
                    </p>
                </div>
                ) : (
                    <div className="chat-screen-message" key={item.message + index}>
                        <p className="chat-screen-text-user" key={item.message + 's'}> 
                            {item.message} 
                        </p>
                    </div>
                )
                
            ))}

            <form className="chat-screen-input">
                <input 
                    type="text" 
                    className="chat-screen-input-field" 
                    placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button 
                    onClick={handleSend}
                    type="submit"
                    className="chat-screen-input-btn">
                    SEND
                </button>
            </form>
        </section>
    )
}