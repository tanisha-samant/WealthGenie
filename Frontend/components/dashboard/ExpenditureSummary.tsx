import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { TrendingDown, AlertTriangle, Target, ShoppingCart } from 'lucide-react';

interface ExpenditureSummaryProps {
  data: any;
}

export function ExpenditureSummary({ data }: ExpenditureSummaryProps) {
  const totalExpenses = data.expenses.reduce((sum: number, item: any) => sum + item.amount, 0);
  const avgMonthlyExpense = totalExpenses / data.expenses.length;
  const highestExpense = Math.max(...data.expenses.map((item: any) => item.amount));
  const lowestExpense = Math.min(...data.expenses.map((item: any) => item.amount));

  // Calculate trend
  const lastMonth = data.expenses[data.expenses.length - 1]?.amount || 0;
  const secondLastMonth = data.expenses[data.expenses.length - 2]?.amount || 0;
  const trend = ((lastMonth - secondLastMonth) / secondLastMonth * 100).toFixed(1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900">Expenditure Summary</h2>
        <Badge variant={parseFloat(trend) > 0 ? "destructive" : "default"}>
          {parseFloat(trend) > 0 ? '↗' : '↘'} {Math.abs(parseFloat(trend))}% vs last month
        </Badge>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Total Expenses</p>
                <p className="text-2xl">₹{totalExpenses.toLocaleString('en-IN')}</p>
              </div>
              <TrendingDown className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Avg Monthly</p>
                <p className="text-2xl">₹{Math.round(avgMonthlyExpense).toLocaleString('en-IN')}</p>
              </div>
              <Target className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Highest Month</p>
                <p className="text-2xl">₹{highestExpense.toLocaleString('en-IN')}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Lowest Month</p>
                <p className="text-2xl">₹{lowestExpense.toLocaleString('en-IN')}</p>
              </div>
              <ShoppingCart className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Expense Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Expense Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data.expenses}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Expenses']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#EF4444" 
                    fill="#FEE2E2"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Income vs Expense Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Income vs Expense Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any, name: string) => [`₹${value.toLocaleString('en-IN')}`, name]}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    data={data.income}
                    stroke="#10B981" 
                    strokeWidth={3}
                    name="Income"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    data={data.expenses}
                    stroke="#EF4444" 
                    strokeWidth={3}
                    name="Expenses"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expense Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-l-4 border-l-red-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Most Expensive Category</p>
                <p className="text-xl text-gray-900">Food & Dining</p>
                <p className="text-sm text-red-600">₹18,000 this month</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <span className="text-red-600">🍽️</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-yellow-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Highest Single Expense</p>
                <p className="text-xl text-gray-900">Home Rent</p>
                <p className="text-sm text-yellow-600">₹25,000 on Jun 1</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-600">🏠</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Best Saving Month</p>
                <p className="text-xl text-gray-900">May 2024</p>
                <p className="text-sm text-green-600">₹32,000 saved</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600">💰</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Spending Trend Analysis */}
      <Card>
        <CardHeader>
          <CardTitle>Spending Trend Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="text-red-700">Higher spending than usual</p>
                  <p className="text-sm text-red-600">You've spent 15% more this month compared to your average</p>
                </div>
              </div>
              <Badge variant="destructive">Alert</Badge>
            </div>

            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-green-500" />
                <div>
                  <p className="text-green-700">Entertainment budget under control</p>
                  <p className="text-sm text-green-600">You're 20% under your entertainment budget this month</p>
                </div>
              </div>
              <Badge variant="default" className="bg-green-100 text-green-800">Good</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}