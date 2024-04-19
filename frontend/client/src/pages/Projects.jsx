import CallToAction from '../components/CallToAction';

export default function Projects() {
  return (
    <div className='min-h-screen max-w-2xl mx-auto flex justify-center items-center flex-col gap-6 p-3'>
      <h1 className='text-3xl font-semibold'>Pojects</h1>
      <p className='text-md text-center text-gray-500'>La pétanque est un sport à part entière où la maitrise de soi, la concentration, la tactique et l'adresse sont très importantes mais qui permet, surtout, de côtoyer des personnes de culture et de milieux sociaux différents. Et, comme tout sport, elle permet de vivre des moments intenses, riches et surtout empreints d'amitié et de convivialité, des moments que seul le sport est en mesure de nous apporter. </p>
      <CallToAction />
    </div>
  )
}