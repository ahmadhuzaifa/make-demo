'use client';

import { useEffect, useState } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Link from 'next/link';
import { getCompanies, deleteCompany } from '@/lib/actions';
import { AddCompanyForm } from '@/components/AddCompanyForm';
import { EditCompanyForm } from '@/components/EditCompanyForm';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

type Company = {
  id: string;
  name: string;
  totalFunding: number;
  currentRevenue: number;
  marketSegment: string;
  stage: string;
  revenueGrowth: number | null;
};

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);

  useEffect(() => {
    loadCompanies();
  }, []);

  async function loadCompanies() {
    setLoading(true);
    const result = await getCompanies();
    if (result.success) {
      setCompanies(result.data);
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Are you sure you want to delete this company?')) return;
    const result = await deleteCompany(id);
    if (result.success) {
      toast({ title: 'Company deleted' });
      loadCompanies();
    } else {
      toast({ title: 'Error', description: result.error, variant: 'destructive' });
    }
  }

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.marketSegment.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-lg text-muted-foreground">Loading companies...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Portfolio Companies</h2>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Company
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Company</DialogTitle>
            </DialogHeader>
            <AddCompanyForm onSuccess={() => {
              setDialogOpen(false);
              loadCompanies();
            }} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="flex items-center gap-4">
        <Input 
          placeholder="Search companies..." 
          className="max-w-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline">Filter</Button>
      </div>

      <div className="grid gap-4">
        {filteredCompanies.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No companies found. Add a new company or import companies from CSV.</p>
            <div className="flex justify-center gap-4 mt-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button>Add Company</Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Company</DialogTitle>
                  </DialogHeader>
                  <AddCompanyForm onSuccess={() => {
                    setDialogOpen(false);
                    loadCompanies();
                  }} />
                </DialogContent>
              </Dialog>
              <Link href="/import">
                <Button variant="outline">Import Companies</Button>
              </Link>
            </div>
          </Card>
        ) : (
          filteredCompanies.map((company) => (
            <Card className="p-4 hover:bg-accent transition cursor-pointer" key={company.id}>
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <Link href={`/companies/${company.id}`}>
                    <h3 className="font-semibold hover:underline">{company.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {company.marketSegment} - {company.stage}
                    </p>
                  </Link>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog open={editDialogOpen && editingCompany?.id === company.id} onOpenChange={open => {
                    setEditDialogOpen(open);
                    if (!open) setEditingCompany(null);
                  }}>
                    <DialogTrigger asChild>
                      <Button size="icon" variant="ghost" onClick={() => { setEditingCompany(company); setEditDialogOpen(true); }}>
                        <Pencil className="w-4 h-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Edit Company</DialogTitle>
                      </DialogHeader>
                      {editingCompany && (
                        <EditCompanyForm company={editingCompany} onSuccess={() => {
                          setEditDialogOpen(false);
                          setEditingCompany(null);
                          loadCompanies();
                        }} />
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(company.id)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
                <div className="text-right ml-4">
                  <p className="font-medium">${(company.totalFunding / 1000000).toFixed(1)}M</p>
                  <p className="text-sm text-muted-foreground">Total Funding</p>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Revenue</p>
                  <p className="font-medium">${(company.currentRevenue / 1000000).toFixed(1)}M ARR</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Growth</p>
                  <p className={`font-medium ${company.revenueGrowth && company.revenueGrowth > 0 ? 'text-green-500' : ''}`}>
                    {company.revenueGrowth ? `+${company.revenueGrowth}%` : 'N/A'}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Market</p>
                  <p className="font-medium">{company.marketSegment}</p>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
