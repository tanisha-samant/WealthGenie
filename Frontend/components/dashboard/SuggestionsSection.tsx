import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Lightbulb, TrendingDown, PiggyBank, Target, CheckCircle, X, Bookmark } from 'lucide-react';

interface SuggestionsSectionProps {
  data: any;
}

interface Suggestion {
  id: string;
  type: 'save' | 'reduce' | 'invest' | 'alert';
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  category?: string;
  saved?: boolean;
  applied?: boolean;
}

export function SuggestionsSection({ data }: SuggestionsSectionProps) {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: '1',
      type: 'reduce',
      title: 'Reduce Food & Dining Expenses',
      description: 'You\'ve spent ₹18,000 on food this month, which is 25% of your total expenses. Consider cooking at home more often.',
      impact: 'Save ₹8,000/month',
      priority: 'high',
      category: 'Food'
    },
    {
      id: '2',
      type: 'save',
      title: 'Increase Emergency Fund',
      description: 'Your emergency fund covers 3.2 months of expenses. Aim for 6 months to be financially secure.',
      impact: 'Build ₹1,50,000 fund',
      priority: 'high',
      category: 'Savings'
    },
    {
      id: '3',
      type: 'invest',
      title: 'Start SIP Investment',
      description: 'You have good savings potential. Consider starting a SIP of ₹10,000/month in equity mutual funds.',
      impact: 'Potential returns: 12-15% annually',
      priority: 'medium',
      category: 'Investment'
    },
    {
      id: '4',
      type: 'alert',
      title: 'Credit Card Payment Overdue',
      description: 'Your credit card payment of ₹8,000 is overdue. Pay immediately to avoid penalty charges.',
      impact: 'Avoid ₹500 late fee',
      priority: 'high',
      category: 'EMI'
    },
    {
      id: '5',
      type: 'reduce',
      title: 'Optimize Transportation Costs',
      description: 'Consider carpooling or using public transport to reduce your ₹12,000 monthly transport expenses.',
      impact: 'Save ₹4,000/month',
      priority: 'medium',
      category: 'Transport'
    },
    {
      id: '6',
      type: 'save',
      title: 'Automate Savings',
      description: 'Set up automatic transfers to your savings account right after salary credit to avoid overspending.',
      impact: 'Guaranteed savings of ₹15,000/month',
      priority: 'medium',
      category: 'Savings'
    }
  ]);

  const handleSaveSuggestion = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, saved: !s.saved } : s
    ));
  };

  const handleApplySuggestion = (id: string) => {
    setSuggestions(prev => prev.map(s => 
      s.id === id ? { ...s, applied: true } : s
    ));
  };

  const handleIgnoreSuggestion = (id: string) => {
    setSuggestions(prev => prev.filter(s => s.id !== id));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'save':
        return <PiggyBank className="w-5 h-5 text-green-600" />;
      case 'reduce':
        return <TrendingDown className="w-5 h-5 text-blue-600" />;
      case 'invest':
        return <Target className="w-5 h-5 text-purple-600" />;
      case 'alert':
        return <Lightbulb className="w-5 h-5 text-red-600" />;
      default:
        return <Lightbulb className="w-5 h-5 text-gray-600" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'save':
        return 'bg-green-100 text-green-800';
      case 'reduce':
        return 'bg-blue-100 text-blue-800';
      case 'invest':
        return 'bg-purple-100 text-purple-800';
      case 'alert':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const highPriority = suggestions.filter(s => s.priority === 'high');
  const mediumPriority = suggestions.filter(s => s.priority === 'medium');
  const lowPriority = suggestions.filter(s => s.priority === 'low');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900">AI Financial Insights</h2>
        <div className="flex items-center space-x-4">
          <Badge variant="outline">{suggestions.length} suggestions</Badge>
          <Button variant="outline" size="sm">
            <Bookmark className="w-4 h-4 mr-2" />
            View Saved
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-red-500 to-pink-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-red-100">High Priority</p>
                <p className="text-2xl">{highPriority.length}</p>
              </div>
              <Lightbulb className="w-6 h-6 text-red-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-yellow-100">Medium Priority</p>
                <p className="text-2xl">{mediumPriority.length}</p>
              </div>
              <Target className="w-6 h-6 text-yellow-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100">Potential Savings</p>
                <p className="text-2xl">₹12K</p>
              </div>
              <PiggyBank className="w-6 h-6 text-green-200" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100">Applied</p>
                <p className="text-2xl">{suggestions.filter(s => s.applied).length}</p>
              </div>
              <CheckCircle className="w-6 h-6 text-blue-200" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* High Priority Suggestions */}
      {highPriority.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl text-gray-900 flex items-center space-x-2">
            <span>🚨</span>
            <span>High Priority Actions</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {highPriority.map((suggestion) => (
              <Card key={suggestion.id} className="border-l-4 border-l-red-500 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        {getTypeIcon(suggestion.type)}
                        <div className="flex-1">
                          <h4 className="text-lg text-gray-900 mb-1">{suggestion.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                          <div className="flex items-center space-x-2 mb-3">
                            <Badge variant="outline" className={getTypeColor(suggestion.type)}>
                              {suggestion.type}
                            </Badge>
                            <Badge variant="outline" className={getPriorityColor(suggestion.priority)}>
                              {suggestion.priority}
                            </Badge>
                            {suggestion.category && (
                              <Badge variant="outline">{suggestion.category}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-green-600">{suggestion.impact}</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant={suggestion.saved ? "default" : "outline"}
                          onClick={() => handleSaveSuggestion(suggestion.id)}
                        >
                          <Bookmark className="w-4 h-4 mr-1" />
                          {suggestion.saved ? 'Saved' : 'Save'}
                        </Button>
                        {!suggestion.applied && (
                          <Button
                            size="sm"
                            onClick={() => handleApplySuggestion(suggestion.id)}
                          >
                            Apply
                          </Button>
                        )}
                        {suggestion.applied && (
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Applied
                          </Badge>
                        )}
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleIgnoreSuggestion(suggestion.id)}
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Medium Priority Suggestions */}
      {mediumPriority.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-xl text-gray-900 flex items-center space-x-2">
            <span>💡</span>
            <span>Optimization Opportunities</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mediumPriority.map((suggestion) => (
              <Card key={suggestion.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex items-start space-x-2">
                      {getTypeIcon(suggestion.type)}
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{suggestion.title}</h4>
                        <p className="text-sm text-gray-600 mb-2">{suggestion.description}</p>
                        <p className="text-sm text-green-600 mb-3">{suggestion.impact}</p>
                        <div className="flex items-center space-x-1 mb-3">
                          <Badge variant="outline" className={getTypeColor(suggestion.type)} size="sm">
                            {suggestion.type}
                          </Badge>
                          <Badge variant="outline" className={getPriorityColor(suggestion.priority)} size="sm">
                            {suggestion.priority}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleSaveSuggestion(suggestion.id)}
                        >
                          <Bookmark className="w-3 h-3 mr-1" />
                          {suggestion.saved ? 'Saved' : 'Save'}
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleIgnoreSuggestion(suggestion.id)}
                      >
                        <X className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* AI Insights Summary */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Lightbulb className="w-4 h-4 text-purple-600" />
            </div>
            <span>AI Financial Health Summary</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-lg text-gray-900">Your Financial Strengths</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Consistent income stream</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Good savings potential (36% rate)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Reasonable EMI ratio (30%)</span>
                </li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-lg text-gray-900">Areas for Improvement</h4>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Reduce discretionary spending</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Build larger emergency fund</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Target className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Start investment planning</span>
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}