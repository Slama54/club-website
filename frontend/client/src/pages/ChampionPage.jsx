import { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';
import CallToAction from '../components/CallToAction';
import ChampionsTable from '../components/ChampionsTable';


export default function ChampionPage() {
    const {championSlug} = useParams()
    const  [loading, setLoading]=useState(true)
    const [error, setError]=useState(false)
    const [champion, setChampion]=useState(null)
   

    useEffect(()=>{
        const fetchChampion = async ()=>{
            try {
                setLoading(true)
                const res = await fetch(`/api/champion/getchampions?slug=${championSlug}`)
                const data = await res.json()
                if (!res.ok) {
                    setError(true)
                    setLoading(false)
                    return;
                }
                if (res.ok) {
                    setChampion(data.champions[0])
                    setLoading(false)
                    setError(false)
                }
                
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
    fetchChampion()
    },[championSlug])

   

    if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
    return <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{champion && champion.title}</h1>
    <div className="flex flex-col items-center pb-10">
    <img src={champion && champion.image} alt={champion && champion.title}
            className='rounded-full w-40 h-full 
            object-cover border-8 border-[lightgray]   '/>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white p-3">{champion && champion.ChampionName}</h5>
        
        <Link to={`/search?category=${champion && champion.category}`} className='self-center '>
    <span className="text-sm text-gray-500 dark:text-gray-400">{champion && champion.category}</span>
    </Link>
    </div>
   

    <div className="flex justify-end p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{champion && new Date(champion.ChampionDate).toLocaleDateString()}</span>
        
    </div>
    <div className='p-3 max-w-2xl mx-auto w-full champion-content' dangerouslySetInnerHTML={{__html: champion && champion.content}}>

    </div>
   
        <CallToAction />
        <ChampionsTable/>
    

    

   
  </main>;
}