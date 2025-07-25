import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Upload, FileSpreadsheet, Cloud, CheckCircle } from 'lucide-react';

interface FileUploadPageProps {
  onUpload: (data: any) => void;
  onSkip: () => void;
}

export function FileUploadPage({ onUpload, onSkip }: FileUploadPageProps) {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setUploadedFile(file);
  };

  const handleUpload = () => {
    setIsUploading(true);
    // Simulate upload process
    setTimeout(() => {
      setIsUploading(false);
      onUpload(uploadedFile);
    }, 2000);
  };

  const handleGoogleSheetsConnect = () => {
    setIsUploading(true);
    // Simulate Google Sheets connection
    setTimeout(() => {
      setIsUploading(false);
      onUpload('google-sheets-data');
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">Upload Your Financial Data</h1>
          <p className="text-gray-600">Import your transactions to get started with personalized insights</p>
        </div>

        {/* Upload Options */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Google Sheets Option */}
          <Card className="hover:shadow-lg transition-shadow cursor-pointer border-2 border-dashed border-green-200 hover:border-green-300">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4 mx-auto">
                <Cloud className="w-8 h-8 text-green-600" />
              </div>
              <CardTitle className="text-green-700">Import from Google Drive</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-gray-600 mb-4">
                Connect your Google Sheets with financial data directly
              </p>
              <Button 
                onClick={handleGoogleSheetsConnect}
                disabled={isUploading}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                {isUploading ? 'Connecting...' : 'Connect Google Sheets'}
              </Button>
            </CardContent>
          </Card>

          {/* Excel Upload Option */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4 mx-auto">
                <FileSpreadsheet className="w-8 h-8 text-blue-600" />
              </div>
              <CardTitle className="text-blue-700">Upload Excel File</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                  dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                {uploadedFile ? (
                  <div className="space-y-4">
                    <CheckCircle className="w-12 h-12 text-green-600 mx-auto" />
                    <div>
                      <p className="text-green-700">{uploadedFile.name}</p>
                      <p className="text-sm text-gray-500">
                        {(uploadedFile.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <Button 
                      onClick={handleUpload}
                      disabled={isUploading}
                      className="w-full"
                    >
                      {isUploading ? 'Processing...' : 'Process File'}
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-gray-600">Drag and drop your Excel file here</p>
                      <p className="text-sm text-gray-500">or click to browse</p>
                    </div>
                    <input
                      type="file"
                      accept=".xlsx,.xls"
                      onChange={handleFileInput}
                      className="hidden"
                      id="file-input"
                    />
                    <label htmlFor="file-input">
                      <Button variant="outline" className="cursor-pointer">
                        Choose File
                      </Button>
                    </label>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Supported Columns Info */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-center">Supported Data Format</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-center mb-4">
              Make sure your spreadsheet contains these columns:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-blue-50 rounded-lg p-3">
                <p className="text-blue-700">Date</p>
              </div>
              <div className="bg-green-50 rounded-lg p-3">
                <p className="text-green-700">Amount</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-3">
                <p className="text-purple-700">Category</p>
              </div>
              <div className="bg-orange-50 rounded-lg p-3">
                <p className="text-orange-700">Description</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Skip Option */}
        <div className="text-center">
          <Button 
            variant="ghost" 
            onClick={onSkip}
            className="text-gray-500 hover:text-gray-700"
          >
            Skip for now - Use sample data
          </Button>
        </div>
      </div>
    </div>
  );
}