import {
  BoltIcon,
  ExclamationTriangleIcon,
  SunIcon,
} from '@heroicons/react/24/outline';

const Landing = () => {
  return (
    <div className='flex flex-col items-center justify-center h-screen px-2 text-white bg-gray-950 flex-grow'>
      <img
        src='public/chatGPT_logo.svg'
        alt='chatGPT logo'
        className='h-20 w-20 mb-3'
      />
      <h1 className='text-5xl font-bold mb-10 oxanium'>CustomGPT</h1>
      <div className='flex space-x-2 text-center'>
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <SunIcon className='h-8 w-8' />
            <h2>Examples</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>Placeholder</p>
            <p className='infoText'>Placeholder</p>
            <p className='infoText'>Placeholder</p>
          </div>
        </div>
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <BoltIcon className='h-8 w-8' />
            <h2>Capabilities</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>Placeholder</p>
            <p className='infoText'>Placeholder</p>
            <p className='infoText'>Placeholder</p>
          </div>
        </div>
        <div>
          <div className='flex flex-col items-center justify-center mb-5'>
            <ExclamationTriangleIcon className='h-8 w-8' />
            <h2>Limitations</h2>
          </div>

          <div className='space-y-2'>
            <p className='infoText'>Placeholder</p>
            <p className='infoText'>Placeholder</p>
            <p className='infoText'>Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
