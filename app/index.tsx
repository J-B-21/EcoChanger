import { Redirect } from 'expo-router';
import { useEffect, useState } from 'react';
import { getLoggedIn } from '../utils/auth';

export default function Index() {
  const [isReady, setIsReady] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    getLoggedIn().then(value => {
      setIsLoggedIn(value);
      setIsReady(true);
    });
  }, []);

  if (!isReady) return null; // wait until check is done

  return <Redirect href={isLoggedIn ? '/(tabs)/HomeScreen' : '/WelcomeScreen'} />;
}
// This component checks if the user is logged in and redirects them to the appropriate screen.
// If the user is logged in, they are redirected to the Home screen; otherwise, they are redirected to the Welcome screen.