import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { TrendingUp, TrendingDown, Equal } from 'lucide-react';

interface CategorySpendingProps {
  data: any;
}

export function CategorySpending({ data }: CategorySpendingProps) {
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    if (percent > 0.05) {
      return (
        <text 
          x={x} 
          y={y} 
          fill="white" 
          textAnchor={x > cx ? 'start' : 'end'} 
          dominantBaseline="central"
          className="text-sm"
        >
          {`${(percent * 100).toFixed(0)}%`}
        </text>
      );
    }
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900">Category-wise Spending</h2>
        <div className="text-sm text-gray-600">
          Total Spending: ₹{data.categoryExpenses.reduce((sum: number, cat: any) => sum + cat.amount, 0).toLocaleString('en-IN')}
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Spending Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.categoryExpenses}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="amount"
                  >
                    {data.categoryExpenses.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Bar Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Category Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data.categoryExpenses} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="category" type="category" width={80} />
                  <Tooltip 
                    formatter={(value: any) => [`₹${value.toLocaleString('en-IN')}`, 'Amount']}
                  />
                  <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
                    {data.categoryExpenses.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Category Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {data.categoryExpenses.map((category: any, index: number) => {
          const trend = Math.random() > 0.5 ? 'up' : Math.random() > 0.5 ? 'down' : 'same';
          const trendValue = (Math.random() * 20).toFixed(1);
          
          return (
            <Card key={category.category} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <h3 className="text-lg text-gray-900">{category.category}</h3>
                  </div>
                  <div className="flex items-center space-x-1">
                    {trend === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                    {trend === 'down' && <TrendingDown className="w-4 h-4 text-green-500" />}
                    {trend === 'same' && <Equal className="w-4 h-4 text-gray-500" />}
                    <span className={`text-sm ${
                      trend === 'up' ? 'text-red-500' : 
                      trend === 'down' ? 'text-green-500' : 'text-gray-500'
                    }`}>
                      {trend === 'same' ? '0' : (trend === 'up' ? '+' : '-')}{trendValue}%
                    </span>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl text-gray-900">
                      ₹{category.amount.toLocaleString('en-IN')}
                    </span>
                    <span className="text-sm text-gray-600">
                      {category.percentage}%
                    </span>
                  </div>
                  
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500 ease-in-out"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: category.color 
                      }}
                    />
                  </div>
                  
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Budget: ₹{(category.amount * 1.2).toLocaleString('en-IN')}</span>
                    <span>
                      {category.amount > category.amount * 1.2 ? 'Over' : 'Under'} budget
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Category Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Category Insights</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg text-gray-900">Top Spending Categories</h4>
              {data.categoryExpenses
                .sort((a: any, b: any) => b.amount - a.amount)
                .slice(0, 3)
                .map((category: any, index: number) => (
                  <div key={category.category} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{index + 1}</span>
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-gray-900">{category.category}</span>
                    </div>
                    <span className="text-gray-700">
                      ₹{category.amount.toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
            </div>

            <div className="space-y-4">
              <h4 className="text-lg text-gray-900">Budget Status</h4>
              {data.categoryExpenses.map((category: any) => {
                const budget = category.amount * 1.2;
                const isOverBudget = category.amount > budget;
                const budgetUsed = (category.amount / budget * 100).toFixed(0);
                
                return (
                  <div key={category.category} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">{category.category}</span>
                      <span className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-green-600'}`}>
                        {budgetUsed}% used
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5">
                      <div 
                        className={`h-1.5 rounded-full transition-all duration-500 ease-in-out ${
                          isOverBudget ? 'bg-red-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(parseFloat(budgetUsed), 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}