import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { CreditCard, AlertTriangle, Clock, CheckCircle, Calendar } from 'lucide-react';

interface EMITrackerProps {
  data: any;
}

export function EMITracker({ data }: EMITrackerProps) {
  const totalEMI = data.emis.reduce((sum: number, emi: any) => sum + emi.amount, 0);
  const overdueCount = data.emis.filter((emi: any) => emi.status === 'overdue').length;
  const upcomingCount = data.emis.filter((emi: any) => emi.status === 'upcoming').length;

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'upcoming':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'paid':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'overdue':
        return <Badge variant="destructive">Overdue</Badge>;
      case 'upcoming':
        return <Badge variant="secondary">Upcoming</Badge>;
      case 'paid':
        return <Badge variant="default" className="bg-green-100 text-green-800">Paid</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const today = new Date();
    const due = new Date(dueDate);
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900">EMI &amp; Loan Tracker</h2>
        <div className="flex items-center space-x-4">
          <Button variant="outline">
            <Calendar className="w-4 h-4 mr-2" />
            Set Reminders
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Total Monthly EMI</p>
                <p className="text-2xl">₹{totalEMI.toLocaleString('en-IN')}</p>
              </div>
              <CreditCard className="w-8 h-8 text-blue-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-red-500 to-red-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">Overdue Payments</p>
                <p className="text-2xl">{overdueCount}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Upcoming Payments</p>
                <p className="text-2xl">{upcomingCount}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">EMI to Income Ratio</p>
                <p className="text-2xl">{((totalEMI / (data.totalIncome / 6)) * 100).toFixed(1)}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* EMI Table */}
      <Card>
        <CardHeader>
          <CardTitle>Current EMIs &amp; Loans</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Loan Name</TableHead>
                <TableHead>EMI Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Days Until Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.emis.map((emi: any, index: number) => {
                const daysUntil = getDaysUntilDue(emi.dueDate);
                return (
                  <TableRow key={index} className={emi.status === 'overdue' ? 'bg-red-50' : ''}>
                    <TableCell className="flex items-center space-x-2">
                      {getStatusIcon(emi.status)}
                      <span className="text-gray-900">{emi.name}</span>
                    </TableCell>
                    <TableCell className="text-gray-900">
                      ₹{emi.amount.toLocaleString('en-IN')}
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(emi.dueDate).toLocaleDateString('en-GB')}
                    </TableCell>
                    <TableCell>
                      <span className={`text-sm ${
                        daysUntil < 0 ? 'text-red-600' : 
                        daysUntil <= 3 ? 'text-yellow-600' : 'text-green-600'
                      }`}>
                        {daysUntil < 0 ? `${Math.abs(daysUntil)} days overdue` : 
                         daysUntil === 0 ? 'Due today' : 
                         `${daysUntil} days`}
                      </span>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(emi.status)}
                    </TableCell>
                    <TableCell>
                      <Button 
                        variant={emi.status === 'overdue' ? 'destructive' : 'outline'} 
                        size="sm"
                      >
                        {emi.status === 'overdue' ? 'Pay Now' : 'Mark Paid'}
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payment Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payment Timeline</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.emis
              .sort((a: any, b: any) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
              .map((emi: any, index: number) => {
                const daysUntil = getDaysUntilDue(emi.dueDate);
                return (
                  <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <div className={`w-3 h-3 rounded-full ${
                      emi.status === 'overdue' ? 'bg-red-500' : 
                      daysUntil <= 3 ? 'bg-yellow-500' : 'bg-green-500'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-gray-900">{emi.name}</p>
                          <p className="text-sm text-gray-600">
                            Due: {new Date(emi.dueDate).toLocaleDateString('en-GB')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-gray-900">₹{emi.amount.toLocaleString('en-IN')}</p>
                          <p className="text-sm text-gray-600">
                            {daysUntil < 0 ? 'Overdue' : 
                             daysUntil === 0 ? 'Due today' : 
                             `${daysUntil} days left`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* EMI Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-l-4 border-l-blue-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <h4 className="text-lg text-gray-900">EMI Health Score</h4>
                  <p className="text-sm text-gray-600">Based on your income ratio</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Current Ratio</span>
                  <span className="text-sm text-gray-900">
                    {((totalEMI / (data.totalIncome / 6)) * 100).toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      (totalEMI / (data.totalIncome / 6)) * 100 > 40 ? 'bg-red-500' : 
                      (totalEMI / (data.totalIncome / 6)) * 100 > 30 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min((totalEMI / (data.totalIncome / 6)) * 100, 100)}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Recommended: Below 40% of monthly income
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <h4 className="text-lg text-gray-900">Payment History</h4>
                  <p className="text-sm text-gray-600">Last 6 months performance</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">On-time Payments</span>
                  <span className="text-sm text-green-600">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }} />
                </div>
                <p className="text-xs text-gray-500">
                  Good payment record, keep it up!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}