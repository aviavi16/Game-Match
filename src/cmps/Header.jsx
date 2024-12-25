import PersonIcon from '@material-ui/icons/Person'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos'
import { IconButton }  from '@material-ui/core'
import ForumIcon from '@material-ui/icons/Forum'
import logo from "../assets/imgs/logo.png"
import { Link , useNavigate } from 'react-router-dom'

export function Header({ backButton }){
    const navigateTo = useNavigate()

    return(
        <section className="header-container">
            {backButton ? (
                <IconButton className='header-icon-container' onClick={ () => navigateTo(backButton)}>
                    <ArrowBackIosIcon 
                        fontSize='large' 
                        className="header-icon" 
                    />
                </IconButton>
            ): (
                <IconButton className='header-icon-container'>
                    <PersonIcon fontSize='large' className="header-icon" />
                </IconButton>
            )}
           
            <Link to="/"> 
                <img src={logo} className='header-logo' alt='header'/>
            </Link>
            <Link to="/chat"> 
                <IconButton className='header-icon-container'>
                    <ForumIcon fontSize='large' className="header-icon" />       
                </IconButton>
            </Link>
        </section>
    )
}