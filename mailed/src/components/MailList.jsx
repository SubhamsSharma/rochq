import React from 'react'
import { NavLink } from 'react-router-dom'
import Mail from './Mail'
import { useDispatchToReadMails } from '../contexts/readMailContext'

function MailList({listData }) {

  const dispatchToRead = useDispatchToReadMails()
      return (
        <div>

         {listData.map(mail => (
          // removed state data from Link component
        <NavLink 
          key={mail.id} 
          to={mail.id}
          className={({ isActive }) => isActive? 'border-left-4 border-green-500 border-solid' : null}>
          <div onClick={() => dispatchToRead({type:'addToRead', id:mail.id})}>
            <Mail {...mail}/>
          </div>
          
        </NavLink>))}
        </div>
        
        )       
}
  
export default MailList