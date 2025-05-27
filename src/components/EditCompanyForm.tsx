"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { updateCompany } from "@/lib/actions";

interface Company {
  id: string;
  name: string;
  totalFunding: number;
  currentRevenue: number;
  marketSegment: string;
  stage: string;
  revenueGrowth: number | null;
}

export function EditCompanyForm({
  company,
  onSuccess,
}: {
  company: Company;
  onSuccess: () => void;
}) {
  const [form, setForm] = useState({ ...company });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await updateCompany(form);
    setLoading(false);
    if (result.success) {
      toast({ title: "Company updated" });
      onSuccess();
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <Label>Name</Label>
        <Input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label>Total Funding ($)</Label>
        <Input
          type="number"
          value={form.totalFunding}
          onChange={(e) =>
            setForm((f) => ({ ...f, totalFunding: parseFloat(e.target.value) }))
          }
          required
        />
      </div>
      <div>
        <Label>Current Revenue ($)</Label>
        <Input
          type="number"
          value={form.currentRevenue}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              currentRevenue: parseFloat(e.target.value),
            }))
          }
          required
        />
      </div>
      <div>
        <Label>Market Segment</Label>
        <Input
          value={form.marketSegment}
          onChange={(e) =>
            setForm((f) => ({ ...f, marketSegment: e.target.value }))
          }
          required
        />
      </div>
      <div>
        <Label>Stage</Label>
        <Input
          value={form.stage}
          onChange={(e) => setForm((f) => ({ ...f, stage: e.target.value }))}
          required
        />
      </div>
      <div>
        <Label>Revenue Growth (%)</Label>
        <Input
          type="number"
          value={form.revenueGrowth ?? ""}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              revenueGrowth:
                e.target.value === "" ? null : parseFloat(e.target.value),
            }))
          }
        />
      </div>
      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </form>
  );
}
