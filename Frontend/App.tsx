import React, { useState } from 'react';
import { LoginPage } from './components/LoginPage';
import { FileUploadPage } from './components/FileUploadPage';
import { Dashboard } from './components/Dashboard';
import { ChatBot } from './components/ChatBot';
import { ExportModal } from './components/ExportModal';

// Mock financial data
const mockFinancialData = {
  income: [
    { month: 'Jan', amount: 75000, source: 'Salary' },
    { month: 'Feb', amount: 75000, source: 'Salary' },
    { month: 'Mar', amount: 82000, source: 'Salary + Bonus' },
    { month: 'Apr', amount: 75000, source: 'Salary' },
    { month: 'May', amount: 75000, source: 'Salary' },
    { month: 'Jun', amount: 75000, source: 'Salary' },
  ],
  expenses: [
    { month: 'Jan', amount: 45000, category: 'Mixed' },
    { month: 'Feb', amount: 52000, category: 'Mixed' },
    { month: 'Mar', amount: 48000, category: 'Mixed' },
    { month: 'Apr', amount: 55000, category: 'Mixed' },
    { month: 'May', amount: 43000, category: 'Mixed' },
    { month: 'Jun', amount: 49000, category: 'Mixed' },
  ],
  categoryExpenses: [
    { category: 'Food', amount: 18000, percentage: 25, color: '#3B82F6' },
    { category: 'Transport', amount: 12000, percentage: 17, color: '#10B981' },
    { category: 'Entertainment', amount: 8000, percentage: 11, color: '#F59E0B' },
    { category: 'Bills', amount: 15000, percentage: 21, color: '#EF4444' },
    { category: 'Grocery', amount: 10000, percentage: 14, color: '#8B5CF6' },
    { category: 'Others', amount: 8000, percentage: 12, color: '#6B7280' },
  ],
  emis: [
    { name: 'Home Loan', amount: 25000, dueDate: '2024-08-05', status: 'upcoming' },
    { name: 'Car Loan', amount: 15000, dueDate: '2024-08-12', status: 'upcoming' },
    { name: 'Credit Card', amount: 8000, dueDate: '2024-07-28', status: 'overdue' },
  ],
  totalIncome: 457000,
  totalExpenses: 292000,
  totalSavings: 165000,
  savingsGoal: 200000,
};

export default function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [financialData, setFinancialData] = useState(mockFinancialData);
  const [isChatBotOpen, setIsChatBotOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('upload');
  };

  const handleFileUpload = (data: any) => {
    // In a real app, this would process the uploaded file
    setFinancialData(mockFinancialData);
    setCurrentPage('dashboard');
  };

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'login':
        return <LoginPage onLogin={handleLogin} />;
      case 'upload':
        return <FileUploadPage onUpload={handleFileUpload} onSkip={() => setCurrentPage('dashboard')} />;
      case 'dashboard':
        return (
          <Dashboard
            data={financialData}
            onExport={() => setIsExportModalOpen(true)}
          />
        );
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {renderCurrentPage()}
      
      {/* ChatBot - only show on dashboard */}
      {currentPage === 'dashboard' && (
        <ChatBot
          isOpen={isChatBotOpen}
          onToggle={() => setIsChatBotOpen(!isChatBotOpen)}
          financialData={financialData}
        />
      )}

      {/* Export Modal */}
      {isExportModalOpen && (
        <ExportModal
          isOpen={isExportModalOpen}
          onClose={() => setIsExportModalOpen(false)}
          data={financialData}
        />
      )}
    </div>
  );
}