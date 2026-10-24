import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await getDatabase();
  return NextResponse.json({ success: true, data: db.orders });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const db = await getDatabase();
    const nextNum = `#ORD-00${db.orders.length + 1}`;
    const newOrder = {
      id: `ord-${Date.now()}`,
      orderNumber: nextNum,
      customerName: body.customerName || body.name || 'New Client',
      customerEmail: body.customerEmail || body.email || 'client@company.com',
      customerAvatar:
        'https://bootstrapmade.com/content/demo/AppDashboard/assets/img/avatars/avatar-1.webp',
      product: body.product || 'Professional Plan',
      amount: body.amount || '$29.00',
      status: 'Pending' as const,
      createdAt: new Date().toISOString()
    };
    db.orders.unshift(newOrder);
    db.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'success',
      text: 'New order received',
      highlight: nextNum,
      time: 'Just now'
    });
    await saveDatabase(db);
    return NextResponse.json({ success: true, data: newOrder });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
