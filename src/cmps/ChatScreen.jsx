import { useState } from "react"
import { Avatar } from '@material-ui/core'
import { useParams } from "react-router-dom"

export function ChatScreen(){
    const game = useParams()
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([
        {
            name: "Gaia",
            image: "https://res.cloudinary.com/thekingdom/image/fetch/c_limit,f_jpg,h_555,q_auto,w_555/https://cf.geekdo-images.com/images/pic3528112.jpg",
            message: "Did you buy it?"
        },
        {
            message: "Yeah!"
        }
    ])

    function handleSend(e){
        e.preventDefault()
        setMessages([...messages, { message: input}])
    }

    return(
        <section className="chat-screen-container">
            <p className="chat-screen-time"> 
                {`YOU MATCHED WITH ${ (game.person.toUpperCase())} ON 
                    ${new Date().toLocaleDateString()}`} </p>
            {messages.map((item, index) =>(
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