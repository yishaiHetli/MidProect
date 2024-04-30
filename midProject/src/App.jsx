import { useState } from 'react'
import './App.css'
// import Users from './users'
import MainPage from './mainPage'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <MainPage />
    </div>
  )
}

export default App
