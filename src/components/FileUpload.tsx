'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Papa from 'papaparse';
import { Button } from './ui/button';
import { Alert } from './ui/alert';
import { importCompaniesFromCSV } from '@/lib/actions';

type CSVRow = {
  'Company Name': string;
  'Total Funding': string;
  'Current Revenue': string;
  'Investor List': string;
  'Market Segment': string;
  'Stage': string;
};

export function FileUpload() {
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const processCSV = async (results: Papa.ParseResult<CSVRow>) => {
    try {
      const companies = results.data.map(row => ({
        name: row['Company Name'],
        totalFunding: row['Total Funding'].replace(/[^0-9.]/g, ''),
        currentRevenue: row['Current Revenue'].replace(/[^0-9.]/g, ''),
        investorList: row['Investor List'],
        marketSegment: row['Market Segment'],
        stage: row['Stage']
      }));

      const result = await importCompaniesFromCSV(companies);
      
      if (result.success) {
        setUploadStatus('success');
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error processing CSV:', error);
      setErrorMessage(error instanceof Error ? error.message : 'Failed to process CSV');
      setUploadStatus('error');
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    setUploadStatus('processing');
    setErrorMessage('');
    
    Papa.parse<CSVRow>(file, {
      header: true,
      complete: processCSV,
      error: (error) => {
        console.error('Parse error:', error);
        setErrorMessage('Failed to parse CSV file');
        setUploadStatus('error');
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    maxFiles: 1
  });

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-primary bg-primary/10' : 'border-muted-foreground/25'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-10 w-10 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <div className="text-lg">
            {isDragActive ? (
              <p>Drop the CSV file here</p>
            ) : (
              <p>Drag & drop your portfolio CSV file here, or click to select</p>
            )}
          </div>
          <Button variant="outline">Select File</Button>
        </div>
      </div>

      {uploadStatus === 'processing' && (
        <Alert className="bg-blue-500/10 text-blue-500">
          Processing your file...
        </Alert>
      )}

      {uploadStatus === 'success' && (
        <Alert className="bg-green-500/10 text-green-500">
          Companies imported successfully!
        </Alert>
      )}

      {uploadStatus === 'error' && (
        <Alert className="bg-red-500/10 text-red-500">
          {errorMessage || 'Error processing file. Please ensure it\'s a valid CSV.'}
        </Alert>
      )}
    </div>
  );
}