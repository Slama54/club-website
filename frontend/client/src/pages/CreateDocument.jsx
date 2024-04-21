import { Alert, Button, FileInput, Select, TextInput, Toast, ToastToggle } from 'flowbite-react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { app } from '../firebase';
import { useState } from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { HiFire } from "react-icons/hi";

export default function CreateDocument() {
  const [file, setFile] = useState(null);
  const [filepdfUploadProgress, setFilepdfUploadProgress] = useState(null);
  const [filepdfUploadError, setFilepdfUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError ]= useState(null)

  const navigate = useNavigate();
  const handleUpdloadFilepdf = async () => {
    try {
      if (!file) {
        setFilepdfUploadError('Please select an filepdf');
        return;
      }
      setFilepdfUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + '-' + file.name;
      const storageRef = ref(storage,'documents/' + fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setFilepdfUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setFilepdfUploadError(' pdf upload failed');
          setFilepdfUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setFilepdfUploadProgress(null);
            setFilepdfUploadError(null);
            setFormData({ ...formData, filepdf: downloadURL });
          });
        }
      );
    } catch (error) {
      setFilepdfUploadError('Filepdf upload failed');
      setFilepdfUploadProgress(null);
      console.log(error);
    }
  };
  const handleSubmit = async(e)=>{
    e.preventDefault();
    try {
      const res = await fetch('/api/document/create',{
        method : 'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message)
        
        return
      }
      if (res.ok) {
        setPublishError(null)
        navigate(`/document/${data.slug}`);
        
      }
      
    } catch (error) {
      setPublishError('Something went wrong')
      
    }

  }
  return (
    <div className='p-3 max-w-3xl mx-auto min-h-screen'>
      <h1 className='text-center text-3xl my-7 font-semibold'>Add a document</h1>
      <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            type='text'
            placeholder='Title'
            required
            id='title'
            className='flex-1'
            onChange={(e)=>
             setFormData({...formData, title: e.target.value})}
          />
          <Select 
            onChange={(e)=>
             setFormData({...formData , category: e.target.value})}>
            <option value='private'> Private</option>
            <option value='public'> Public</option>
            
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3'>
          <FileInput
            type='file'
            accept='application/pdf'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='purpleToBlue'
            size='sm'
            outline
            onClick={handleUpdloadFilepdf}
            disabled={filepdfUploadProgress}
          >
            {filepdfUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={filepdfUploadProgress}
                  text={`${filepdfUploadProgress || 0}%`}
                />
              </div>
            ) : (
              'Upload File pdf'
            )}
          </Button>
        </div>
        {filepdfUploadError && <Alert color='failure'>{filepdfUploadError}</Alert>}
        {formData.filepdf && (
         
            <Toast>
            <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200">
                <HiFire className="h-5 w-5" />
            </div>
            <div className="ml-3 text-sm font-normal">file added successfully </div>
            <ToastToggle />
            </Toast>
        )
        }
        <ReactQuill
          theme='snow'
          placeholder='Write something...'
          className='h-72 mb-12'
          required
          onChange={(value)=>{
            setFormData({...formData, content: value})
          }}
        />
        <Button type='submit' gradientDuoTone='purpleToPink'>
          Publish
        </Button>
        {publishError && <Alert className='mt-5' color='failure'>{publishError}</Alert>}
      </form>
    </div>
  );
}