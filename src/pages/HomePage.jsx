import React, { useEffect, useRef, useState } from "react"
import TinderCard from "react-tinder-card"
import { bggService } from "../services/bgg.service"
import SearchIcon from '../assets/svgs/search.svg?react';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate, useParams } from "react-router-dom"
import { utilService } from "../services/util.service"
import { SwipeButtons } from "../cmps/SwipeButtons";
import { useDispatch, useSelector } from "react-redux";
import { showErrorMsg } from "../services/event-bus.service";
import { addToLiked, initializeHottestGames, initializeUserData } from "../store/games/games.actions";

export function HomePage(){
    const params = useParams()
    const [searchTerm, setSearchTerm] = useState(utilService.getFilterFromSearchParams(params)); // Declare and initialize searchTerm
    const navigate = useNavigate()

    //let gamesArray = useSelector( storeState => storeState.bggHottestGames ) 
    const [boardGames, setBoardGames] = useState([])
    const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index
    const childRefs = useRef([]); // Array of refs for the TinderCards
    const userData = useSelector((state) => state.userData); // ✅ מקבל את ה-userData מה-Redux
    const hottestGamesArray = useSelector((state) => state.bggHottestGames); // Get data from Redux
    const dispatch = useDispatch();

    useEffect(() => {
        if (hottestGamesArray.length === 0) {
            loadData();
        }
    }, [hottestGamesArray])

    useEffect(() => {
        if (userData.length === 0) { // ✅ מוודא שהמידע לא נטען כבר
            loadUserData();
        }
        console.log('userData:', userData)
    }, [])

    async function loadUserData() {
        try {
            let userDataFromServer = await bggService.getUserData(); // API
            dispatch(initializeUserData(userDataFromServer)); // ✅ Redux
        } catch (err) {
            console.error("Failed to load user data:", err);
        }
    }

    async function loadData(){
        try {
            let hottestGamesArray_mini = await bggService.getHottestGames();
            setBoardGames( hottestGamesArray_mini)
            childRefs.current = Array(30)
               .fill(0)
               .map(() => React.createRef());
            dispatch(initializeHottestGames(hottestGamesArray_mini)); // ✅ Dispatch action
        } catch (err) {
            console.error("Failed to load hottest games:", err);
        }
       
    }

    function swiped (direction, boardGame){
        if(userData.username === 'guest'){
            console.log('user not logged in, this is guest user, your choices would not be saved')
            showErrorMsg('user not logged in, this is guest user, your choices would not be saved')
        } 

        const {  name, image } = boardGame

        if(direction === 'right'){
            let messages = [{name, image, message: "Do you own this game?" }]
            console.log('this:', boardGame)
            boardGame["messages"]= messages
            addToLiked(boardGame)
            console.log('userData:', userData)
        } else{
            console.log('direction:', direction)
        }
        console.log('recieving' + name)
        setCurrentIndex((prevIndex) => {
            const nextIndex = prevIndex + 1;
            return nextIndex;
        });
    }

    function outOfFrame (name){
        bggService.sendLog()
        console.log( name + ' left the screen') 
    }

    const swipe = (dir) => {
        console.log(`Attempting to swipe ${dir}`);
        if (currentIndex < boardGames.length) {
            const cardRef = childRefs.current[currentIndex].current;
            if (cardRef) {
                console.log(`Swiping card at index: ${currentIndex}, direction: ${dir}`);

                cardRef.swipe(dir); // Programmatically swipe the current card
            } else {
                console.log('boardGames.length' , boardGames.length, 'currentIndex:', currentIndex)
                console.warn("No more cards to swipe!");
            }
        }
    };

    function handleSearchClick() {
        if (!searchTerm.filterText) navigate(`/search/${searchTerm.filterText}`)
    }

    const handleSearchChange = (event) => {
        if (event.target.value)
            navigate(`/search/${event.target.value}`)
        setSearchTerm({ filterText: event.target.value }); // Update searchTerm state when input changes
    }

    const handleOtherButtonClick = () => {
        onClickSearch()
        setActiveButton(''); // Reset active button on other button click
    }

    if (!boardGames) return <p> Please wait. </p>
    return (
        <section className="game-match">
            <div className="home-page-container">
                {/* Search Bar */}
                <div className="search-bar-mobile">
                    <Tooltip title="Search" arrow>
                        <div onClick={handleOtherButtonClick}>
                            <SearchIcon className="search-icon" />
                        </div>
                    </Tooltip>
                    <input
                        type="text" 
                        className='search-bar-input'
                        placeholder="Is there a specific game you have in mind?"
                        value={searchTerm.filterText}  // Bind searchTerm to input
                        onChange={handleSearchChange} // Handle input change
                        onClick={handleSearchClick}
                    />
                </div>
                
                {boardGames.slice(0) // Create a shallow copy of the array
                        .reverse() // Reverse the array to match the visual stacking order
                        .map((boardGame, index) =>{  
                    const actualIndex = boardGames.length - 1 - index; // Correct the index for the original array
                    const { id, name, image} = boardGame
                    if ( name === null || image  === null)
                        return

                    const ref = childRefs.current[actualIndex]; // Use the original array index for refs
                    
                    return <TinderCard 
                        ref={ref} // Pass the ref here
                        className="swipe"
                        key={boardGame.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={dir => swiped(dir, boardGame)}
                        onCardLeftScreen={() => outOfFrame(boardGame.name)}>
                            <div className="card-container">
                                <div className="image-container">
                                    <img className="image-test" src={`${boardGame.image}`} />
                                </div>
                            </div>
                    </TinderCard>  
                }              
                )}
                <SwipeButtons  onSwipe={swiped}
                    onOutOfFrame={outOfFrame}
                    swipe={swipe} // Pass the swipe function to buttons
                /> 
            </div>
        </section>
    )
}