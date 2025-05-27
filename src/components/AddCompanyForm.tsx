'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { createCompany } from '@/lib/actions';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';

interface AddCompanyFormProps {
  onSuccess?: () => void;
}

const companySchema = z.object({
  name: z.string().min(1, 'Company name is required'),
  totalFunding: z.string().min(1, 'Total funding is required')
    .refine((val) => !isNaN(Number(val)), 'Must be a valid number'),
  currentRevenue: z.string().min(1, 'Current revenue is required')
    .refine((val) => !isNaN(Number(val)), 'Must be a valid number'),
  marketSegment: z.string().min(1, 'Market segment is required'),
  stage: z.string().min(1, 'Stage is required'),
  investorList: z.string().optional(),
  location: z.string().optional(),
  website: z.string().url().optional().or(z.literal('')),
  description: z.string().optional(),
});

const stages = [
  'Pre-Seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C',
  'Series D+',
  'Growth',
];

const marketSegments = [
  'AI/ML',
  'SaaS',
  'Fintech',
  'Healthcare',
  'E-commerce',
  'Enterprise',
  'Consumer',
  'Hardware',
  'Blockchain',
  'Other',
];

export function AddCompanyForm({ onSuccess }: AddCompanyFormProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    totalFunding: '',
    currentRevenue: '',
    investorList: '',
    marketSegment: '',
    stage: '',
    location: '',
    website: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate form data
      const validatedData = companySchema.parse(formData);

      const result = await createCompany({
        ...validatedData,
        totalFunding: parseFloat(validatedData.totalFunding),
        currentRevenue: parseFloat(validatedData.currentRevenue),
      });

      if (result.success) {
        toast({
          title: 'Success',
          description: 'Company added successfully!',
        });
        setFormData({
          name: '',
          totalFunding: '',
          currentRevenue: '',
          investorList: '',
          marketSegment: '',
          stage: '',
          location: '',
          website: '',
          description: '',
        });
        onSuccess?.();
      } else {
        throw new Error(result.error);
      }
    } catch (err) {
      console.error('Error:', err);
      let errorMessage = 'Failed to add company';
      
      if (err instanceof z.ZodError) {
        errorMessage = err.errors.map(e => e.message).join(', ');
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      toast({
        variant: 'destructive',
        title: 'Error',
        description: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Company Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder="Enter company name"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="totalFunding">Total Funding (USD) *</Label>
          <Input
            id="totalFunding"
            type="number"
            value={formData.totalFunding}
            onChange={(e) => handleChange('totalFunding', e.target.value)}
            placeholder="Enter total funding"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentRevenue">Current Revenue (USD) *</Label>
          <Input
            id="currentRevenue"
            type="number"
            value={formData.currentRevenue}
            onChange={(e) => handleChange('currentRevenue', e.target.value)}
            placeholder="Enter current revenue"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stage">Stage *</Label>
          <Select
            value={formData.stage}
            onValueChange={(value) => handleChange('stage', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marketSegment">Market Segment *</Label>
          <Select
            value={formData.marketSegment}
            onValueChange={(value) => handleChange('marketSegment', value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select market segment" />
            </SelectTrigger>
            <SelectContent>
              {marketSegments.map((segment) => (
                <SelectItem key={segment} value={segment}>
                  {segment}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="Enter location"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="website">Website</Label>
          <Input
            id="website"
            type="url"
            value={formData.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="Enter website URL"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="investorList">Investor List</Label>
          <Input
            id="investorList"
            value={formData.investorList}
            onChange={(e) => handleChange('investorList', e.target.value)}
            placeholder="Enter investors (comma-separated)"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Enter company description"
          className="min-h-[100px]"
        />
      </div>

      <div className="flex justify-end gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? 'Adding Company...' : 'Add Company'}
        </Button>
      </div>
    </form>
  );
}