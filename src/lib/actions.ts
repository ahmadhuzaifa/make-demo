'use server';

import { prisma } from './prisma';
import { revalidatePath } from 'next/cache';

export async function getCompanies() {
  try {
    const companies = await prisma.company.findMany({
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        totalFunding: true,
        currentRevenue: true,
        marketSegment: true,
        stage: true,
        revenueGrowth: true,
        location: true,
      },
    });
    return { success: true, data: companies };
  } catch (error) {
    console.error('Error fetching companies:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to fetch companies'
    };
  }
}

export async function createCompany(data: any) {
  try {
    // Validate required fields
    if (!data.name || !data.totalFunding || !data.currentRevenue || !data.marketSegment || !data.stage) {
      throw new Error('Missing required fields');
    }

    // Validate numeric fields
    if (isNaN(data.totalFunding) || isNaN(data.currentRevenue)) {
      throw new Error('Invalid numeric values for funding or revenue');
    }

    // Convert investor list from string to array if it's provided
    const investorList = data.investorList 
      ? data.investorList.split(',').map((i: string) => i.trim())
      : [];

    const company = await prisma.company.create({
      data: {
        name: data.name,
        totalFunding: data.totalFunding,
        currentRevenue: data.currentRevenue,
        investorList: investorList,
        marketSegment: data.marketSegment,
        stage: data.stage,
        location: data.location || null,
        website: data.website || null,
        description: data.description || null,
      },
    });

    revalidatePath('/companies');
    return { success: true, data: company };
  } catch (error) {
    console.error('Error creating company:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create company'
    };
  }
}

export async function updateCompany(data: any) {
  try {
    if (!data.id) throw new Error('Missing company ID');
    const updated = await prisma.company.update({
      where: { id: data.id },
      data: {
        name: data.name,
        totalFunding: data.totalFunding,
        currentRevenue: data.currentRevenue,
        marketSegment: data.marketSegment,
        stage: data.stage,
        revenueGrowth: data.revenueGrowth,
      },
    });
    revalidatePath('/companies');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to update company' };
  }
}

export async function deleteCompany(id: string) {
  try {
    await prisma.company.delete({ where: { id } });
    revalidatePath('/companies');
    return { success: true };
  } catch (error) {
    return { success: false, error: error instanceof Error ? error.message : 'Failed to delete company' };
  }
}

export async function createCompanyUpdate(data: any) {
  try {
    if (!data.title || !data.description || !data.companyId) {
      throw new Error('Missing required fields for company update');
    }

    const update = await prisma.companyUpdate.create({
      data: {
        title: data.title,
        description: data.description,
        companyId: data.companyId,
      },
    });
    revalidatePath(`/companies/${data.companyId}`);
    return { success: true, data: update };
  } catch (error) {
    console.error('Error creating update:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create update'
    };
  }
}

export async function importCompaniesFromCSV(companies: any[]) {
  try {
    if (!Array.isArray(companies) || companies.length === 0) {
      throw new Error('No valid companies data provided');
    }

    const created = await prisma.$transaction(
      companies.map((company) => {
        if (!company.name || !company.totalFunding || !company.currentRevenue || !company.marketSegment || !company.stage) {
          throw new Error(`Invalid company data: ${JSON.stringify(company)}`);
        }

        const investorList = company.investorList
          ? company.investorList.split(',').map((i: string) => i.trim())
          : [];

        return prisma.company.create({
          data: {
            name: company.name,
            totalFunding: parseFloat(company.totalFunding),
            currentRevenue: parseFloat(company.currentRevenue),
            investorList: investorList,
            marketSegment: company.marketSegment,
            stage: company.stage,
          },
        });
      })
    );
    revalidatePath('/companies');
    return { success: true, data: created };
  } catch (error) {
    console.error('Error importing companies:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to import companies'
    };
  }
}

export async function createReport(data: any) {
  try {
    if (!data.title || !data.content || !data.type || !data.format) {
      throw new Error('Missing required fields for report');
    }

    const report = await prisma.report.create({
      data: {
        title: data.title,
        content: data.content,
        type: data.type,
        format: data.format,
        companyId: data.companyId,
      },
    });
    revalidatePath('/reports');
    return { success: true, data: report };
  } catch (error) {
    console.error('Error creating report:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to create report'
    };
  }
}

export async function saveAIAnalysis(data: any) {
  try {
    if (!data.query || !data.response) {
      throw new Error('Missing required fields for AI analysis');
    }

    const analysis = await prisma.aIAnalysis.create({
      data: {
        query: data.query,
        response: data.response,
        companyName: data.companyName,
        metadata: data.metadata,
      },
    });
    return { success: true, data: analysis };
  } catch (error) {
    console.error('Error saving AI analysis:', error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Failed to save analysis'
    };
  }
}