import { Link, useNavigate } from 'react-router-dom';
import { HomeImage } from '@components/index';
import { github, google, twitterLogo } from '@assets/index';
import { useEffect } from 'react';
import { isUserLoggedIn, signInWithGithub, signInWithGoogle } from '@services/index';
import { Button } from '@nextui-org/react';

const Login = () => {
  const navigate = useNavigate();

  const signInWithProvider = async (provider: 'google' | 'github') => {
    if (provider === 'google') {
        await signInWithGoogle();
    } else {
        await signInWithGithub();
    }
  }

  useEffect(() => {
    const checkUser = async () => {
      const result = await isUserLoggedIn();
      if (result) {
        navigate('/home');
      }
    };
  
    checkUser();
  }, [navigate]);
  
  return (
    <div className='flex flex-col md:flex-row h-screen w-screen'>
      {/* Hide image section on smaller screens */}
      <div className='hidden md:flex w-full md:w-1/2'>
        <HomeImage />
      </div>
      <div className='flex flex-col items-center justify-center w-full md:w-1/2 p-4 md:p-8'>
          <div className='w-full'>
            <img src={twitterLogo} alt="logo" className="w-12 md:w-16 ml-2 md:ml-10" />
          </div>
          <h1 className='text-black font-black text-4xl md:text-5xl mt-4 md:mt-5'>Happening Now</h1>
          <h2 className='text-black font-black text-xl md:text-2xl mt-2 md:mt-5 mb-3 md:mb-5'>Join Twitter today</h2>
          <Button radius="full" className="bg-transparent border flex items-center justify-center mb-2 md:mb-4 w-full md:w-[300px] h-[50px]" onClick={() => signInWithProvider("google")}>
            <img src={google} alt="logo" className="logo mr-2 w-4 h-4 md:w-5 md:h-5"/>
            Sign up with Google
          </Button>
          <Button radius="full" className="bg-transparent border flex items-center justify-center mb-2 md:mb-4 w-full md:w-[300px] h-[50px]" onClick={() => signInWithProvider("github")}>
            <img src={github} alt="logo" className="logo mr-2 w-4 h-4 md:w-5 md:h-5"/>
            Sign up with Github
          </Button>
          <div className="flex items-center justify-center pb-2 md:pb-4">
            <span className="text-gray-500">OR</span>
          </div>
          <Button radius="full" className="border flex items-center justify-center mb-2 w-full md:w-[300px] h-[50px] bg-[#1DA1F2] text-white">
            <Link to="/signup">Sign up with phone or email</Link>
          </Button>
          <p className='text-sm mb-6 md:mb-10 text-center'>
            By signing up, you agree to 
            the <a href='https://twitter.com/en/tos' className='text-[#1DA1F2]'>Terms of Service</a> and <a href='https://twitter.com/en/privacy' className='text-[#1DA1F2]'>Privacy Policy</a>, including <a href='https://help.twitter.com/en/rules-and-policies/x-cookies' className='text-[#1DA1F2]'> Cookie Use</a>.
          </p>
          <p className='text-[16px]'>
            Already have an account? <Link to="/signin" className='text-[#1DA1F2]'>Log In</Link>
          </p>
      </div>
    </div>
  );
};

export default Login;
