import PersonIcon from '@material-ui/icons/Person'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { IconButton }  from '@material-ui/core'
import ForumIcon from '@material-ui/icons/Forum'
import { useNavigate } from 'react-router-dom'
import PreferencesIcon from '../assets/svgs/preferences.svg?react'
import LikesIcon from '../assets/svgs/likes.svg?react'
import DiscoverIcon from '../assets/svgs/discover.svg?react'
import MessagesIcon from '../assets/svgs/messages.svg?react'
import profileIcon from "../assets/imgs/profileIcon2.png"

export function Menu({ }){
    const navigate = useNavigate()

    function navigateToPref(){
        navigate("/preferences")
    }

    function navigateHome(){
        navigate("/homepage")
    }

    function navigateToLikes(){
        navigate("/likes")
    }

    function navigateToMessages(){
        navigate("/messages")
    }
    
    return(
        <section className="menu-container">
            <div className='menu-icons-container'>
                <IconButton className='menu-icon-container' onClick={navigateHome}>
                    <DiscoverIcon className="menu-icon" />                  
                </IconButton>
                <IconButton className='menu-icon-container' onClick={navigateToLikes}>
                    <LikesIcon className="menu-icon" />                  
                </IconButton>  
                <IconButton className='menu-icon-container' onClick={navigateToMessages}>
                    <MessagesIcon className="menu-icon" />                  
                </IconButton>
                <IconButton className='menu-icon-container' onClick={navigateToPref}>
                    <PreferencesIcon className="menu-icon" />                  
                </IconButton>  
                <IconButton className='menu-icon-container'>
                    <img src={profileIcon} className="menu-icon" />
                </IconButton>
            </div>
            
            <div className='menu-text-container'>
                <div className='discover-text'>
                    Discover
                </div>
                <div className='likes-text'>
                    Likes
                </div>
                <div className='chat-text'>
                    Messages
                </div>
                <div className='preferences-text'>
                    Preferences
                </div>
                <div className='profile-text'>
                    Profile
                </div>         
                               
            </div>
        </section>
    )
}