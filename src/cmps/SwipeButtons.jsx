import ReplayIcon from '@material-ui/icons/Replay'
import { IconButton }  from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import StarRateIcon from '@material-ui/icons/StarRate'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FlashOnIcon from '@material-ui/icons/FlashOn'
import LikeIcon from '../assets/svgs/likes.svg?react'

export function SwipeButtons(){
    return (
        <section className="swipe-btns-container">
             <IconButton className='swipe-btns-repeat'>
                <ReplayIcon fontSize='large' />
            </IconButton>
            <IconButton className='swipe-btns-left'>
                <CloseIcon fontSize='large' className="header-icon" />       
            </IconButton>
            <IconButton className='swipe-btns-star'>
                <StarRateIcon fontSize='large' className="header-icon" />       
            </IconButton>
            
            <IconButton className="swipe-btns-like">
                <span aria-hidden="true" className="like-icon-wrapper">          
                    <LikeIcon className="header-icon" />
                </span>
            </IconButton>
           
                
            
            <IconButton className='swipe-btns-lightning'>
                <FlashOnIcon fontSize='large' className="header-icon" />       
            </IconButton>
        </section>
    )
}