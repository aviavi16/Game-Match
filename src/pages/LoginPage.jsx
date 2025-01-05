import { useNavigate } from "react-router-dom";
import logo from "../assets/imgs/gameMatch-logo3.webp"
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service";
import { loginUser, logoutUser } from "../store/user/user.actions";
import { userService } from "../services/user.service.remote";
import { useSelector } from "react-redux";

export function LoginPage() {
  const [isSignup, setIsSignup] = useState(false)

  const [username, setUsername] = useState('')
  const [bggUser, setBggUser] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const navigate = useNavigate()

  //will be in the store in the future
  let loggedinUser = useSelector( storeState => storeState.loggedinUser ) 

  function onValidation () {
    // Set initial error values to empty
    setUsernameError('')
    setPasswordError('')
    setConfirmPasswordError('')

    // Check if the user has entered both fields correctly
    if ('' === username) {
        setUsernameError('Please enter your username')
        throw 'validation error'
    }

    if (!/^[\w-\.]+/.test(username)) {
        setUsernameError('Please enter a valid username')
        throw 'validation error'
    }

    if ('' === password) {
        setPasswordError('Please enter a password')
        throw 'validation error'
    }

    if (password.length < 7) {
        setPasswordError('The password must be 8 characters or longer')
        throw 'validation error'
    }

    if (isSignup){
        if ('' === confirmPassword) {
            setConfirmPasswordError('Please enter your confirm Password')
            throw 'validation error'
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('your confirm Password and password must be identical')
            throw 'validation error'
        }

        if ('' === username) {
            setUsernameError('Please enter your username')
            throw 'validation error'
        }

    }
  }

  async function onLogin () {
    try{
        onValidation()
    }catch (err){
        console.log('validation error :', err)
        return
    }

    try {
        var loggedUser = await userService.login ( { 
            username,
            password,
        } )
        loginUser(loggedUser)
    } catch (err) {
        console.log('cannot login :', err.response ? err.response.data: err)
        showErrorMsg( 'Cannot login ')
    } finally{
        navigate('/homepage')
    }

  }

  function onBackLogin(){
    setIsSignup ( false )
  }

  function onSignup () {
    setIsSignup ( true )
  }

  async function onSubmit () {
    try{
        onValidation()
    }catch (err){
        console.log('validation error :', err)
        return
    }

    try {
        const user = await userService.signup( { 
            username,
            bggUser,
            password,
        } )
        loginUser(user)
        showSuccessMsg( `Welcome ${user?.username}`)

    } catch (err) {
        console.log('cannot signup :', err)
        showErrorMsg( 'Cannot signup ')
    }finally{
        navigate('/homepage')
    }
  } 

  async function onGuest () {
    try {
      const user = { 
          username: "guest",
          bggUser: "guest",
          password: "guest",
          likedGamesArray: [],
          superLikedGames: []
      } 
      loginUser(user)
      showSuccessMsg( `Welcome ${user?.username}`)

    } catch (err) {
        console.log('cannot signup :', err)
        showErrorMsg( 'Cannot signup ')
    }finally{
        navigate('/homepage') 
    }
  }
    
  async function onLogout () {
    try {
        await userService.logout()
        logoutUser(null)
    } catch (err) {
        console.log('cannot logout')
    } 
  }

  return (
      <section className="login-page-container">
          <div className="login-page-bg-container">
              <div className="login-page-title-container">
                  <div className="login-title-logo"><img src={logo} className='menu-logo' alt='menu'/></div>
                  <div className="login-title-text-container">
                    <div className="login-title-text">Game </div>
                    <div className="login-title-text">Match </div>
                  </div>"
                  
              </div>
          </div>
          <div className="login-page-bg-container2">
            {!loggedinUser && 
                <form className='form-container'>
                    <div className={'mainContainer'}>
                        {!isSignup && <div className={'titleContainer'}>
                            <div>Login</div>
                        </div>}

                        {isSignup && <div className={'titleContainer'}>
                            <div>Signup</div>
                        </div>}
                        <br />
                      
                        <div className={'username-container'}>
                            <input
                            value={username}
                            placeholder="Username"
                            onChange={(ev) => setUsername(ev.target.value)}
                            className={'inputBox'}
                            />
                            <label className="errorLabel">{usernameError}</label>
                        </div>
                        <br />
                        <div className={'password-container'}>
                            <input
                            value={password}
                            placeholder="Password"
                            onChange={(ev) => setPassword(ev.target.value)}
                            className={'inputBox'}
                            />
                            <label className="errorLabel">{passwordError}</label>
                        </div>

                        <br />
                        {isSignup && 
                        <div className='signup-extra-fields'>

                            <div className={'confirm-password-container'}>
                            <input
                                value={confirmPassword}
                                placeholder="Confirm Password"
                                onChange={(ev) => setConfirmPassword(ev.target.value)}
                                className={'inputBox'}
                                required
                                />
                                <label className="errorLabel">{confirmPasswordError}</label>
                            </div>

                            <br/>
                            <div className={'bggUser-container'}>
                            <input
                                value={bggUser}
                                placeholder="BggUser"
                                onChange={(ev) => setBggUser(ev.target.value)}
                                className={'inputBox'}
                                required
                                />
                            </div>
                        </div>
                        }
                        <br />
                        <div className={'actions-btn'}>
                            {!isSignup && <div className='login-btns-container'>
                                <button className="button-19" role="button" onClick={onLogin} type="button"> Log in </button>
                                <button className="button-19" role="button" onClick={onSignup} type="button"> Sign up </button>
                                <button type="button" onClick={onGuest} className="button-19" role="button"> Continue as a Guest </button>
                            </div>
                            }
                            {isSignup&& <div className='login-btns-container'>
                                <button className="button-19" role="button" onClick={onBackLogin} type="button"> Back to Log in </button>
                                <button className="button-19" role="button" onClick={onSubmit} type="button"> Submit </button>
                            </div>}
                            
                        </div>
                    </div>
                </form>
                }
            
          </div>
          <div className="login-page-bg-container3">
            

            {loggedinUser && 
              <div className='welcome-user'>
                  <h3> Hello {loggedinUser.username} </h3>
                  {console.log('loggedinUser:', loggedinUser)}
                  <button className="button-19" role="button" onClick={onLogout} type="button"> Log out </button>
              </div>
            }
          </div>
          
          
      </section>
  )
}