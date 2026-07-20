import { createContext, useState, useEffect } from "react";
import english from "../locales/en.json";
import { translateObject } from "../services/translationService";

const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'as', label: 'Assamese/অসমীয়া' },
  { code: 'bn', label: 'Bengali/বাংলা' },
<<<<<<< HEAD
=======
  { code: 'brx', label: 'Bodo/बड़ो' },
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c
  { code: 'doi', label: 'Dogri/डोगरी' },
  { code: 'gu', label: 'Gujarati/ગુજરાતી' },
  { code: 'hi', label: 'Hindi/हिंदी' },
  { code: 'kn', label: 'Kannada/ಕನ್ನಡ' },
<<<<<<< HEAD
  { code: 'kok', label: 'Konkani/कोंकणी' },
  { code: 'mai', label: 'Maithili/मैथिली' },
  { code: 'ml', label: 'Malayalam/മലയാളം' },
=======
  { code: 'ks', label: 'Kashmiri/कॉशुर' },
  { code: 'kok', label: 'Konkani/कोंकणी' },
  { code: 'mai', label: 'Maithili/मैथिली' },
  { code: 'ml', label: 'Malayalam/മലയാളം' },
  { code: 'mni', label: 'Manipuri/মৈতৈলোন্' },
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c
  { code: 'mr', label: 'Marathi/मराठी' },
  { code: 'ne', label: 'Nepali/नेपाली' },
  { code: 'or', label: 'Odia/ଓଡ଼ିଆ' },
  { code: 'pa', label: 'Punjabi/ਪੰਜਾਬੀ' },
  { code: 'sa', label: 'Sanskrit/संस्कृतम्' },
<<<<<<< HEAD
=======
  { code: 'sat', label: 'Santali/ᱥᱟᱱᱛᱟᱲᱤ' },
>>>>>>> 82b3a534c20e8b88c3d10f0fc7cbb456e4a3361c
  { code: 'sd', label: 'Sindhi/سنڌي' },
  { code: 'ta', label: 'Tamil/தமிழ்' },
  { code: 'te', label: 'Telugu/తెలుగు' },
  { code: 'ur', label: 'Urdu/اردو' }
];

export const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(
    localStorage.getItem("language") || "en"
  );
  const [translations, setTranslations] = useState(english);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadLanguage(lang);
  }, [lang]);

  const loadLanguage = async (language) => {
    if (language === "en") {
      setTranslations(english);
      return;
    }

    const cacheKey = `gp_translation_${language}`;
    const cacheTimeKey = `gp_translation_time_${language}`;
    const cached = localStorage.getItem(cacheKey);
    const cacheTime = localStorage.getItem(cacheTimeKey);
    const oneDay = 24 * 60 * 60 * 1000;

    // Use cached version if it's less than 1 day old and has the same number of keys
    if (cached && cacheTime && (Date.now() - Number(cacheTime) < oneDay)) {
      try {
        const parsedCache = JSON.parse(cached);
        if (Object.keys(parsedCache).length === Object.keys(english).length) {
          setTranslations(parsedCache);
          return;
        }
      } catch (e) {
        console.error("Failed to parse cached translations", e);
      }
    }

    // Fetch fresh translations from API
    setLoading(true);
    try {
      const translated = await translateObject(english, language);
      setTranslations(translated);
      localStorage.setItem(cacheKey, JSON.stringify(translated));
      localStorage.setItem(cacheTimeKey, String(Date.now()));
    } catch (err) {
      console.error('Translation API error:', err);
      // Fall back to cached if available, otherwise English
      if (cached) {
        setTranslations(JSON.parse(cached));
      } else {
        setTranslations(english);
      }
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = (language) => {
    setLang(language);
    localStorage.setItem("language", language);
  };

  const t = (key) => {
    return translations[key] || english[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, loading, SUPPORTED_LANGUAGES }}>
      {children}
    </LanguageContext.Provider>
  );
};