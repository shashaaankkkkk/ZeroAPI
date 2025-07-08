import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/routes';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
<Router>
      <AppRoutes />
    </Router>
    </>
  )
}

export default App
