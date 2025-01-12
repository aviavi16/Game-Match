export function TopResult({ topResult }){ 
    return(
        <div className="top-result-container">
        <div className="top-result-sub-container">
            <div className="artist-image-container" >
                <img className="artist-image" src={topResult.image} />                      
            </div>
            <div className="artist-name">
                {topResult.name ? topResult.name : "not found"}
            </div>

            <span> Year </span>
            <div className='top-result-item-btn-container'>
                
            </div>
        </div>
    </div>
    )
}