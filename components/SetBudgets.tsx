import { useState } from 'react'

interface Props {
  onSave: (budgets: Record<string, number>) => void
}

export default function SetBudgets({ onSave }: Props) {
  const [budgets, setBudgets] = useState<Record<string, number>>({
    Groceries: 0,
    Transport: 0,
    Entertainment: 0,
    Bills: 0,
    Other: 0,
  })

  const [saved, setSaved] = useState<boolean>(false)

  const handleChange = (category: string, value: string) => {
    setBudgets((prev) => ({
      ...prev,
      [category]: Number(value),
    }))
  }

  const handleSubmit = () => {
    onSave(budgets)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000) // Hide after 3 sec
  }

  return (
    <div className="bg-white p-4 rounded shadow-md w-full max-w-lg mb-6">
      <h2 className="text-xl font-semibold mb-4">🎯 Set Your Budgets</h2>

      {Object.entries(budgets).map(([category, value]) => (
        <div key={category} className="mb-3">
          <label className="block text-sm font-medium text-black mb-1">
            {category}
          </label>
          <input
            type="number"
            value={value}
            onChange={(e) => handleChange(category, e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Save Budgets
      </button>

      {saved && (
        <div className="mt-3 text-green-600 font-medium">
          ✅ Budget saved successfully!
        </div>
      )}
    </div>
  )
}
