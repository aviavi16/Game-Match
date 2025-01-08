import { useEffect, useState } from "react"
import TinderCard from "react-tinder-card"
import { bggService } from "../services/bgg.service"
import { xmlUtilService } from "../services/xmlUtil.service"

import { useSelector } from "react-redux"

export function HomePage(){
    let gamesArray = useSelector( storeState => storeState.bggHottestGames ) 

    const [people, setPeople] = useState([
        {name: "Gaia Project", url: "https://res.cloudinary.com/thekingdom/image/fetch/c_limit,f_jpg,h_555,q_auto,w_555/https://cf.geekdo-images.com/images/pic3528112.jpg"},
        {name: "Terraforming mars", url: "https://images.squarespace-cdn.com/content/v1/591861c529687fd2ca03c3f3/1665422600142-L0C42JQ49BJNHIODGV07/Spiral+Galaxy+Oct22-3.jpg?format=2500w"},
        {name: "Great western trail", url: "https://m.media-amazon.com/images/I/81jyHMaoiVL.__AC_SX300_SY300_QL70_FMwebp_.jpg"},
        {name: "Anachrony", url: "https://lostdice.com/wp-content/uploads/2017/05/Anachrony-Box-Cover-550x381.jpg"},
    ])

    useEffect(() => {
        loadData()
    }, [])

    async function loadData(){
         var data2 = await bggService.getBGGCollection("aviavi16")
         console.log('data2:', data2)
         loadNext5Games(gamesArray)
        //  setPeople()
    }

    async function loadNext5Games( gamesArray){
        var nextGames = []
        for(var i =0; i< 5; i++){
            const bggArr = await gamesArray
            console.log('wait gamesArray[0]:',bggArr[i].id)
            var gameData = await xmlUtilService.getGameDataById(bggArr[i].id)
            nextGames.push(gameData)
        }
        setPeople( nextGames  )
    }

    function swiped (direction, nameToDelete){
        console.log('recieving' + nameToDelete)
    }

    function outOfFrame (name){
        console.log( name + ' left the screen') 
    }

    return (
        <section className="game-match">
            <div className="home-page-container">
                {people.map( (person) =>(
                    <TinderCard 
                        className="swipe"
                        key={person.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={dir => swiped(dir, person.name)}
                        onCardLeftScreen={() => outOfFrame(person.name)}>
                            <div className="image-container">
                                <img className="image-test" src={`${person.url}`} />
                            </div>
                       
                        {/* <div className="card" style={{backgroundImage: `url(${person.url})`}}>
                            <h3> {person.name} </h3>
                        </div> */}
                    </TinderCard>
                ))}
            </div>
            <div id="gameNames"></div>

        </section>
    )
}