import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { DangerIcon } from '../../components/ui/icons-svgs/SvgIcons';

export const IncorrectPath = () => {

  const params = useParams();
  const IncorrectPath = params['*'] || 'the requested';
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="flex pl-10 w-full justify-start">
        <img 
          className="star-fade-animation mt-6 h-10 w-10" 
          src="/assets/design/icons/Cross_Star_Teal-Blue.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
      </div>
      <div className='bg-white p-6 rounded-lg shadow-md text-center'>
        <div className='flex justify-center items-center gap-5 my-6'>
          <DangerIcon className='text-bittersweet/90 size-16'/>
          <h1 className="font-bold text-space_cadet text-center"> 404 Page Not Found</h1>
        </div>
        <p className="text-space_cadet/60 text-center font-medium mb-6">
          Sorry, the page you are looking for does not exist.
          <br/> 
          <strong className='text-majorelle'> ' { IncorrectPath } ' </strong> 
        </p>
        <Link 
          to="/" 
          
        >
          <button 
            className="
            px-6 py-2 font-semibold bg-majorelle text-white rounded-lg 
            hover:bg-robin_egg hover:scale-105 transition-all">
            Go to Home
          </button>
        </Link>
      </div>
      <div className="flex pr-8 w-full justify-end">
        <img 
          className="star-fade-animation flex align-start h-10 w-10" 
          src="/assets/design/icons/Cross_Star_Pink.webp" 
          aria-hidden="true" 
          alt="Cross Star Design Marker" />
      </div>
    </main>  )
}