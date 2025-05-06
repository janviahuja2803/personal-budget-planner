import { useState } from 'react'
import SetBudgets from './SetBudgets'
import AddExpense from './AddExpense'
import ExpenseHistory from './ExpenseHistory'
import Charts from './Charts'
import UploadBankStatement from './UploadBankStatement'
import emailjs from 'emailjs-com'

interface Expense {
  amount: number
  category: string
  description?: string
}

export default function PersonalBudgetPlanner() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [categoryBudgets, setCategoryBudgets] = useState<Record<string, number>>({})
  const [activePage, setActivePage] = useState('Dashboard')

  const sendBudgetAlert = (
    userEmail: string,
    category: string,
    amount: number,
    budget: number
  ) => {
    const templateParams = {
      user_email: userEmail,
      category,
      amount,
      budget,
    }

    emailjs.send(
      'service_v4ujlkj',
      'template_cpnvfmq',
      templateParams,
      'L8w90I2FqnWSGimcR'
    ).then(
      (response) => {
        console.log('Email sent successfully!', response.status, response.text)
      },
      (err) => {
        console.error('Email sending failed...', err)
      }
    )
  }

  const handleAddExpense = (newExpense: Expense) => {
    const updatedExpenses = [...expenses, newExpense]
    setExpenses(updatedExpenses)

    const categoryBudget = categoryBudgets[newExpense.category]
    const currentTotal = updatedExpenses
      .filter((e) => e.category === newExpense.category)
      .reduce((acc, curr) => acc + curr.amount, 0)

    const budgetLeft = categoryBudget - currentTotal

    if (categoryBudget > 0 && budgetLeft / categoryBudget <= 0.1) {
      const userEmail = localStorage.getItem('userEmail') || ''
      sendBudgetAlert(userEmail, newExpense.category, currentTotal, categoryBudget)
    }
  }

  const handleUploadExpenses = (parsedExpenses: Expense[]) => {
    setExpenses(prev => [...prev, ...parsedExpenses])
  }

  const renderActivePage = () => {
    switch (activePage) {
      case 'Dashboard':
        return <SetBudgets onSave={setCategoryBudgets} />
      case 'Add Expense':
        return <AddExpense onAdd={handleAddExpense} />
      case 'History':
        return <ExpenseHistory expenses={expenses} />
      case 'Charts':
        return <Charts expenses={expenses} />
      case 'Upload Statements':
        return <UploadBankStatement onUploadExpenses={handleUploadExpenses} />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-r from-purple-200 to-blue-200 pl-64">
      {/* Sidebar */}
      <aside className="w-64 h-screen bg-white shadow-lg p-6 flex flex-col fixed left-0 top-0">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">🪙 Budget Planner</h2>
        <nav className="flex flex-col space-y-4 font-medium">
          {['Dashboard', 'Add Expense', 'History', 'Charts', 'Upload Statements'].map((item) => (
            <button
              key={item}
              className={`text-left ${
                activePage === item
                  ? 'text-blue-600 font-semibold'
                  : 'text-gray-800 hover:text-blue-600'
              }`}
              onClick={() => setActivePage(item)}
            >
              {item === 'Dashboard' && '🏠 Dashboard'}
              {item === 'Add Expense' && '➕ Add Expense'}
              {item === 'History' && '📜 History'}
              {item === 'Charts' && '📊 Charts'}
              {item === 'Upload Statements' && '🧾 Upload Statements'}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">🎯 Personal Budget Planner</h1>
        <p className="text-lg text-gray-700 mb-6">Let’s track your expenses like a boss 💰</p>

        <div className="w-full">{renderActivePage()}</div>
      </main>
    </div>
  )
}
