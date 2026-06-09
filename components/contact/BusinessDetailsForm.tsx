'use client';
import { useState } from 'react';
import type { ChangeEvent } from 'react';
import { useApp } from '@/lib/store';
import { Icon } from '@/components/ui/Icon';
import { SITE as DATA } from '@/data/content';
import { buildWhatsAppLink } from '@/lib/whatsapp';
import { submitProposal } from '@/app/actions/submit-proposal';
import type { ProposalRequestInput } from '@/types';

type FieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;

function Field({ id, label, type = 'text', placeholder, value, onChange, required, error }: {
  id: string; label: string; type?: string; placeholder?: string;
  value: string; onChange: FieldChange; required?: boolean; error?: string;
}) {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>{label}{required && <span className="req">*</span>}</label>
      <input className="input" id={id} type={type} placeholder={placeholder} value={value} onChange={onChange}
        style={error ? { borderColor: '#dc2626', boxShadow: '0 0 0 3px rgba(220,38,38,0.12)' } : undefined} />
      {error && <span style={{ fontSize: 'var(--text-xs)', color: '#dc2626' }}>{error}</span>}
    </div>
  );
}

export function BusinessDetailsForm({ onDone }: { onDone: (p: ProposalRequestInput) => void }) {
  const { t, lang, items, labelOf } = useApp();
  const [f, setF] = useState({ firstName: '', lastName: '', businessName: '', email: '', phoneWhatsapp: '', businessType: '', location: '', existingWebsiteUrl: '', needsHelp: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState(false);
  const set = (k: keyof typeof f): FieldChange => (e) => setF((p) => ({ ...p, [k]: e.target.value }));

  const buildPayload = (): ProposalRequestInput => ({
    language: lang,
    selectedProposalItems: items.map((id) => ({ id, label: labelOf(id) })),
    firstName: f.firstName.trim(), lastName: f.lastName.trim(), businessName: f.businessName.trim(),
    email: f.email.trim(), phoneWhatsapp: f.phoneWhatsapp.trim(), businessType: f.businessType,
    location: f.location.trim(), existingWebsiteUrl: f.existingWebsiteUrl.trim(),
    needsHelp: f.needsHelp.trim(), message: f.message.trim(),
  });

  const validate = () => {
    const er: Record<string, string> = {};
    if (!f.firstName.trim()) er.firstName = t('v_name');
    if (!f.businessName.trim()) er.businessName = t('v_business');
    if (!f.email.trim() && !f.phoneWhatsapp.trim()) er.contact = t('v_contact');
    if (items.length === 0) er.service = t('v_service');
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(false);
    if (!validate()) {
      const el = document.querySelector('[data-err="1"]');
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'smooth' });
      return;
    }
    const payload = buildPayload();
    setSubmitting(true);
    try {
      const res = await submitProposal(payload);
      if (res.ok) onDone(payload);
      else setServerError(true);
    } catch {
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  };

  // WhatsApp fallback (prefilled) if the server submission fails.
  const waText = (() => {
    const services = items.map((id) => labelOf(id)).join(', ');
    const intro = lang === 'GR' ? 'Γεια σας! Θα ήθελα μια πρόταση.' : "Hi! I'd like a proposal.";
    return `${intro}${f.businessName ? ` (${f.businessName.trim()})` : ''}${services ? ` — ${services}` : ''}`;
  })();

  return (
    <form onSubmit={submit} data-action="send-proposal-request" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <h3 style={{ fontSize: 'var(--text-lg)', fontWeight: 800, color: 'var(--ink)', letterSpacing: '-0.02em' }}>{t('f_details_title')}</h3>
      <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-5)' }}>
        <div data-err={errors.firstName ? '1' : undefined}><Field id="firstName" label={t('f_first')} placeholder={t('f_first_ph')} value={f.firstName} onChange={set('firstName')} required error={errors.firstName} /></div>
        <Field id="lastName" label={t('f_last')} placeholder={t('f_last_ph')} value={f.lastName} onChange={set('lastName')} />
        <div data-err={errors.businessName ? '1' : undefined}><Field id="businessName" label={t('f_business')} placeholder={t('f_business_ph')} value={f.businessName} onChange={set('businessName')} required error={errors.businessName} /></div>
        <div className="field">
          <label className="label" htmlFor="businessType">{t('f_btype')}</label>
          <select className="input" id="businessType" value={f.businessType} onChange={set('businessType')}>
            <option value="">{t('f_btype_ph')}</option>
            {DATA.businessTypes.map((b, i) => <option key={i} value={b.EN}>{b[lang]}</option>)}
          </select>
        </div>
        <div data-err={errors.contact ? '1' : undefined}><Field id="email" label={t('f_email')} type="email" placeholder={t('f_email_ph')} value={f.email} onChange={set('email')} error={errors.contact} /></div>
        <Field id="phoneWhatsapp" label={t('f_phone')} type="tel" placeholder={t('f_phone_ph')} value={f.phoneWhatsapp} onChange={set('phoneWhatsapp')} error={errors.contact ? ' ' : undefined} />
        <Field id="location" label={t('f_location')} placeholder={t('f_location_ph')} value={f.location} onChange={set('location')} />
        <Field id="existingWebsiteUrl" label={t('f_website')} placeholder={t('f_website_ph')} value={f.existingWebsiteUrl} onChange={set('existingWebsiteUrl')} />
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <label className="label" htmlFor="needsHelp">{t('f_needs')}</label>
          <input className="input" id="needsHelp" placeholder={t('f_needs_ph')} value={f.needsHelp} onChange={set('needsHelp')} />
        </div>
        <div className="field" style={{ gridColumn: '1 / -1' }}>
          <label className="label" htmlFor="message">{t('f_message')}</label>
          <textarea className="input" id="message" rows={4} placeholder={t('f_message_ph')} value={f.message} onChange={set('message')} style={{ minHeight: 110 }} />
        </div>
      </div>

      {errors.service && <span data-err="1" style={{ fontSize: 'var(--text-sm)', color: '#dc2626', display: 'flex', alignItems: 'center', gap: 6 }}><Icon name="AlertCircle" size={14} /> {errors.service}</span>}
      {(errors.firstName || errors.businessName || errors.contact || errors.service) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 14px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 'var(--radius-md)', color: '#b91c1c' }}>
          <Icon name="AlertCircle" size={16} /> <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>{t('v_fix')}</span>
        </div>
      )}

      {serverError && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '14px 16px', background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.25)', borderRadius: 'var(--radius-md)', color: '#b91c1c' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 'var(--text-sm)', fontWeight: 600 }}><Icon name="AlertCircle" size={16} /> {lang === 'GR' ? 'Κάτι πήγε στραβά με την αποστολή. Δοκιμάστε ξανά ή στείλτε μας μήνυμα στο WhatsApp.' : 'Something went wrong sending your request. Please try again or message us on WhatsApp.'}</span>
          <a href={buildWhatsAppLink(waText)} data-action="whatsapp-contact" className="btn btn-wa btn-sm" style={{ alignSelf: 'flex-start' }}><Icon name="MessageCircle" size={16} /> {t('f_whatsapp_btn')}</a>
        </div>
      )}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center' }}>
        <button type="submit" disabled={submitting} data-action="send-proposal-request" className="btn btn-primary btn-lg" style={{ opacity: submitting ? 0.7 : 1, cursor: submitting ? 'wait' : 'pointer' }}>
          <Icon name="Send" size={18} /> {submitting ? (lang === 'GR' ? 'Αποστολή…' : 'Sending…') : t('f_submit')}
        </button>
        <a href={buildWhatsAppLink(waText)} data-action="whatsapp-contact" className="btn btn-wa btn-lg"><Icon name="MessageCircle" size={18} /> {t('f_whatsapp_btn')}</a>
      </div>
      <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)', lineHeight: 1.6 }}>{t('submit_support')}</p>

      <style>{`@media (max-width: 620px){ .form-grid { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  );
}
