import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';
import { Badge } from '../ui/badge';
import { PiggyBank, Target, TrendingUp, Calendar } from 'lucide-react';

interface SavingsTrackerProps {
  data: any;
}

export function SavingsTracker({ data }: SavingsTrackerProps) {
  const savingsRate = (data.totalSavings / data.totalIncome * 100).toFixed(1);
  const goalProgress = (data.totalSavings / data.savingsGoal * 100).toFixed(1);
  const remainingToGoal = data.savingsGoal - data.totalSavings;
  const monthsToGoal = Math.ceil(remainingToGoal / (data.totalSavings / 6));

  const monthlySavings = data.income.map((income: any, index: number) => ({
    month: income.month,
    income: income.amount,
    expense: data.expenses[index]?.amount || 0,
    savings: income.amount - (data.expenses[index]?.amount || 0),
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900">Savings Tracker</h2>
        <Badge variant={parseFloat(savingsRate) > 20 ? "default" : "secondary"}>
          {savingsRate}% Savings Rate
        </Badge>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Total Savings</p>
                <p className="text-2xl">₹{data.totalSavings.toLocaleString('en-IN')}</p>
              </div>
              <PiggyBank className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Savings Goal</p>
                <p className="text-2xl">₹{data.savingsGoal.toLocaleString('en-IN')}</p>
              </div>
              <Target className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Monthly Avg</p>
                <p className="text-2xl">₹{Math.round(data.totalSavings / 6).toLocaleString('en-IN')}</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Savings Rate</p>
                <p className="text-2xl">{savingsRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Goal Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Savings Goal Progress</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="relative w-40 h-40 mx-auto mb-4">
                <svg className="w-40 h-40 transform -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#E5E7EB"
                    strokeWidth="12"
                    fill="none"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="70"
                    stroke="#10B981"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 70}`}
                    strokeDashoffset={`${2 * Math.PI * 70 * (1 - parseFloat(goalProgress) / 100)}`}
                    className="transition-all duration-1000 ease-in-out"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-2xl text-gray-900">{goalProgress}%</p>
                    <p className="text-sm text-gray-600">Complete</p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-gray-600">
                  ₹{remainingToGoal.toLocaleString('en-IN')} remaining to reach your goal
                </p>
                <p className="text-sm text-gray-500">
                  Estimated {monthsToGoal} months at current rate
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Savings Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlySavings.map((item: any) => (
                <div key={item.month} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">{item.month} 2024</span>
                    <span className="text-sm text-gray-900">
                      ₹{item.savings.toLocaleString('en-IN')}
                    </span>
                  </div>
                  <Progress 
                    value={(item.savings / item.income) * 100} 
                    className="h-2"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Income: ₹{item.income.toLocaleString('en-IN')}</span>
                    <span>Expense: ₹{item.expense.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className={`border-l-4 ${parseFloat(goalProgress) >= 75 ? 'border-l-green-500' : 'border-l-yellow-500'}`}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Goal Status</p>
                <p className="text-xl text-gray-900">
                  {parseFloat(goalProgress) >= 75 ? 'On Track' : 'Behind Target'}
                </p>
                <p className={`text-sm ${parseFloat(goalProgress) >= 75 ? 'text-green-600' : 'text-yellow-600'}`}>
                  {parseFloat(goalProgress) >= 75 
                    ? 'You\'re doing great!' 
                    : 'Need to save more'
                  }
                </p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                parseFloat(goalProgress) >= 75 ? 'bg-green-100' : 'bg-yellow-100'
              }`}>
                <Target className={`w-6 h-6 ${
                  parseFloat(goalProgress) >= 75 ? 'text-green-600' : 'text-yellow-600'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Best Saving Month</p>
                <p className="text-xl text-gray-900">May 2024</p>
                <p className="text-sm text-blue-600">₹32,000 saved</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Emergency Fund</p>
                <p className="text-xl text-gray-900">3.2 Months</p>
                <p className="text-sm text-purple-600">₹1,56,000 available</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Savings Tips */}
      <Card>
        <CardHeader>
          <CardTitle>Smart Savings Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-green-600">💡</span>
                </div>
                <div>
                  <p className="text-green-700">Automate your savings</p>
                  <p className="text-sm text-green-600">
                    Set up automatic transfers to reach your goal faster
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                  <span className="text-blue-600">📊</span>
                </div>
                <div>
                  <p className="text-blue-700">Reduce entertainment expenses</p>
                  <p className="text-sm text-blue-600">
                    Cut entertainment by 20% to save extra ₹8,000/month
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}