import React from 'react'
import Button from './Button'

function Header({onClick}) {
  
  return (
    <header className=' flex flex-row space-x-5 items-center'>
        <p className='font-medium text-lg'>Filter By :</p>     
        {["Unread", "Read", "Favorites"].map(item => (
          <Button key={item} variant={item} onClick={() => onClick(item.toLowerCase())}/>
        ))}
       </header>
  )
}

export default Header