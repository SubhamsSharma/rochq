import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import parse from 'html-react-parser'
import { useOutletContext } from 'react-router-dom'
import { useDispatchToFavoriteMails } from '../contexts/favoriteMailContext'
import { epochToDateTime } from '../utils/timeStampToDateTime'

async function fetchMailById(id){
    return await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`).then(res => res.json()) 
}

function MailDetails() {
  const { id } = useParams()
  const  dispatchToFav  = useDispatchToFavoriteMails()
  // use OutLetContext to recieve date passed via context 
  const prevList = useOutletContext()
  const prevData = prevList.find(item => item.id === id)
  const {from:{name}, subject, date:timeStamp} = prevData
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['mail',id],
    queryFn: () => fetchMailById(id),
  })

  if (isLoading) {
    return <span className=' m-32'>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div className='space-y-10 bg-backgroundColor max-h-full my-14 p-5 mx-auto ml-10'>
      {/* <div>mailbody header goes here</div> */}

      <div className='flex flex-row justify-between'>
        <div className='flex space-x-5'>
      <div className='bg-accent rounded-full w-12 h-12 flex justify-center items-center'>
          <p className='text-white font-medium'>{name.slice(0,1).toUpperCase()}</p>
        </div>
      <div>
        <p className='font-semibold text-left'>{subject}</p>
        <p className='mt-2'>{epochToDateTime(timeStamp)}</p>
      </div>
      </div>
      <button 
      className='bg-accent py-0.5 px-2 rounded-2xl text-white'
      onClick={() => {
        dispatchToFav({type:'addToFavorite' , id:id})
      }
      }>
        Mark as favorite
      </button>
      </div>
      
      <div className='text-left pl-16 pr-5'>{parse(data.body)}</div>
      
    </div>
  )
}

export default MailDetails