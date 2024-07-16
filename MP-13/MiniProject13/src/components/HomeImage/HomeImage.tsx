
import { twitter } from '@assets/index';

const HomeImage = () => {
  return (
    <div className='w-full h-full'>
        <img src={twitter} alt="Twitter home/splash page" className='w-full h-full object-cover' />
    </div>
  );
};

export default HomeImage;