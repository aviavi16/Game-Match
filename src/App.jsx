
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Menu } from './cmps/Menu';
import { HomePage } from './pages/HomePage';
import { SwipeButtons } from './cmps/SwipeButtons';
import { Chats } from './cmps/Chats';
import { ChatScreen } from './cmps/ChatScreen';
import { LoginPage } from './pages/LoginPage';
import { UserMsg } from './cmps/UserMsg';
import { BrowsePage } from './pages/BrowsePage';
export function App() {

    return (
        <section className='main-app'>
            <UserMsg />
            <Router>
                <Routes >
                    <Route path='/messages/:boardgame' element={
                        <>       
                            <ChatScreen />
                            <Menu />
                        </>
                    }> </Route>
                    <Route path='/messages' element={
                        <>             
                            <Chats />  
                            <Menu />       
                        </>
                    }> </Route>
                    <Route path='/homepage' element={
                        <>
                            <HomePage />
                            <SwipeButtons /> 
                            <Menu />
                        </>  
                               
                    } />
                    <Route path='/search' element={
                        <>
                            <BrowsePage />
                            <SwipeButtons /> 
                            <Menu />
                        </>                        
                    } />
                    <Route path='/likes' element={
                        <>
                            <Chats />
                            <SwipeButtons /> 
                            <Menu />
                        </>                        
                    } />
                    <Route path='/' element={
                        <>
                            <LoginPage /> 
                        </>  
                               
                    } />
                </Routes >
            </Router>
        </section>


    )
}

