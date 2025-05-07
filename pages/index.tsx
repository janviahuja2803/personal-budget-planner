import { useEffect, useState } from 'react';
import Head from 'next/head';
import Login from '../components/Login';
import Signup from '../components/Signup';
import PersonalBudgetPlanner from '../components/PersonalBudgetPlanner';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true); // Toggle login/signup

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('userEmail');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <>
      <Head>
        <title>Personal Budget Planner</title>
      </Head>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-200 to-blue-200 p-6">
        {isLoggedIn ? (
          <>
            <PersonalBudgetPlanner />
            <button
              onClick={handleLogout}
              className="mt-6 px-5 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            {isLogin ? (
              <Login onLoginSuccess={handleLoginSuccess} />
            ) : (
              <Signup onSignupSuccess={handleLoginSuccess} />
            )}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="mt-4 text-sm text-blue-700 underline"
            >
              {isLogin
                ? "Don't have an account? Sign up"
                : 'Already have an account? Log in'}
            </button>
          </>
        )}
      </main>
    </>
  );
}
//trigger redeployment