import { useEffect, useState } from 'react'
import {Link,useParams} from 'react-router-dom'
import { Button, Spinner } from 'flowbite-react';
import CallToAction from '../components/CallToAction';
import DocumentCard from '../components/DocumentCard';



export default function DocumentPage() {
    const {documentSlug} = useParams()
    const  [loading, setLoading]=useState(true)
    const [error, setError]=useState(false)
    const [pdf, setPdf]=useState(null)
    const [recentDocuments, setRecentDocuments]=useState(null)
 
    useEffect(()=>{
        const fetchDocument = async ()=>{
            try {
                setLoading(true)
                const res = await fetch(`/api/document/getdocuments?slug=${documentSlug}`)
                const data = await res.json()
                if (!res.ok) {
                    setError(true)
                    setLoading(false)
                    return;
                }
                if (res.ok) {
                    setPdf(data.documents[0])
                    setLoading(false)
                    setError(false)
                    
                }
                
            } catch (error) {
                setError(true)
                setLoading(false)
            }
        }
    fetchDocument()
    },[documentSlug])

    useEffect(()=>{
        try {
            const fetchRecentDocuments = async ()=>{
                const res = await fetch(`/api/document/getdocuments?limit=3`)
                const data = await res.json()
                if (res.ok) {
                    setRecentDocuments(data.documents)
                }
            }
            fetchRecentDocuments()
        } catch (error) {
            console.log(error.message);
        }
    },[])
   
    
    
     
    if (loading)
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <Spinner size='xl' />
      </div>
    );
    return <main className='p-3 flex flex-col max-w-6xl mx-auto min-h-screen'>
    <h1 className='text-3xl mt-10 p-3 text-center font-serif max-w-2xl mx-auto lg:text-4xl'>{pdf && pdf.title}</h1>
    <Link to={`/search?category=${pdf && pdf.category}`} className='self-center mt-5'>
    <Button color='gray' pill size='xs'>{pdf && pdf.category}</Button>
    
    </Link>
    <iframe src={pdf.filepdf} className='p-4 mx-2' width="100%" height="500px" />
  
 
    <div className="flex justify-between p-3 border-b border-slate-500 mx-auto w-full max-w-2xl text-xs">
        <span>{pdf && new Date(pdf.createdAt).toLocaleDateString()}</span>
        <span className='italic'>{pdf && (pdf.content.length /1000).toFixed(0)} mins read</span>
       

    </div>
    <div className='p-3 max-w-2xl mx-auto w-full pdf-content' dangerouslySetInnerHTML={{__html: pdf && pdf.content}}>
    
    </div>
    <div className='max-w-4xl mx-auto w-full'>
        <CallToAction/>
    </div>
    
    <div className='flex flex-col justify-center items-center mb-5'>
        <h1 className='text-xl mt-5'>Recent articles</h1>
        <div className='flex flex-wrap gap-5 mt-5 justify-center'>
          {recentDocuments &&
            recentDocuments.map((pdf) => <DocumentCard key={pdf._id} pdf={pdf} />)}
        </div>
        
      </div>
     
      
  </main>;
}