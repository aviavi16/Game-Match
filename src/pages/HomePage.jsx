import { useEffect, useRef, useState } from "react"
import TinderCard from "react-tinder-card"
import { bggService } from "../services/bgg.service"
import { xmlUtilService } from "../services/xmlUtil.service"
import SearchIcon from '../assets/svgs/search.svg?react';

import { useSelector } from "react-redux"
import Tooltip from '@mui/material/Tooltip';
import { setBrowse } from "../store/games/games.actions"
import { useNavigate, useParams } from "react-router-dom"
import { utilService } from "../services/util.service"

export function HomePage(){
    const params = useParams()
    const [searchTerm, setSearchTerm] = useState(utilService.getFilterFromSearchParams(params)); // Declare and initialize searchTerm
    const navigate = useNavigate()

    let countdownToExtincion = 5
    let gamesArray = useSelector( storeState => storeState.bggHottestGames ) 
    const [boardGames, setBoardGames] = useState([])

    useEffect(() => {
        loadData()
    }, [])

    async function loadData(){
        let hottestGamesArray_mini = await bggService.getHottestGames()
        setBoardGames( hottestGamesArray_mini)
    }

    function swiped (direction, nameToDelete){
        console.log('recieving' + nameToDelete)
    }

    function outOfFrame (name){
        bggService.sendLog()
        console.log( name + ' left the screen') 
    }

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
                
                {boardGames.map( (boardGame) =>{
                    const { id, name, image} = boardGame
                    if ( name === null || image  === null)
                        return
                    return <TinderCard 
                        className="swipe"
                        key={boardGame.name}
                        preventSwipe={['up', 'down']}
                        onSwipe={dir => swiped(dir, boardGame.name)}
                        onCardLeftScreen={() => outOfFrame(boardGame.name)}>
                            <div className="card-container">
                                <div className="image-container">
                                    <img className="image-test" src={`${boardGame.image}`} />
                                </div>
                            </div>
                    </TinderCard>
                }
                    
                )}
            </div>
            <div id="gameNames"></div>

        </section>
    )
}