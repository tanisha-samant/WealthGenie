import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { IncomeOverview } from './dashboard/IncomeOverview';
import { ExpenditureSummary } from './dashboard/ExpenditureSummary';
import { SavingsTracker } from './dashboard/SavingsTracker';
import { CategorySpending } from './dashboard/CategorySpending';
import { EMITracker } from './dashboard/EMITracker';
import { SuggestionsSection } from './dashboard/SuggestionsSection';
import { 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  PieChart, 
  CreditCard, 
  Lightbulb,
  Download,
  Menu
} from 'lucide-react';

interface DashboardProps {
  data: any;
  onExport: () => void;
}

export function Dashboard({ data, onExport }: DashboardProps) {
  const [activeTab, setActiveTab] = useState('income');

  const tabs = [
    { id: 'income', label: 'Income', icon: TrendingUp },
    { id: 'expenses', label: 'Expenses', icon: TrendingDown },
    { id: 'savings', label: 'Savings', icon: PiggyBank },
    { id: 'categories', label: 'Categories', icon: PieChart },
    { id: 'emi', label: 'EMI & Loans', icon: CreditCard },
    { id: 'suggestions', label: 'AI Insights', icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-2xl text-gray-900">WealthGenie Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" onClick={onExport}>
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          {/* Tab Navigation */}
          <div className="overflow-x-auto">
            <TabsList className="grid w-full grid-cols-6 lg:w-auto lg:inline-flex">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="flex items-center space-x-2 min-w-0"
                  >
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </div>

          {/* Tab Content */}
          <TabsContent value="income" className="space-y-6">
            <IncomeOverview data={data} />
          </TabsContent>

          <TabsContent value="expenses" className="space-y-6">
            <ExpenditureSummary data={data} />
          </TabsContent>

          <TabsContent value="savings" className="space-y-6">
            <SavingsTracker data={data} />
          </TabsContent>

          <TabsContent value="categories" className="space-y-6">
            <CategorySpending data={data} />
          </TabsContent>

          <TabsContent value="emi" className="space-y-6">
            <EMITracker data={data} />
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-6">
            <SuggestionsSection data={data} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}