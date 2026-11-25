import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { isAdminSession } from '../../../lib/adminSession';
import { readCmsStore, resetCmsStore, writeCmsStore } from '../../../lib/cmsStore';

export const dynamic = 'force-dynamic';

export async function GET() {
  const data = await readCmsStore();
  return NextResponse.json(data, {
    headers: { 'Cache-Control': 'no-store' },
  });
}

export async function POST(req: NextRequest) {
  if (!isAdminSession(req)) {
    return NextResponse.json({ ok: false, error: 'غير مصرح.' }, { status: 401 });
  }

  try {
    const body = (await req.json()) as {
      action?: 'reset';
      siteConfig?: unknown;
      locations?: unknown;
      articles?: unknown;
    };

    const state =
      body?.action === 'reset'
        ? await resetCmsStore()
        : await writeCmsStore({
            siteConfig: body.siteConfig as never,
            locations: body.locations as never,
            articles: body.articles as never,
          });

    revalidatePath('/', 'layout');
    revalidatePath('/sitemap.xml');
    revalidatePath('/robots.txt');
    revalidatePath('/');
    revalidatePath('/locations');
    revalidatePath('/articles');

    return NextResponse.json({ ok: true, state });
  } catch {
    return NextResponse.json(
      { ok: false, error: 'تعذر حفظ التحديثات.' },
      { status: 400 }
    );
  }
}
