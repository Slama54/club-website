import { Link } from 'react-router-dom';

export default function DocumentCard({ pdf }) {
  
  return (
    <div className='group  w-full border border-teal-500 hover:border-2 h-[200px] overflow-hidden rounded-lg sm:w-[430px] transition-all'>
      <Link to={`/document/${pdf.slug}`}>
        
      </Link>
      <div className='p-3 flex flex-col gap-2'>
        <p className='text-lg font-semibold line-clamp-2'>{pdf.title}</p>
        
        <span className='italic text-sm'>{pdf.category}</span>
        <div className='p-1 max-w-2xl mx-auto w-full document-content' dangerouslySetInnerHTML={{__html: pdf && pdf.content}}>
        </div>
        <span className='italic text-sm'>{pdf && new Date(pdf.createdAt).toLocaleDateString()}</span>
        <a
          href={pdf.filepdf} target='_blank' rel='noopener noreferrer'
          className='z-10  bottom-[-200px] 
          left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 
          hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
        >
          Read document
        </a>
        
      </div>
    </div>
  );
}