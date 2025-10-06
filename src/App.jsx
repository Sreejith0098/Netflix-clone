
import { Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './Pages/Home/Home'
import Login from './Pages/Login/Login'
import Player from './Pages/Player/Player'
import { onAuthStateChanged } from 'firebase/auth'
import { useEffect } from 'react'
import { auth } from './firebase'
function App() {

  const navigate = useNavigate()
  useEffect(()=>{
        onAuthStateChanged(auth, async (user) => {
              if(user){
                console.log("Successfully logged in")
                navigate('/')
              }else{
                console.log("logged out")
                navigate('/login')
              }
        })
  },[])
  return (
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path="/player/:videoId" element={<Player />} />

    </Routes>
    
    </>
  )
}

export default App
