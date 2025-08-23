'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [api, setApi] = useState('Checking API…');

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL ?? '';
        const res = await fetch(`${base}/health`);
        const json: unknown = await res.json();

        if (
          typeof json === 'object' &&
          json !== null &&
          'ok' in json &&
          typeof (json as { ok: unknown }).ok === 'boolean'
        ) {
          setApi((json as { ok: boolean }).ok ? '✅ API healthy' : '❌ API not healthy');
        } else {
          setApi('❌ API error: unexpected response');
        }
      } catch (e: unknown) {
        if (e instanceof Error) setApi('❌ API error: ' + e.message);
        else setApi('❌ API error');
      }
    })();
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <h1 className="text-2xl font-bold">{api}</h1>
    </main>
  );
}
