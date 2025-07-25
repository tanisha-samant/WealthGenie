import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { TrendingUp, DollarSign, Calendar, Target } from 'lucide-react';

interface IncomeOverviewProps {
  data: any;
}

export function IncomeOverview({ data }: IncomeOverviewProps) {
  const totalIncome = data.income.reduce((sum: number, item: any) => sum + item.amount, 0);
  const avgMonthlyIncome = totalIncome / data.income.length;
  const highestIncome = Math.max(...data.income.map((item: any) => item.amount));

  return (
    <div className="space-y-6">
      {/* Header with Filters */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900">Income Overview</h2>
        <div className="flex items-center space-x-4">
          <Select defaultValue="2024">
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024">2024</SelectItem>
              <SelectItem value="2023">2023</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Months</SelectItem>
              <SelectItem value="q1">Q1 2024</SelectItem>
              <SelectItem value="q2">Q2 2024</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Income</p>
                <p className="text-2xl">₹{totalIncome.toLocaleString('en-IN')}</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Avg Monthly</p>
                <p className="text-2xl">₹{Math.round(avgMonthlyIncome).toLocaleString('en-IN')}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100">Highest Month</p>
                <p className="text-2xl">₹{highestIncome.toLocaleString('en-IN')}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-100">Growth Rate</p>
                <p className="text-2xl">+8.5%</p>
              </div>
              <Target className="w-8 h-8 text-orange-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Income Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Income Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.income}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Income']}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Income Sources */}
        <Card>
          <CardHeader>
            <CardTitle>Income Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.income}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Income']}
                  />
                  <Bar dataKey="amount" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Income Details Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-4">Month</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Source</th>
                  <th className="text-left p-4">Growth</th>
                </tr>
              </thead>
              <tbody>
                {data.income.map((item: any, index: number) => {
                  const prevAmount = index > 0 ? data.income[index - 1].amount : item.amount;
                  const growth = ((item.amount - prevAmount) / prevAmount * 100).toFixed(1);
                  
                  return (
                    <tr key={item.month} className="border-b hover:bg-gray-50">
                      <td className="p-4">{item.month} 2024</td>
                      <td className="p-4">₹{item.amount.toLocaleString('en-IN')}</td>
                      <td className="p-4">{item.source}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                          parseFloat(growth) >= 0 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {parseFloat(growth) >= 0 ? '+' : ''}{growth}%
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}