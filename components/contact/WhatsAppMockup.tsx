'use client';
/* ============================================================
   GO AI — WhatsApp chat mockup (shared device visual).
   Used on /automation (deep-dive) and /contact (hero).
   ============================================================ */
import { useApp } from '@/lib/store';
import { SITE as DATA } from '@/data/content';
import type { Bilingual } from '@/types';

interface ChatMessageData { from: 'user' | 'bot'; text: Bilingual; time?: string; }

function ChatBubble({ msg, tr }: { msg: ChatMessageData; tr: (obj: Bilingual | string | null | undefined) => string }) {
  const isUser = msg.from === 'user';
  return (
    <div style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}>
      <div style={{ maxWidth: '80%', background: isUser ? '#dcf8c6' : '#fff', borderRadius: isUser ? '12px 12px 2px 12px' : '12px 12px 12px 2px', padding: '7px 10px 5px', boxShadow: '0 1px 1px rgba(0,0,0,0.12)' }}>
        <p style={{ fontSize: 12.5, lineHeight: 1.5, color: '#111', margin: 0, whiteSpace: 'pre-line', wordBreak: 'break-word' }}>{tr(msg.text)}</p>
        {msg.time && <p style={{ fontSize: 10, color: '#9aa', textAlign: 'right', margin: '2px 0 0' }}>{msg.time} ✓✓</p>}
      </div>
    </div>
  );
}

export function WhatsAppMockup() {
  const { tr } = useApp();
  return (
    <div style={{ width: 290, background: '#e5ddd5', borderRadius: 22, overflow: 'hidden', boxShadow: 'var(--shadow-lg)', border: '8px solid #0e1411' }}>
      <div style={{ background: '#075e54', padding: '8px 14px 10px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: '#128c7e', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 15, color: '#fff', fontWeight: 800 }}>V</span></div>
        <div><p style={{ fontSize: 13, fontWeight: 700, color: '#fff', margin: 0 }}>Villa Mila</p><p style={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', margin: 0 }}>🤖 GO AI</p></div>
      </div>
      <div style={{ padding: '12px 9px', display: 'flex', flexDirection: 'column', gap: 7, background: '#e5ddd5', maxHeight: 360, overflowY: 'auto' }}>
        {(DATA.chatMessages as ChatMessageData[]).map((m, i) => <ChatBubble key={i} msg={m} tr={tr} />)}
      </div>
      <div style={{ background: '#f0f0f0', padding: '7px 9px', display: 'flex', alignItems: 'center', gap: 7 }}>
        <div style={{ flex: 1, height: 32, background: '#fff', borderRadius: 16, border: '1px solid #ddd' }} />
        <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#075e54' }} />
      </div>
    </div>
  );
}
