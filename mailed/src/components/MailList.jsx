import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import Mail from './Mail'
import Header from './Header'
import { useFavoriteMails } from '../contexts/favoriteMailContext'
import { useReadMails } from '../contexts/readMailContext'
import { useDispatchToReadMails } from '../contexts/readMailContext'


function MailList({filterBy}) {
 
  const { isLoading, isError, data, error } = useQuery({
        queryKey: ['mails'],
        queryFn: fetchMails,
      })

      let favMails = useFavoriteMails()
      let readMailList = useReadMails()
      const dispatchToRead = useDispatchToReadMails()
    
    // filter data here
    let filteredList = data?.list
    const favoriteMails = data?.list.filter(mail => favMails?.includes(mail.id))
    const unReadMails = data?.list.filter(mail => !(readMailList?.includes(mail.id)))
    const readMails = data?.list.filter(mail => readMailList?.includes(mail.id))

    if(filterBy === 'favorites'){
      filteredList = favoriteMails
    }

    if(filterBy === 'read'){
      filteredList = readMails
    }

    if(filterBy === 'unread'){
      filteredList = unReadMails
    }

    
      if (isLoading) {
        return <span>Loading...</span>
      }
    
      if (isError) {
        return <span>Error: {error.message}</span>
      }
     
      return (
        <>
          
         {filteredList.map(mail => (
        <Link key={mail.id} to={mail.id} state={{name:mail.from.name, subject:mail.subject, timeStamp:mail.date}}>
          <div onClick={() => dispatchToRead({type:'addToRead', id:mail.id})}>
            <Mail {...mail}/>
          </div>
          
        </Link>))}
        </>
        
        )
        
      
        
}

async function fetchMails(){
    return await fetch("https://flipkart-email-mock.now.sh/?page=1").then(res => res.json())  
}
  
export default MailList