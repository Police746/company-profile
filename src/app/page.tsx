import React from 'react';
import { getDatabase } from '@/lib/db';
import CompanyProfileView from '@/components/CompanyProfileView';

export const dynamic = 'force-dynamic';

export default async function HomePage() {
  const db = await getDatabase();
  return <CompanyProfileView initialData={db} />;
}
