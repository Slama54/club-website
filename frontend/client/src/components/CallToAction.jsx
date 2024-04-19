import { Button } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
            Want to know more about Petanque club Monastir?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these resources 
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href="https://www.facebook.com/profile.php?id=100078177176870&__cft__[0]=AZULQDKhok4QTX3JW24BnqF2eijqgEEZEO0gFqxHTK7zIRdMxmXf_vAALcO85loWj3MPNahLW2gNoPTxQG56s0Bhf8LSBkIqHPD_izLDRXbsGblgtzapMAKl8BzFdeXbSMXf3ZY4W0xH5MzHASXB2hBrX7VDL-A4NzbgTnOCnwGHtvLHTvZ6PtxG35CCJb8wZ2Fx1uN_rC2CjHwQAwhoWhC0&__tn__=-]K-R" target='_blank' rel='noopener noreferrer'>
                Petanque club
Monastir
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1">
            <img src="https://firebasestorage.googleapis.com/v0/b/mern-club.appspot.com/o/425545093_390033913612511_946974807517274325_n.jpg?alt=media&token=278d7214-a4d1-4bd2-b91d-f5083db2615a" />
        </div>
    </div>
  )
}