import React from 'react'
import { useFavoriteMails } from '../contexts/favoriteMailContext';
import { epochToDateTime } from '../utils/timeStampToDateTime';
import { useReadMails } from '../contexts/readMailContext';

function Mail(props) {
  const  favMails  = useFavoriteMails()
  const readMails = useReadMails()

  const { from: {email, name}, date, subject, short_description, id} = props
  const readClasses = readMails.includes(id) ? 'border-accent border-2 bg-readBg' : null
  return (
    <div className='my-5' >
        <div className={`bg-backgroundColor flex flex-row space-x-5 p-5 rounded-lg ${readClasses}`}>
            <div className='bg-accent rounded-full w-12 h-12 flex justify-center items-center'>
                <p className='text-white font-medium'>{name.slice(0,1).toUpperCase()}</p>
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-col items-start'>
                  <p>From: <span className='font-medium'>{name} {`<${email}>`}</span></p>
                  <p>Subject: <span className='font-medium'>{subject}</span> </p>
                </div>

                <div className='my-1 w-96 text-left'>
                  <p className='truncate'>{short_description}</p>
                </div>
                <div className='flex space-x-10'>
                  <p>{epochToDateTime(date)}</p>
                  <p className='text-accent'>{favMails?.includes(id) ? 'Favorite' : null}</p>
                </div>
              
            </div>
        </div>
    </div>
  )
}

export default Mail