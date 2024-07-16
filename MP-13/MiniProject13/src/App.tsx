import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp, Login, SignIn, HomePage, ProfilePage, Explore, Notifications, Bookmarks, Settings, Twivia } from '@pages/index';
import { EditProfile, TweetDetails} from '@components/index';
import { AppLayout } from '@layouts/index';
import "./styles/tailwind.css";
import { useEffect, useRef, useState  } from 'react';
import { supabase } from '@config/index';
import { addUserToDatabase, signOut, getTheme } from '@services/index';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import toast, { Toaster } from 'react-hot-toast';

const App = () => {
  const isMountedRef = useRef(true); // Flag to track component mount status
  const isEffectExecutedRef = useRef(false); // Flag to track whether useEffect has been executed
  const [auth_state, setAuthState] = useState<AuthChangeEvent>('SIGNED_OUT');
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const handleAuthStateChange = async(event: AuthChangeEvent, session: Session | null) => {
      if (event === 'SIGNED_IN' && session) {
        if(isEffectExecutedRef.current === true)return;
        isEffectExecutedRef.current = true;
        setAuthState(event);
      }
      else if(event === 'SIGNED_OUT') {
        if(isEffectExecutedRef.current === false)return;
        isEffectExecutedRef.current = false;
        setAuthState(event);
      }
    }

    supabase.auth.onAuthStateChange(handleAuthStateChange);

    return () => {
      isMountedRef.current = false;
      isEffectExecutedRef.current = false;
    };
  }, [isMountedRef])

  useEffect(() => {
    const checkUserAuthState = async () => {
      if(auth_state === 'SIGNED_IN') {
        const res = await addUserToDatabase();
        if(res === "failed to insert into database" || res === "not logged in") {
          toast.error('Failed to sign in!', { duration: 2000, position: 'top-center',});
          await signOut();
        }
        else{
          toast.success('Signed in successfully!', { duration: 2000, position: 'top-center',});
        }
      }
    }
    const checkTheme = async () => {
      const theme = await getTheme();
      setIsDarkTheme(theme.Darkmode);
      console.log(theme);
    }
    
    // Call the async function
    checkTheme();
    checkUserAuthState();
  }, [auth_state])

  return (
    <main className={`w-full h-full ${isDarkTheme ? 'dark bg-black' : ''}`}>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/editProfile" element={<EditProfile />} />

        <Route path="/*" element={
          <AppLayout>
          <Routes>
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/profile/:username" element={<ProfilePage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/explore/:searchVal" element={<Explore />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/bookmarks" element={<Bookmarks />} />
            <Route path="/tweet/:tweetId" element={<TweetDetails />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/twivia" element={<Twivia />} />
          </Routes>
        </AppLayout>}>
        </Route>
      </Routes>
    </Router>
    <Toaster />
    </main>
  );
};

export default App;
