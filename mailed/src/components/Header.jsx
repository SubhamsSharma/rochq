import React from 'react'
import Button from './Button'

function Header({onClick}) {
  
  return (
    <header className=' flex flex-row space-x-5'>
        <p className='font-medium'>filter by:</p>     
        {["Unread", "Read", "Favorites"].map(item => (
          <Button key={item} variant={item} onClick={() => onClick(item.toLowerCase())}/>
        ))}
       </header>
  )
}

export default Header