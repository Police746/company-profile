import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'File gambar tidak ditemukan.' },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name || '').toLowerCase() || '.png';
    const baseName = path
      .basename(file.name || 'image', ext)
      .replace(/[^a-zA-Z0-9_-]/g, '-')
      .slice(0, 40);
    const fileName = `${Date.now()}-${baseName}${ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');

    try {
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      const filePath = path.join(uploadDir, fileName);
      fs.writeFileSync(filePath, buffer);

      return NextResponse.json({
        success: true,
        url: `/uploads/${fileName}`,
        fileName: file.name
      });
    } catch {
      // Fallback for read-only serverless environments (e.g., Vercel)
      const mimeType = file.type || 'image/png';
      const base64DataUrl = `data:${mimeType};base64,${buffer.toString('base64')}`;
      return NextResponse.json({
        success: true,
        url: base64DataUrl,
        fileName: file.name
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal mengupload gambar.',
        error: String(error)
      },
      { status: 500 }
    );
  }
}
