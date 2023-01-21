import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Mail from './components/Mail'
import MailDetails from './components/MailDetails'
import MailList from './components/MailList'


function App() {

  const [filterBy, setFilterBy] = useState('all')
  
  return (
    <div className="flex flex-row m-0 ">
      <div className='min-w-max'>
        <Header onClick={setFilterBy}/>
       <MailList filterBy={filterBy}/>
      </div>
      <div className='bg-backgroundColor p-5 m-5 w-auto '>
        <Outlet />
      </div>
       
       
    </div>
  )
}

export default App
