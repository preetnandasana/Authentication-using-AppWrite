import React from "react";
import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { account } from "../Appwrite/config";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
    const [user,setUser] = useState({
        email:"",
        password:"",
    });

    const loginUser = async (e)=>
    {
        e.preventDefault();

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if(user.email.length<1)
        {
            toast.info("Email Is Required")
            return
        }

        if(!emailRegex.test(user.email))
        {
            toast.warn("Invalid Email")
            return
        }

        if(user.password.length<8)
        {
            toast.info("Password must be atleast is of 8 Characters.")
            return
        }
        

        try {
          await account.createEmailSession(user.email, user.password);
          navigate("/home")
        } catch (error) {
          if(error.code===401)
          {
            toast.error("Invalid Credentials");
          }
          else
          {
            toast.warn("Something Went Wrong Please Try Again Later.")
          }
        
        }
    }

  return (
    <div>
    <ToastContainer />
      <>
        <div className="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
          <div className="text-center font-bold text-2xl">Log in</div>
          <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
              <form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-1">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        setUser({
                          ...user,
                          email: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <div className="mt-1">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      onChange={(e) => {
                        setUser({
                          ...user,
                          password: e.target.value,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm">
                    <a
                      href="/signup"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Don't have Account, Sign Up
                    </a>
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={loginUser}
                  >
                    Log in
                  </button>
                </div>
              </form>

                      
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Login;
