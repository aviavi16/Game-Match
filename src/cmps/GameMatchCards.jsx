import { useState } from "react"
import TinderCard from "react-tinder-card"

export function GameMatchCards(){
    const [people, setPeople] = useState([
        {name: "Gaia Project", url: "https://res.cloudinary.com/thekingdom/image/fetch/c_limit,f_jpg,h_555,q_auto,w_555/https://cf.geekdo-images.com/images/pic3528112.jpg"},
        {name: "Terraforming mars", url: "https://images.squarespace-cdn.com/content/v1/591861c529687fd2ca03c3f3/1665422600142-L0C42JQ49BJNHIODGV07/Spiral+Galaxy+Oct22-3.jpg?format=2500w"},
        {name: "Great western trail", url: "https://m.media-amazon.com/images/I/81jyHMaoiVL.__AC_SX300_SY300_QL70_FMwebp_.jpg"},
        {name: "Anachrony", url: "https://lostdice.com/wp-content/uploads/2017/05/Anachrony-Box-Cover-550x381.jpg"},
    ])

    function swiped (direction, nameToDelete){
        console.log('recieving' + nameToDelete)
    }

    function outOfFrame (name){
        console.log( name + ' left the screen') 
    }

    return (
        <section className="game-match">
            <div className="game-match-cards-container">
                {people.map( (person) =>(
                    <TinderCard 
                        className="swipe"
                        key={person.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={dir => swiped(dir, person.name)}
                        onCardLeftScreeGaia Project
                        Terraforming mars
                        Great western trail
                        n={() => outOfFrame(person.name)}>
                        
                        <div className="card" style={{backgroundImage: `url(${person.url})`}}>
                            <h3> {person.name} </h3>
                        </div>
                    </TinderCard>
                ))}
            </div>

        </section>
    )
}