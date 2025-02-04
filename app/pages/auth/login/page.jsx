'use client';
import React, { useState } from 'react';
import LoginInputFields from '../../../../components/authpageComp/logininputFields';
import Buttons from '../../../../components/authpageComp/loginButton';
import { useRouter } from 'next/navigation';
import AnimatedLoader from '../../../../components/loading';
import { ToastContainer , toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const {userdata ,setToken , setuserdata } = useAuth();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (error) setError('');
  };

  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   const { username, password } = formData;

  //   if (!username || !password) {
  //     setError('Please fill out both fields.');
  //     return;
  //   }

  //   setError('');
  //   setLoading(true); // Start loading

  //   try {
  //     console.log("URL");
  //     console.log(process.env.URL);
  //     const response = await fetch(``, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         username,
  //         password,
  //       }),
  //     });

  //     const data = await response.json();
  //     console.log('Response from server:', data);

  //     if (data != null) {
  //       console.log('Access token:', data.access);
  //       console.log('Refresh token:', data.refresh);

  //       // Send the access and refresh tokens to /pages/auth/cookie
  //       const cookieResponse = await fetch('/pages/auth/cookie', {
  //         method: 'POST',
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //         body: JSON.stringify({
  //           accessToken: data.access,
  //           refreshToken: data.refresh,
  //         }),
  //       });

  //       // Check if the cookie request was successful
  //       if (cookieResponse.ok) {
  //         console.log("Tokens saved successfully.");
  //         // Redirect to the dashboard
  //         router.push('/pages/dashDoc');
  //       } else {
  //         setError('Failed to save tokens. Please try again later.');
  //       }
  //     } else {
  //       setError('Invalid username or password.');
  //     }
  //   } catch (error) {
  //     console.error('Error:', error);
  //     setError('An error occurred. Please try again later.');
  //   } finally {
  //     setLoading(false); // Stop loading regardless of outcome
  //   }
  // };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;
    if (!username || !password) {
      setError('Please fill out both fields.');
      return;
    }
    setError('');
    setLoading(true); // Start loading

    await axios.post("https://dztabib.onrender.com/auth/jwt/create", 
     {
      username:username,
      password: password
      })
      .then(async (res) => {
        setLoading(false);
        console.log("response data ")
       setToken(res.data)
console.log(res.data)
        // await AsyncStorage.setItem("accessToken", res.data.accessToken);
        toast.success(res.message, {
          position: "top-right",
        })
        router.push('/pages/dashDoc')
      })
      .catch((error) => {
        setLoading(false);
        console.log("Error")
        console.log(error);
        toast.error(error.response.data.detail, {
          position: "top-right",
        })
      });

  };
  return (
    <div className="m-auto w-full flex flex-col justify-center items-center height-full">
      {loading ? (
        <div className="flex h-full w-full">
          <AnimatedLoader />
        </div>
      ) : (
        <>
          <div className="text-[40px] font-bold text-gray-800 mb-4">Login</div>
          <div className="text-[20px] text-gray-600 mb-8">Enter your credentials</div>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[80%] bg-white rounded-lg"
          >
            <LoginInputFields 
              formData={formData} 
              handleInputChange={handleInputChange}
            />

            {error && (
              <div className="text-red-500 text-sm p-2 bg-red-50 rounded-md">
                {error}
              </div>
            )}

            <Buttons />
          </form>

          <div className="text-[20px] text-center text-gray-600 mt-4">
            Dont have an account?{' '}
            <a href="/pages/auth/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </div>
        </>
      )}

<ToastContainer 
                 position="top-center"
                 autoClose={5000}
                 hideProgressBar
                 newestOnTop
                 closeOnClick
                 rtl={false}
                 pauseOnFocusLoss
                 draggable
                 pauseOnHover
          
          />
    </div>
  );
}
