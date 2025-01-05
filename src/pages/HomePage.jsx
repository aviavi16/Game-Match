import { useEffect, useState } from "react"
import TinderCard from "react-tinder-card"
import { xmlUtilService } from "../services/xmlUtil.service"

export function HomePage(){
    const [people, setPeople] = useState([
        {name: "Gaia Project", url: "https://res.cloudinary.com/thekingdom/image/fetch/c_limit,f_jpg,h_555,q_auto,w_555/https://cf.geekdo-images.com/images/pic3528112.jpg"},
        {name: "Terraforming mars", url: "https://images.squarespace-cdn.com/content/v1/591861c529687fd2ca03c3f3/1665422600142-L0C42JQ49BJNHIODGV07/Spiral+Galaxy+Oct22-3.jpg?format=2500w"},
        {name: "Great western trail", url: "https://m.media-amazon.com/images/I/81jyHMaoiVL.__AC_SX300_SY300_QL70_FMwebp_.jpg"},
        {name: "Anachrony", url: "https://lostdice.com/wp-content/uploads/2017/05/Anachrony-Box-Cover-550x381.jpg"},
    ])

    useEffect(() => {
        //loadData()
    }, [])

    async function loadData(){
        var data = await xmlUtilService.getProxyData("aviavi123123")
        console.log('data:', data)
        var data2 = await xmlUtilService.getProxyData("aviavi16")
        var parser = new DOMParser();
        var xmlDoc = parser.parseFromString(data2, "text/xml");
        //Get the number of items - we know this will be two because we only passed in two IDs
        var numberOfNames = xmlDoc.getElementsByTagName("item").length;
        
        //Create an array of the items
        var items = xmlDoc.getElementsByTagName("item");
        for (var i=0; i<numberOfNames; i++) {
            //Create a new paragraph tag
            var tempName = document.createElement("p");
            
            //Get the name of a game in the collection
            var gameName = items[i].getElementsByTagName('name')[0].innerHTML;
           
            //Set the contents of the paragraph tag to the game name
            tempName.innerHTML = gameName;
            
            //Add the paragraph tag to the div in the body
            document.getElementById("gameNames").appendChild(tempName);
        }
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