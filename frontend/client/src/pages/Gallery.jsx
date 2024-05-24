
import { useEffect, useState } from 'react';
import GalleryCard from '../components/GalleryCard';

export default function Gallery() {
  const [gallerys, setGallerys] = useState([]);

  useEffect(() => {
    const fetchGallerys = async () => {
      const res = await fetch('/api/gallery/getGallerys');
      const data = await res.json();
      setGallerys(data.gallerys);
    };
    fetchGallerys();
  }, []);
  return (
    <div>
     
      

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7'>
        {gallerys && gallerys.length > 0 && (
          <div className='flex flex-col gap-6'>
            <h2 className='text-2xl font-semibold text-center'>Recent Gallerys</h2>
            <div className='p-7 flex flex-wrap gap-4'>
              {gallerys.map((gallery) => (
                <GalleryCard key={gallery._id} gallery={gallery} />
              ))}
            </div>
           
          </div>
        )}
      </div>
    </div>
  );
}