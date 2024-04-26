import { useEffect, useState } from "react"
import {useSelector} from 'react-redux'
import { Button, Modal, Table } from 'flowbite-react';
import { Link } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";

export default function DashChampions() {
  const {currentUser}= useSelector((state)=>state.user)
  const [userChampions, setUserChampions]= useState([])
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal]=useState(false)
  const [championIdToDelete,setChampionIdToDelete]=useState('')
 
  useEffect(()=>{
    const fetchChampions = async     ()=>{
    

      try {
        const res = await fetch(`/api/champion/getchampions?userId=${currentUser._id}`)
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
    if (currentUser.isAdmin) {
      fetchChampions();
    }

  },[currentUser._id]);

  const handleShowMore = async () => {
    const startIndex = userChampions.length;
    try {
      const res = await fetch(
        `/api/champion/getchampions?userId=${currentUser._id}&startIndex=${startIndex}`
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
  const handleDeleteChampion = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/champion/deletechampion/${championIdToDelete}/${currentUser._id}`,
        {
          method: 'DELETE',
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setUserChampions((prev) =>
          prev.filter((champion) => champion._id !== championIdToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
    {currentUser.isAdmin && userChampions.length > 0 ? (
      <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Champion Date</Table.HeadCell>
            <Table.HeadCell>Champion image</Table.HeadCell>
            <Table.HeadCell>Champion title</Table.HeadCell>
            <Table.HeadCell>Champion name</Table.HeadCell>
            <Table.HeadCell>Category</Table.HeadCell>
            <Table.HeadCell >Delete</Table.HeadCell>
            <Table.HeadCell>
              <span>Edit</span>
            </Table.HeadCell>
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
                <Table.Cell>
                  <span onClick={()=>{
                    setShowModal(true)
                    setChampionIdToDelete(champion._id)
                  }} className='font-medium text-red-500 hover:underline cursor-pointer'>
                    Delete
                  </span>
                </Table.Cell>
                <Table.Cell>
                  <Link
                    className='text-teal-500 hover:underline'
                    to={`/update-champion/${champion._id}`}
                  >
                    <span>Edit</span>
                  </Link>
                </Table.Cell>
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

<Modal show={showModal}
       onClick={()=>setShowModal(false)}
       popup
       size='md'
       >
        <Modal.Header/>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle 
            className='h-14 w-14 text-gray-400 
             dark:text-gray-200  mb-4 mx-auto'/>
             <h3 className='mb-5 text-lg text-gray-500 
             dark:text-gray-400'
             >Are you sure you want to delete this champion ?</h3>
             <div className='flex justify-center gap-4'>
                <Button color='failure' 
                  onClick={handleDeleteChampion}>
                    Yes, I'm sure
                </Button>
                <Button  color='gray' 
                onClick={()=>setShowModal(false)}>
                  No, cancel
                </Button>
             </div>
          </div>
        </Modal.Body>

       </Modal>
  </div>
  )
}
