import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { Download, FileSpreadsheet, Cloud, Check } from 'lucide-react';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}

export function ExportModal({ isOpen, onClose, data }: ExportModalProps) {
  const [selectedData, setSelectedData] = useState({
    income: true,
    expenses: true,
    categories: true,
    emis: true,
    savings: true
  });
  const [exportFormat, setExportFormat] = useState('excel');
  const [isExporting, setIsExporting] = useState(false);
  const [exportComplete, setExportComplete] = useState(false);

  const dataOptions = [
    { key: 'income', label: 'Income Data', description: 'Monthly income records and sources' },
    { key: 'expenses', label: 'Expense Data', description: 'Monthly expense breakdowns' },
    { key: 'categories', label: 'Category Analysis', description: 'Category-wise spending data' },
    { key: 'emis', label: 'EMI & Loans', description: 'Loan details and payment schedules' },
    { key: 'savings', label: 'Savings Tracker', description: 'Savings goals and progress' }
  ];

  const handleDataToggle = (key: string) => {
    setSelectedData(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleExport = async () => {
    setIsExporting(true);
    
    // Simulate export process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsExporting(false);
    setExportComplete(true);
    
    // Auto-close after showing success
    setTimeout(() => {
      setExportComplete(false);
      onClose();
    }, 2000);
  };

  const selectedCount = Object.values(selectedData).filter(Boolean).length;

  if (exportComplete) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl text-gray-900 mb-2">Export Successful!</h3>
            <p className="text-gray-600">Your financial data has been exported successfully.</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Download className="w-5 h-5" />
            <span>Export Financial Data</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Export Format Selection */}
          <div className="space-y-4">
            <h4 className="text-lg text-gray-900">Choose Export Format</h4>
            <RadioGroup value={exportFormat} onValueChange={setExportFormat}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={`cursor-pointer transition-colors ${exportFormat === 'excel' ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="excel" id="excel" />
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                          <FileSpreadsheet className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <Label htmlFor="excel" className="cursor-pointer">Excel (.xlsx)</Label>
                          <p className="text-sm text-gray-600">Download as Excel file</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-colors ${exportFormat === 'sheets' ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <RadioGroupItem value="sheets" id="sheets" />
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Cloud className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <Label htmlFor="sheets" className="cursor-pointer">Google Sheets</Label>
                          <p className="text-sm text-gray-600">Upload to Google Drive</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </RadioGroup>
          </div>

          {/* Data Selection */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg text-gray-900">Select Data to Export</h4>
              <Badge variant="outline">{selectedCount} selected</Badge>
            </div>
            
            <div className="space-y-3">
              {dataOptions.map((option) => (
                <Card key={option.key} className="hover:bg-gray-50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={option.key}
                        checked={selectedData[option.key as keyof typeof selectedData]}
                        onCheckedChange={() => handleDataToggle(option.key)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={option.key} className="cursor-pointer text-gray-900">
                          {option.label}
                        </Label>
                        <p className="text-sm text-gray-600">{option.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Export Summary */}
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="text-blue-900">Export Summary</h5>
                  <p className="text-sm text-blue-700">
                    {selectedCount} data sections • {exportFormat === 'excel' ? 'Excel format' : 'Google Sheets'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-blue-600">Data Range</p>
                  <p className="text-sm text-blue-800">Jan 2024 - Jun 2024</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              onClick={handleExport}
              disabled={selectedCount === 0 || isExporting}
              className="min-w-32"
            >
              {isExporting ? (
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Exporting...</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Download className="w-4 h-4" />
                  <span>Export Data</span>
                </div>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}