import { Shield, Globe, CheckCircle } from 'lucide-react';
import { useLanguage } from '../hooks/useLanguage';

export const AuthLayout = ({ children }) => {
  const { lang, changeLanguage, t, SUPPORTED_LANGUAGES } = useLanguage();

  return (
    <div className="auth-page">
      {/* Language Selector – top-right */}
      <div className="absolute top-4 right-4 z-30">
        <div
          className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold shadow-sm cursor-pointer"
          style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.20)', color: '#fff' }}
        >
          <Globe className="w-3.5 h-3.5" style={{ color: '#F97316' }} />
          <select
            value={lang}
            onChange={(e) => changeLanguage(e.target.value)}
            className="bg-transparent border-0 text-xs font-bold text-white focus:ring-0 focus:outline-none cursor-pointer"
            style={{ colorScheme: 'dark' }}
          >
            {SUPPORTED_LANGUAGES.map((l) => (
              <option key={l.code} value={l.code} className="text-gray-900 bg-white">
                {l.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Layout: left info panel (desktop) + right card */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex items-center gap-10 px-4">

        {/* ── Left Info Panel (hidden on mobile) ─────────────────── */}
        <div className="hidden lg:flex flex-col flex-1 text-white space-y-7">
          {/* Brand mark */}
          <div className="flex items-center space-x-3">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center font-extrabold text-sm shadow-lg"
              style={{ background: '#F97316' }}
            >
              GP
            </div>
            <div>
              <p className="text-xs font-black tracking-widest uppercase text-orange-300">{t('GovtPortal')}</p>
              <p className="text-[10px] text-blue-200 font-semibold tracking-wide">{t('govtOfIndia')}</p>
            </div>
          </div>

          {/* Headline */}
          <div className="space-y-3">
            <h1 className="text-3xl font-extrabold leading-tight text-white">
              {t('citizenGrievance')}<br />
              <span style={{ color: '#F97316' }}>{t('managementPortal')}</span>
            </h1>
            <p className="text-sm text-blue-200 leading-relaxed max-w-sm">
              {t('authLayoutDesc')}
            </p>
          </div>

          {/* Feature checklist */}
          <ul className="space-y-3">
            {[
              'feature1',
              'feature2',
              'feature3',
              'feature4',
            ].map((f, i) => (
              <li key={i} className="flex items-start space-x-2.5">
                <CheckCircle className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#F97316' }} />
                <span className="text-sm text-blue-100 font-medium">{t(f)}</span>
              </li>
            ))}
          </ul>

          {/* Bottom label */}
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping" />
            <span className="text-xs text-green-300 font-bold tracking-wide uppercase">{t('liveSlaServiceOnline')}</span>
          </div>
        </div>

        {/* ── Auth Card ───────────────────────────────────────────── */}
        <div className="auth-card w-full lg:max-w-sm">

          {/* Logo badge (mobile) */}
          <div className="lg:hidden flex items-center space-x-2.5 mb-6">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center font-extrabold text-xs shadow-md text-white"
              style={{ background: '#F97316' }}
            >
              GP
            </div>
            <div>
              <p className="text-[10px] font-black tracking-widest uppercase" style={{ color: '#0B1E47' }}>{t('GovtPortal')}</p>
              <p className="text-[9px] text-gray-400 font-semibold">{t('govtOfIndia')}</p>
            </div>
          </div>

          {/* Desktop logo */}
          <div className="hidden lg:block mb-6">
            <div className="auth-logo-badge">
              <Shield className="w-6 h-6 fill-white/10" />
            </div>
            <h2
              className="text-center text-xl font-extrabold uppercase tracking-wide"
              style={{ color: '#0B1E47' }}
            >
              {t('citizenGrievancePortal')}
            </h2>
            <p className="text-center text-xs font-semibold mt-1" style={{ color: '#1D4ED8' }}>
              {t('govtOfIndiaHindi')}
            </p>
          </div>

          {/* Divider line */}
          <div
            className="h-px mb-6"
            style={{ background: 'linear-gradient(90deg, transparent, #E2E8F0, transparent)' }}
          />

          {/* Form slot */}
          <div className="space-y-5">
            {children}
          </div>

          {/* Footer note */}
          <p className="mt-6 text-center text-[10px] text-gray-400 font-medium">
            🔒 {t('securityNote')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
