
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './cmps/Header';
import { GameMatchCards } from './cmps/GameMatchCards';
import { SwipeButtons } from './cmps/SwipeButtons';
import { Chats } from './cmps/Chats';
import { ChatScreen } from './cmps/ChatScreen';
export function App() {

    return (
        <section className='main-app'>
            <Router>
                <Routes >
                    <Route path='/chat/:person' element={
                        <>
                            <Header backButton="/chat" />
                            <ChatScreen />
                        </>
                    }> </Route>
                    <Route path='/chat' element={
                        <>
                            <Header backButton="/" />
                            <Chats />
                        </>
                    }> </Route>
                    <Route path='/' element={
                        <>
                            <Header />
                            <GameMatchCards />
                            <SwipeButtons /> 
                        </>         
                } />
                </Routes >
            </Router>
        </section>


    )
}

