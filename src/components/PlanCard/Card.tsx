"use client";
import React, { useEffect, useState } from 'react'

interface Plan {
  id: number;
  name: string;
  price: string;
}

const Card = () => {
    const [plans, setPlans] = useState<Plan[]>([])
    const [isLoading, setIsLoading] = useState(false)
    const apiUri = process.env.NEXT_PUBLIC_API_URL;


    const fetchPlans = async () => {
        setIsLoading(true)
        try {
            const response = await fetch(`${apiUri}/plan`)
            const data: Plan[] = await response.json()
            setPlans(data)
        } catch (error) {
            console.error("Error fetching plans:", error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchPlans()
    }, [])

    return (
        <div className="flex flex-wrap justify-center gap-6 p-6 bg-black">
          {plans.map((plan) => (
            <div key={plan.id} className="relative w-72 bg-gradient-to-br from-red-500 to-orange-600 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-50 transition-opacity duration-300"></div>
              <div className="relative h-full flex flex-col justify-between p-6">
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center mb-4">
                    <span className="text-3xl font-bold text-orange-600">{plan.id}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-white text-center mb-2">{plan.name}</h3>
                  <p className="text-xl text-yellow-300 text-center font-semibold">${plan.price}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )
}

export default Card