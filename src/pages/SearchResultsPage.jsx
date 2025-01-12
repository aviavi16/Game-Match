import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import { SearchResultsPreviewObject } from "../cmps/SearchResultsPreviewObject.jsx";
import { utilService } from "../services/util.service.js";
import { TopResult } from "../cmps/TopResult.jsx";
import { bggService } from "../services/bgg.service.js";
import { xmlUtilService } from "../services/xmlUtil.service.js";

export function SearchResultsPage() {
    const DEBOUNCETIME = 300 //TODO should be in config
    const debounceFilterBy =
        useCallback(utilService.debounce(loadFilterResults, DEBOUNCETIME), [])

    const [foundBoardgames, setFoundBoardgames] = useState([])

    const params = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(params); // Declare and initialize searchTerm

    useEffect(() => {
        debounceFilterBy(params)
    }, [params])

    async function loadFilterResults(parameter) {
        const boardgamesArrData = await bggService.getGamesArrayByTitle(parameter.filterText)
        const boardgamesArr = await xmlUtilService.getGamesArrayByName(boardgamesArrData)
        console.log('boardgamesArr:', boardgamesArr)
        setFoundBoardgames(boardgamesArr ? boardgamesArr : [])
    }
    if (!foundBoardgames[0]) return <span> page loading.. </span>
    return (
        <section className="station-filter-container">
            <div className="filter-top-result-container">
                <div className="title">
                    <h2>
                        <span> Top result </span>
                    </h2>
                </div>

               <TopResult topResult={foundBoardgames[0]}/>

            </div>

            <div className="filter-list-container">
                <div className="title">
                    <h2>
                        <span> header </span>
                    </h2>
                </div>

                <div className="list-container">
                    {foundBoardgames.slice(1).map((boardgame, i) => {
                        return <SearchResultsPreviewObject miniObject={boardgame} key={boardgame.id} />
                    }
                    )}
                </div>
            </div>
        </section>
    )
}