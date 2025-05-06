// ExpenseHistory.tsx
import React from 'react'

interface Expense {
  amount: number
  category: string
  description?: string
}

interface Props {
  expenses: Expense[]
}

export default function ExpenseHistory({ expenses }: Props) {
  return (
    <div className="bg-white rounded-lg shadow p-6 max-w-2xl w-full">
      <h2 className="text-xl font-semibold mb-4">📜 Expense History</h2>
      {expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <ul className="space-y-3">
          {expenses.map((exp, index) => (
            <li
              key={index}
              className="bg-gray-100 p-3 rounded flex justify-between items-center"
            >
              <span>{exp.category} - ${exp.amount}</span>
              {exp.category === 'Other' && exp.description && (
                <span className="text-sm italic text-black">{exp.description}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
