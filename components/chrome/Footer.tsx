'use client';
import { useApp } from '@/lib/store';
import { Link } from '@/components/ui/Link';
import { Icon } from '@/components/ui/Icon';
import { Logo } from './Logo';
import { NAV_LINKS } from './navLinks';
import { WHATSAPP } from '@/lib/whatsapp';
import { GROUP_TITLES } from '@/lib/catalog';
import { SERVICE_CATEGORIES, CATEGORY_SLUGS } from '@/data/serviceCategories';

export function Footer() {
  const { t, tr } = useApp();
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer hero-grid">
      <div className="footer-aurora" aria-hidden="true" />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div className="footer-grid" style={{ paddingBottom: 'var(--space-12)', borderBottom: '1px solid var(--line)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
            <Logo />
            <p style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: '30ch' }}>{t('foot_tagline')}</p>
            <a href={WHATSAPP} data-action="whatsapp-contact" className="btn btn-wa btn-sm" style={{ alignSelf: 'flex-start' }}>
              <Icon name="MessageCircle" size={16} /> {t('foot_whatsapp')}
            </a>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p className="foot-head">{t('foot_pages')}</p>
            {NAV_LINKS.map((l) => <Link key={l.to} to={l.to} className="foot-link">{t(l.key)}</Link>)}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p className="foot-head">{t('foot_services')}</p>
            {CATEGORY_SLUGS.map((slug) => (
              <Link key={slug} to={'/services/' + slug} className="foot-link">{tr(GROUP_TITLES[SERVICE_CATEGORIES[slug].group])}</Link>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <p className="foot-head">{t('foot_contact')}</p>
            <Link to="/contact" className="foot-link">{t('foot_request')}</Link>
            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--ink-2)' }}>{t('foot_location')}</span>
          </div>
        </div>

        <div style={{ padding: 'var(--space-6) 0 var(--space-10)', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-4)', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ fontSize: 'var(--text-xs)', color: 'var(--ink-3)' }}>© {year} GO AI. {t('foot_rights')}</p>
        </div>
      </div>

      <style>{`
        .footer-grid { display: grid; grid-template-columns: 1.6fr 1fr 1fr 1fr; gap: var(--space-10); }
        .foot-head { font-size: var(--text-xs); font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--ink-3); margin-bottom: 4px; }
        .foot-link { font-size: var(--text-sm); color: var(--ink-2); transition: color 140ms ease; }
        .foot-link:hover { color: var(--brand-ink); }
        @media (max-width: 760px) { .footer-grid { grid-template-columns: 1fr 1fr; gap: var(--space-8); } }
        @media (max-width: 460px) { .footer-grid { grid-template-columns: 1fr; } }
      `}</style>
    </footer>
  );
}
