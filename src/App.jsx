import { Routes, Route } from 'react-router-dom'
import './styles/App.css'
import Login from './component/login'
import Home from './component/home'
import PrivateRoute from './privateroute'

function App() {

  return (
    <div data-theme='light' className='h-auto'>
      <Routes>
        <Route element={<PrivateRoute />}>
          <Route path='/' element={<Home />} />
        </Route>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  )
}

export default App
