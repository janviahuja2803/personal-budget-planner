import React, { useState } from 'react';
import Papa, { ParseResult } from 'papaparse';

interface Expense {
  amount: number;
  category: string;
  description?: string;
}

interface Props {
  onUploadExpenses: (uploaded: Expense[]) => void;
}

export default function UploadBankStatement({ onUploadExpenses }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState('');
  const [parsedData, setParsedData] = useState<Expense[]>([]);
  const [confirmed, setConfirmed] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setStatus('');
      setParsedData([]);
      setConfirmed(false);
    }
  };

  const guessCategory = (description: string): string => {
    const desc = description.toLowerCase();

    if (desc.includes('uber') || desc.includes('lyft')) return 'Transport';
    if (desc.includes('walmart') || desc.includes('aldi') || desc.includes('grocery')) return 'Groceries';
    if (desc.includes('netflix') || desc.includes('spotify') || desc.includes('movie')) return 'Entertainment';
    if (desc.includes('amazon') || desc.includes('target') || desc.includes('apple.com') || desc.includes('itunes')) return 'Shopping';
    if (desc.includes('doctor') || desc.includes('pharmacy') || desc.includes('hospital')) return 'Health & Wellness';
    if (desc.includes('starbucks') || desc.includes('cafe') || desc.includes('restaurant')) return 'Dining Out';
    if (desc.includes('comcast') || desc.includes('pg&e') || desc.includes('utility')) return 'Bills & Utilities';
    if (desc.includes('gym') || desc.includes('fitness')) return 'Health & Wellness';

    return 'Other';
  };

  const handleUpload = () => {
    if (!file) {
      setStatus('❗ Please select a file to upload.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const csv = e.target?.result as string;

      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: function (results: { data: any[] }) {
          const cleanedData = results.data.map((row: { amount: string; category?: string; description?: string }) => ({
            amount: parseFloat(row.amount),
            category: row.category || guessCategory(row.description || ''),
            description: row.description || '',
          }));
          setParsedData(cleanedData);
          setStatus('✅ CSV parsed. Preview below before confirming.');
        },
        error: function (err: Error) {
          setStatus(`❌ Error parsing CSV: ${err.message}`);
        },
      });
    };

    reader.readAsText(file);
  };

  const handleConfirm = () => {
    onUploadExpenses(parsedData);
    setConfirmed(true);
    setStatus('✅ Expenses added to your dashboard!');
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-4xl transition-all">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📃 Upload Bank Statement
      </h2>

      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="mb-4 block w-full text-sm text-gray-600
          file:mr-4 file:py-2 file:px-4
          file:rounded-md file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition-all"
      >
        Upload
      </button>

      {status && (
        <p
          className={`mt-4 text-sm font-medium ${
            status.startsWith('✅')
              ? 'text-green-600'
              : status.startsWith('❗')
              ? 'text-yellow-600'
              : 'text-red-600'
          }`}
        >
          {status}
        </p>
      )}

      {parsedData.length > 0 && !confirmed && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">
            📋 Preview Parsed Expenses:
          </h3>
          <table className="w-full text-left border border-gray-200 rounded overflow-hidden">
            <thead className="bg-gray-100 text-sm text-gray-700">
              <tr>
                <th className="p-2 border">Category</th>
                <th className="p-2 border">Amount ($)</th>
                <th className="p-2 border">Description</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.map((exp, index) => (
                <tr key={index} className="text-sm">
                  <td className="p-2 border">{exp.category}</td>
                  <td className="p-2 border">${exp.amount.toFixed(2)}</td>
                  <td className="p-2 border">{exp.description}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button
            onClick={handleConfirm}
            className="mt-4 bg-green-600 text-white px-5 py-2 rounded hover:bg-green-700 transition"
          >
            ✅ Confirm and Add to Expenses
          </button>
        </div>
      )}
    </div>
  );
}
