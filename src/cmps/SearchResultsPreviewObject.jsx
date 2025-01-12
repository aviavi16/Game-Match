import { useState } from 'react';
import { useNavigate } from 'react-router';

export function SearchResultsPreviewObject({ miniObject }){
    const isArtistImageExist= miniObject.image ? true : false
    const isArtistImage= miniObject.type === "artist" ? true : false
    const navigate = useNavigate();

    function truncateText(text, maxLength) {
        return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
    }

    return (
        <section className="search-results-preview-object">
            <div 
                className="search-results-mini-details-container">      
                <div className="search-result-object-mini-details-sub-container">
                    <div className="search-result-object-music-cover-container">
                         
                            <img className={isArtistImage ? "search-result-object-music-cover-artist" : "search-result-object-music-cover"} src={miniObject.image}
                            alt={`track artwork for ${truncateText(miniObject?.name || 'not found', 20)}`}
                        />
                    </div>
            
                    <div className="search-result-object-mini-details">
                        <p className="search-result-object-title">{truncateText(miniObject?.name || 'not found', 20)}</p>
                        {miniObject.type === 'playlist' ? (
                            <p className="search-result-object-subtitle">By {truncateText(miniObject?.owner || 'not found', 20)}</p>
                        ): ''}
                        {miniObject.type === 'album' ? (
                            <p className="search-result-object-subtitle">By {truncateText(miniObject?.artist || 'not found', 20)}</p>
                        ): ''}
                       
                    </div>
                </div>
            </div>
                
        </section>
    )
}