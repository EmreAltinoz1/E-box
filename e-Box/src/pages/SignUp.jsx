"use client"

import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { axiosInstance } from "../components/Axios"
import { useNavigate } from "react-router-dom"

export default function SignupForm() {
  const navigate = useNavigate()
  const [roles, setRoles] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()

  const selectedRole = watch("role_id")
  const isStoreRole = roles.find((role) => role.id === Number(selectedRole))?.code === "store"

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axiosInstance.get("/roles")
        setRoles(response.data)

        // Set default role to customer
        const customerRole = response.data.find((role) => role.code === "customer")
        if (customerRole) {
          register("role_id", { value: customerRole.id })
        }
      } catch (error) {
        toast.error("Failed to fetch roles")
      }
    }

    fetchRoles()
  }, [register])

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      const formData = {
        name: data.name,
        email: data.email,
        password: data.password,
        role_id: Number(data.role_id),
        ...(isStoreRole && {
          store: {
            name: data.store?.name,
            phone: data.store?.phone,
            tax_no: data.store?.tax_no,
            bank_account: data.store?.bank_account,
          },
        }),
      }

      await axiosInstance.post("/signup", formData)
      toast.success("You need to click link in email to activate your account!")
      navigate(-1) // Önceki sayfaya dön
    } catch (error) {
      toast.error("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="block mb-1">Name</label>
              <input
                type="text"
                {...register("name", { required: true, minLength: 3 })}
                className="w-full p-2 border rounded"
              />
              {errors.name && <span className="text-red-500">Name must be at least 3 characters</span>}
            </div>

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
                {...register("password", {
                  required: true,
                  minLength: 8,
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                })}
                className="w-full p-2 border rounded"
              />
              {errors.password && (
                <span className="text-red-500">
                  Password must be at least 8 characters and include numbers, lowercase, uppercase, and special characters
                </span>
              )}
            </div>

            <div>
              <label className="block mb-1">Confirm Password</label>
              <input
                type="password"
                {...register("confirmPassword", {
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                className="w-full p-2 border rounded"
              />
              {errors.confirmPassword && <span className="text-red-500">Passwords do not match</span>}
            </div>

            <div>
              <label className="block mb-1">Role</label>
              <select {...register("role_id", { required: true })} className="w-full p-2 border rounded">
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name === "Yönetici"
                      ? "Admin"
                      : role.name === "Mağaza"
                        ? "Store"
                        : role.name === "Müşteri"
                          ? "Customer"
                          : role.name}
                  </option>
                ))}
              </select>
            </div>

            {isStoreRole && (
              <div className="space-y-4">
                <div>
                  <label className="block mb-1">Store Name</label>
                  <input
                    type="text"
                    {...register("store.name", { required: true, minLength: 3 })}
                    className="w-full p-2 border rounded"
                  />
                  {errors.store?.name && <span className="text-red-500">Store name must be at least 3 characters</span>}
                </div>

                <div>
                  <label className="block mb-1">Store Phone</label>
                  <input
                    type="tel"
                    {...register("store.phone", {
                      required: true,
                      pattern: /^(\+90|0)?[0-9]{10}$/,
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="+90XXXXXXXXXX"
                  />
                  {errors.store?.phone && <span className="text-red-500">Please enter a valid Turkish phone number</span>}
                </div>

                <div>
                  <label className="block mb-1">Store Tax ID</label>
                  <input
                    type="text"
                    {...register("store.tax_no", {
                      required: true,
                      pattern: /^T[0-9]{4}V[0-9]{6}$/,
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="TXXXXVXXXXXX"
                  />
                  {errors.store?.tax_no && (
                    <span className="text-red-500">Please enter a valid Tax ID (TXXXXVXXXXXX format)</span>
                  )}
                </div>

                <div>
                  <label className="block mb-1">Store Bank Account (IBAN)</label>
                  <input
                    type="text"
                    {...register("store.bank_account", {
                      required: true,
                      pattern: /^TR[0-9]{24}$/,
                    })}
                    className="w-full p-2 border rounded"
                    placeholder="TR..."
                  />
                  {errors.store?.bank_account && <span className="text-red-500">Please enter a valid IBAN</span>}
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-blue-300"
            >
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
      <ToastContainer position="top-right" />
    </div>
  )
}

