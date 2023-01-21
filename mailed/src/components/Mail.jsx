import React from 'react'
import { useFavoriteMails } from '../contexts/favoriteMailContext';

function epochToDateString(epoch){
let timestamp = epoch;
let date = new Date(timestamp * 1000);
let iso = date.toISOString().match(/(\d{4}\-\d{2}\-\d{2})T(\d{2}:\d{2}:\d{2})/)

return (iso[1] + ' ' + iso[2]);
}

function Mail(props) {
  const  favMails  = useFavoriteMails()

  const { from: {email, name}, date, subject, short_description, id} = props
  return (
    <div className='my-5 '>
        <div className='bg-backgroundColor flex flex-row space-x-5 p-5'>
            <div className='bg-accent rounded-full w-12 h-12 flex justify-center items-center'>
                <p className='text-white font-medium'>{name.slice(0,1).toUpperCase()}</p>
            </div>
            <div className='flex flex-col'>
                <div className='flex flex-col items-start'>
                  <p>From: <span className='font-medium'>{name} {`<${email}>`}</span></p>
                  <p>Subject: <span className='font-medium'>{subject}</span> </p>
                </div>

                <div className='my-1'>
                  <p>{`${short_description.slice(0,50)}...`}</p>
                </div>
                <div className='flex space-x-10'>
                  <p>{epochToDateString(date)}</p>
                  <p className='text-accent'>{favMails?.includes(id) ? 'favorite' : null}</p>
                </div>
                
                
                
            </div>
        </div>
    </div>
  )
}

export default Mail