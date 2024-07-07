import { useState } from 'react'
import './App.css'
import PageRoutes from './PageRoutes.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Analytics } from "@vercel/analytics/react"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <PageRoutes />
          <Analytics/>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
