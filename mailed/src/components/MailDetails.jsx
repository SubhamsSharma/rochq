import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import parse from 'html-react-parser'
import { useDispatchToFavoriteMails } from '../contexts/favoriteMailContext'


async function fetchMailById(id){
  return await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`).then(res => res.json())
}

// function createMarkup() { 
//   return {__html: 'First &middot; Second'}; 
//   };


function MailDetails() {
  const { id } = useParams()
  const  dispatchToFav  = useDispatchToFavoriteMails()
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['mail',`${id}`],
    queryFn: () => fetchMailById(id),
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div className='space-y-2'>
      {/* <div>mailbody header goes here</div> */}
      <button 
      className='bg-accent p-1 rounded-lg text-white'
      onClick={() => {
        dispatchToFav({type:'addToFavorite' , id:id})

      }
      }>
        Mark as favorite
      </button>
      {parse(data.body)}
    </div>
  )
}

export default MailDetails