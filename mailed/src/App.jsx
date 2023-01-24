import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import './App.css'
import Header from './components/Header'
import MailList from './components/MailList'
import { useFavoriteMails } from './contexts/favoriteMailContext'
import { useReadMails } from './contexts/readMailContext'



function App() {

  const [filterBy, setFilterBy] = useState('all')

  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['mails'],
    queryFn: fetchMails,
  })

  let favMails = useFavoriteMails()
  let readMailList = useReadMails()
  



  if (isLoading) {
    return <span>Loading...</span>
  }

  if (isError) {
    return <span>Error: {error.message}</span>
  }

  //  filter data here if not loading or error

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
//  removed text color
  return (
    <div className="flex flex-row text-textColor bg-transparent">
      <div className='min-w-max flex-grow'>
        <Header onClick={setFilterBy}/>
       <MailList filterBy={filterBy} listData={filteredList}/>
      </div>
      {/* <div className='bg-orange-400 p-5 m-5 w-auto max-h-min'> */}
      {/* pass data to outlet via context so nested link doesn't get broken if accessed directly */}
        <Outlet context={data.list}/>
      {/* </div> */}
           
    </div>
  )
  }

async function fetchMails(){
  return await fetch("https://flipkart-email-mock.now.sh/?page=1").then(res => res.json())  
  }

export default App
