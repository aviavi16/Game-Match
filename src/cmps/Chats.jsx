import { Chat } from "./Chat";

export function Chats(){
    return(
        <section className="chats-container">
            <Chat
                name = "Gaia"
                message = "Did we play it already?"
                timestamp= "40 seconds ago"
                profilePic="https://res.cloudinary.com/thekingdom/image/fetch/c_limit,f_jpg,h_555,q_auto,w_555/https://cf.geekdo-images.com/images/pic3528112.jpg"
            />
            <Chat
                name = "terraforming"
                message = "Did we play it already?"
                timestamp= "55 minutes ago"
                profilePic="https://images.squarespace-cdn.com/content/v1/591861c529687fd2ca03c3f3/1665422600142-L0C42JQ49BJNHIODGV07/Spiral+Galaxy+Oct22-3.jpg?format=2500w"
            />
        </section>
    )
}