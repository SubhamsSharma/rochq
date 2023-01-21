import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import parse from 'html-react-parser'
import { useLocation } from 'react-router-dom'
// import { useQueryClient } from '@tanstack/react-query'
import { useDispatchToFavoriteMails } from '../contexts/favoriteMailContext'
import { epochToDateTime } from '../utils/timeStampToDateTime'


async function fetchMailById(id){
  return await fetch(`https://flipkart-email-mock.now.sh/?id=${id}`).then(res => res.json())
}

function MailDetails() {
  // const queryClient = useQueryClient()
  const location = useLocation()
  const { id } = useParams()
  const  dispatchToFav  = useDispatchToFavoriteMails()
  const {name, subject, timeStamp} = location.state
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['mail',id],
    queryFn: () => fetchMailById(id),
    // initialData: () => {
    //   // Use a mail from the 'mails' query as the initial data for this mail query
      
    //   return queryClient.getQueryData(['mails'])?.list?.find((d) => d.id === id) ?? undefined
    // },
  })

  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }
  return (
    <div className='space-y-10 bg-backgroundColor max-h-full my-11 p-5 mx-auto ml-10'>
      {/* <div>mailbody header goes here</div> */}

      <div className='flex flex-row justify-between'>
        <div className='flex space-x-5'>
      <div className='bg-accent rounded-full w-12 h-12 flex justify-center items-center'>
          <p className='text-white font-medium'>{name.slice(0,1).toUpperCase()}</p>
        </div>
      <div>
        <p className='font-semibold text-left'>{subject}</p>
        <p>{epochToDateTime(timeStamp)}</p>
      </div>
      </div>
      <button 
      className='bg-accent py-1 px-3 rounded-lg text-white'
      onClick={() => {
        dispatchToFav({type:'addToFavorite' , id:id})

      }
      }>
        Mark as favorite
      </button>
      </div>
      

      {parse(data.body)}
      
      
    </div>
  )
}

export default MailDetails