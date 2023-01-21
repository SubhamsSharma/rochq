import React from 'react'

function Header({onClick}) {
  
  return (
    <header className=' flex flex-row space-x-5'>
        <p>filter by:</p>
        <button onClick={() => onClick("unread")}>Unread</button>
        <button onClick={() => onClick("read")}>Read</button>
        <button onClick={() => onClick("favorites")}>Favorites</button>
       </header>
  )
}

export default Header