'use client';
import { useEffect, useState } from 'react';

export default function Home() {
  const [api, setApi] = useState('Checking API…');

  useEffect(() => {
    (async () => {
      try {
        const base = process.env.NEXT_PUBLIC_API_URL ?? '';
        const res = await fetch(`${base}/health`);
        const json = await res.json();
        setApi(json?.ok ? '✅ API healthy' : '❌ API not healthy');
      } catch (e) {
        setApi('❌ API error');
      }
    })();
  }, []);

  return (
    <main style={{display:'flex',minHeight:'100vh',alignItems:'center',justifyContent:'center'}}>
      <h1 style={{fontSize:24,fontWeight:700}}>{api}</h1>
    </main>
  );
}
