
import { HashRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { Menu } from './cmps/Menu';
import { HomePage } from './pages/HomePage';
import { SwipeButtons } from './cmps/SwipeButtons';
import { Chats } from './cmps/Chats';
import { ChatScreen } from './cmps/ChatScreen';
import { LoginPage } from './pages/LoginPage';
export function App() {

    return (
        <section className='main-app'>
            <Router>
                <Routes >
                    <Route path='/chat/:person' element={
                        <>       
                            <ChatScreen />
                            <Menu />
                        </>
                    }> </Route>
                    <Route path='/chat' element={
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

