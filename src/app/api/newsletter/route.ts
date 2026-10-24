import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  const db = await getDatabase();
  return NextResponse.json({ success: true, data: db.subscribers });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = String(body?.email || '').trim().toLowerCase();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { success: false, message: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    if (!db.subscribers.some((s) => s.email.toLowerCase() === email)) {
      db.subscribers.unshift({
        id: `sub-${Date.now()}`,
        email,
        createdAt: new Date().toISOString()
      });
      db.activities.unshift({
        id: `act-${Date.now()}`,
        type: 'primary',
        text: 'New newsletter subscriber',
        highlight: email,
        time: 'Just now'
      });
      await saveDatabase(db);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for subscribing!'
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to subscribe', error: String(error) },
      { status: 500 }
    );
  }
}
