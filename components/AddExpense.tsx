import { useState } from 'react'

interface Expense {
  amount: number
  category: string
  description?: string
}

interface AddExpenseProps {
  onAdd: (expense: Expense) => void
}

export default function AddExpense({ onAdd }: AddExpenseProps) {
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !category) return

    const newExpense: Expense = {
      amount: parseFloat(amount),
      category,
      ...(category === 'Other' && { description }),
    }

    onAdd(newExpense)

    // Clear inputs
    setAmount('')
    setCategory('')
    setDescription('')
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <h2 className="text-2xl font-semibold mb-4">➕ Add New Expense</h2>

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
      >
        <option value="">Select Category</option>
        <option value="Groceries">Groceries</option>
        <option value="Transport">Transport</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Bills">Bills</option>
        <option value="Other">Other</option>
      </select>

      {category === 'Other' && (
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />
      )}

      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
      >
        Add Expense
      </button>
    </form>
  )
}
