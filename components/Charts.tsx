import React, { useState } from 'react'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, ResponsiveContainer
} from 'recharts'

interface Expense {
  amount: number
  category: string
}

interface Props {
  expenses: Expense[]
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#ffb6b9', '#d0ed57']

export default function Charts({ expenses }: Props) {
  const [showBar, setShowBar] = useState(true)

  const categoryData = Object.entries(
    expenses.reduce<Record<string, number>>((acc, curr) => {
      acc[curr.category] = (acc[curr.category] || 0) + curr.amount
      return acc
    }, {})
  ).map(([category, amount]) => ({ category, amount }))

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4 space-x-4">
        <button
          className={`px-4 py-2 rounded ${showBar ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowBar(true)}
        >
          Bar Chart
        </button>
        <button
          className={`px-4 py-2 rounded ${!showBar ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
          onClick={() => setShowBar(false)}
        >
          Pie Chart
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {showBar ? (
          <>
            <h2 className="text-xl font-semibold mb-4">📊 Monthly Spending by Category</h2>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={categoryData}>
                <XAxis dataKey="category" angle={-15} textAnchor="end" interval={0} height={60} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="amount" fill="#8884d8" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </>
        ) : (
          <>
            <h2 className="text-xl font-semibold mb-4"> Spending Distribution</h2>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={categoryData}
                  dataKey="amount"
                  nameKey="category"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {categoryData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </>
        )}
      </div>
    </div>
  )
}
