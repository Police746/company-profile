import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    const validEmail = process.env.ADMIN_EMAIL || 'admin@nexvora.co.id';
    const validPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (
      String(email).trim().toLowerCase() === validEmail.toLowerCase() &&
      String(password) === validPassword
    ) {
      return NextResponse.json({
        success: true,
        message: 'Login Admin berhasil.',
        token: 'nxv-session-verified-2026',
        user: {
          name: 'Executive Administrator',
          email: validEmail,
          role: 'Super Admin'
        }
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Email atau kata sandi salah. Gunakan kredensial demo yang tersedia.'
      },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Gagal memproses autentikasi.', error: String(error) },
      { status: 500 }
    );
  }
}
