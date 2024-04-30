import {  useState } from "react"
import {useSelector} from 'react-redux'
import {  Table } from 'flowbite-react';
import { Link } from "react-router-dom";


export default function ChampionsTable() {
  const {currentUser}= useSelector((state)=>state.user)
  const [userChampions, setUserChampions]= useState([])
  const [showMore, setShowMore] = useState(true);
  
 
  
    const fetchChampions = async     ()=>{
    

      try {
        const res = await fetch(`/api/champion/getchampions?limit=3`)
        const data = await res.json()
        if (res.ok) {
          setUserChampions(data.champions)
          if (data.champions.length < 9) {
            setShowMore(false);
          }
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  
      fetchChampions();
    

  

  const handleShowMore = async () => {
    const startIndex = userChampions.length;
    try {
      const res = await fetch(
        `/api/champion/getchampions?startIndex=${startIndex}`
      );
      const data = await res.json();
      if (res.ok) {
        setUserChampions((prev) => [...prev, ...data.champions]);
        if (data.champions.length < 9) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
 

  return (
    <div className='table-auto w-full overflow-x-scroll scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 md:mx-auto p-3 '>
    {currentUser.isAdmin && userChampions.length > 0 ? (
      <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Champion Date</Table.HeadCell>
            <Table.HeadCell>Champion image</Table.HeadCell>
            <Table.HeadCell>Champion title</Table.HeadCell>
            <Table.HeadCell>Champion name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            
            
          </Table.Head>
          {userChampions.map((champion) => (
            <Table.Body className='divide-y'key={champion._id}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {new Date(champion.ChampionDate).toLocaleDateString()}
                </Table.Cell>
                <Table.Cell>
                  <Link to={`/champion/${champion.slug}`}>
                    <img
                      src={champion.image}
                      alt={champion.title}
                      className='w-10 h-10 object-cover bg-gray-500
                      rounded-full'
                    />
                  </Link>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className='font-medium text-gray-900 dark:text-white'
                    to={`/champion/${champion.slug}`}
                  >
                    {champion.title}
                  </Link>
                </Table.Cell>
                <Table.Cell>{champion.ChampionName}</Table.Cell>
                <Table.Cell>{champion.category}</Table.Cell>
               
               
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
        {showMore && (
            <button
              onClick={handleShowMore}
              className='w-full text-teal-500 self-center text-sm py-7'
            >
              Show more
            </button>
          )}
      </>
    ) : (
      <p>You have no champions yet!</p>
    )}


  </div>
  )
}
