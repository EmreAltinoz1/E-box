"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { loginUser } from '../store/userSlice'

export default function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      console.log("Login attempt with:", data); // Login denemesi verilerini göster
      const resultAction = await dispatch(loginUser({ 
        email: data.email, 
        password: data.password 
      })).unwrap()

      console.log("Login success - Token:", resultAction.token); // Token'ı göster

      // Token'ı localStorage'a kaydet (remember me seçiliyse)
      if (data.rememberMe) {
        localStorage.setItem('token', resultAction.token)
      }

      // Toast mesajını göster ve bekle
      await toast.success("Successfully logged in!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      // Kısa bir gecikme ekleyelim ki toast görünsün
      setTimeout(() => {
        navigate(-1) // Önceki sayfaya dön
      }, 2000)

    } catch (error) {
      toast.error(error.message || "Login failed. Please try again.", {
        position: "top-right",
        autoClose: 3000,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-1">Email</label>
              <input
                type="email"
                {...register("email", {
                  required: true,
                  pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                })}
                className="w-full p-2 border rounded"
              />
              {errors.email && <span className="text-red-500">Please enter a valid email</span>}
            </div>

            <div>
              <label className="block mb-1">Password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full p-2 border rounded"
              />
              {errors.password && <span className="text-red-500">Password is required</span>}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                {...register("rememberMe")}
                className="h-4 w-4 text-blue-600 rounded border-gray-300"
              />
              <label className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
} 