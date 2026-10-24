import { NextRequest, NextResponse } from 'next/server';
import { getDatabase, saveDatabase } from '@/lib/db';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const db = await getDatabase();
    return NextResponse.json({
      success: true,
      data: db.messages
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Failed to load messages', error: String(error) },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Please fill in your name, email, and message.' },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const newMsg = {
      id: `msg-${Date.now()}`,
      name: String(name).trim(),
      email: String(email).trim(),
      subject: String(subject || 'General Inquiry').trim(),
      message: String(message).trim(),
      status: 'unread' as const,
      createdAt: new Date().toISOString()
    };

    db.messages.unshift(newMsg);
    db.activities.unshift({
      id: `act-${Date.now()}`,
      type: 'info',
      text: 'New message from',
      highlight: newMsg.name,
      time: 'Just now'
    });

    await saveDatabase(db);

    return NextResponse.json({
      success: true,
      message: 'Your message has been sent. Thank you!',
      data: newMsg
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Error sending message', error: String(error) },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const body = await req.json();
    const { id, status } = body;
    const db = await getDatabase();
    db.messages = db.messages.map((m) => (m.id === id ? { ...m, status } : m));
    await saveDatabase(db);
    return NextResponse.json({ success: true, data: db.messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const db = await getDatabase();
    db.messages = db.messages.filter((m) => m.id !== id);
    await saveDatabase(db);
    return NextResponse.json({ success: true, data: db.messages });
  } catch (error) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
