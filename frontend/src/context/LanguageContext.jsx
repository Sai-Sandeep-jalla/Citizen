/* eslint-disable react-refresh/only-export-components */
import { createContext, useState } from 'react';

export const LanguageContext = createContext(null);

const TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard',
    registerComplaint: 'Register Complaint',
    trackComplaint: 'Track Complaint',
    complaintHistory: 'Complaint History',
    feedback: 'Feedback',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    welcome: 'Welcome back',
    totalComplaints: 'Total Complaints',
    pending: 'Pending',
    resolved: 'Resolved',
    inProgress: 'In Progress',
    rejected: 'Rejected',
    closed: 'Closed',
    assigned: 'Assigned',
    latestActivity: 'Latest Activity',
    recentComplaints: 'Recent Complaints',
    quickActions: 'Quick Actions',
    govAnnouncements: 'Government Announcements',
    citizenProfileSummary: 'Citizen Profile Summary',
    notifications: 'Notifications',
    ticketId: 'Ticket ID',
    search: 'Search',
    category: 'Category',
    priority: 'Priority',
    status: 'Status',
    date: 'Date',
    language: 'Language',
    schools: 'Schools',
    village: 'Village',
    revenue: 'Revenue',
    housing: 'Housing',
    land: 'Land',
    others: 'Others',
    anonymousLabel: 'File Complaint Anonymously',
    anonymousDesc: 'Your personal details will not be visible to the resolving officers.',
    submit: 'Submit',
    reset: 'Reset',
    complaintTitle: 'Complaint Title',
    complaintCategory: 'Complaint Category',
    complaintDesc: 'Detailed Description',
    gpsLocation: 'GPS Location',
    fetchLocation: 'Fetch Current GPS',
    address: 'Address',
    landmark: 'Landmark',
    district: 'District',
    state: 'State',
    pincode: 'Pincode',
    searchPlaceholder: 'Search complaints by Ticket ID, mobile or email...',
    timeline: 'Complaint Status Timeline',
    selectRole: 'Select User Role',
    citizenRole: 'Citizen',
    officerRole: 'Department Officer',
    adminRole: 'System Administrator',
    emailOrMobile: 'Email Address / Mobile Number',
    enterEmailOrMobile: 'Enter your registered email or mobile',
    passwordLabel: 'Password',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    signInButton: 'Sign In',
    newCitizen: 'New citizen user?',
    createAccount: 'Create an Account',
    fullName: 'Full Name',
    enterFullName: 'Enter your full name',
    emailLabel: 'Email Address',
    mobileLabel: 'Mobile Number',
    mobilePlaceholder: '10-digit mobile number',
    passwordPlaceholder: 'Choose a strong password',
    stateLabel: 'State',
    districtLabel: 'District',
    pincodeLabel: 'Pincode',
    selectState: 'Select State',
    selectDistrict: 'Select District',
    registerButton: 'Register Account',
    alreadyAccount: 'Already have an account?',
    signInHere: 'Sign In Here'
  },
  hi: {
    dashboard: 'डैशबोर्ड',
    registerComplaint: 'शिकायत दर्ज करें',
    trackComplaint: 'शिकायत ट्रैक करें',
    complaintHistory: 'शिकायत इतिहास',
    feedback: 'प्रतिक्रिया (फीडबैक)',
    profile: 'प्रोफ़ाइल',
    settings: 'सेटिंग्स',
    logout: 'लॉगआउट',
    welcome: 'स्वागत है',
    totalComplaints: 'कुल शिकायतें',
    pending: 'लंबित',
    resolved: 'हल की गई',
    inProgress: 'प्रगति पर है',
    rejected: 'अस्वीकृत',
    closed: 'बंद',
    assigned: 'आवंटित',
    latestActivity: 'नवीनतम गतिविधि',
    recentComplaints: 'हालिया शिकायतें',
    quickActions: 'त्वरित क्रियाएं',
    govAnnouncements: 'सरकारी घोषणाएं',
    citizenProfileSummary: 'नागरिक प्रोफ़ाइल सारांश',
    notifications: 'सूचनाएं',
    ticketId: 'टिकट आईडी',
    search: 'खोजें',
    category: 'श्रेणी',
    priority: 'प्राथमिकता',
    status: 'स्थिति',
    date: 'तारीख',
    language: 'भाषा',
    schools: 'स्कूल (विद्यालय)',
    village: 'ग्राम (पंचायत)',
    revenue: 'राजस्व विभाग',
    housing: 'आवास विकास',
    land: 'भूमि / जमीन',
    others: 'अन्य',
    anonymousLabel: 'गुमनाम रूप से शिकायत दर्ज करें',
    anonymousDesc: 'आपका व्यक्तिगत विवरण हल करने वाले अधिकारियों को दिखाई नहीं देगा।',
    submit: 'जमा करें',
    reset: 'रीसेट करें',
    complaintTitle: 'शिकायत का शीर्षक',
    complaintCategory: 'शिकायत की श्रेणी',
    complaintDesc: 'विस्तृत विवरण',
    gpsLocation: 'जीपीएस स्थान',
    fetchLocation: 'वर्तमान जीपीएस प्राप्त करें',
    address: 'पता',
    landmark: 'सीमाचिह्न',
    district: 'जिला',
    state: 'राज्य',
    pincode: 'पिनकोड',
    searchPlaceholder: 'टिकट आईडी, मोबाइल या ईमेल द्वारा शिकायतें खोजें...',
    timeline: 'शिकायत की स्थिति की समयसीमा',
    selectRole: 'उपयोगकर्ता भूमिका चुनें',
    citizenRole: 'नागरिक',
    officerRole: 'विभाग अधिकारी',
    adminRole: 'सिस्टम प्रशासक',
    emailOrMobile: 'ईमेल पता / मोबाइल नंबर',
    enterEmailOrMobile: 'अपना पंजीकृत ईमेल या मोबाइल दर्ज करें',
    passwordLabel: 'पासवर्ड',
    rememberMe: 'मुझे याद रखें',
    forgotPassword: 'पासवर्ड भूल गए?',
    signInButton: 'लॉग इन करें',
    newCitizen: 'नए नागरिक उपयोगकर्ता?',
    createAccount: 'खाता बनाएं',
    fullName: 'पूरा नाम',
    enterFullName: 'अपना पूरा नाम दर्ज करें',
    emailLabel: 'ईमेल पता',
    mobileLabel: 'मोबाइल नंबर',
    mobilePlaceholder: '10 अंकों का मोबाइल नंबर',
    passwordPlaceholder: 'एक मजबूत पासवर्ड चुनें',
    stateLabel: 'राज्य',
    districtLabel: 'जिला',
    pincodeLabel: 'पिनकोड',
    selectState: 'राज्य चुनें',
    selectDistrict: 'जिला चुनें',
    registerButton: 'खाता पंजीकृत करें',
    alreadyAccount: 'क्या आपके पास पहले से एक खाता है?',
    signInHere: 'यहाँ लॉग इन करें'
  },
  te: {
    dashboard: 'డాష్‌బోర్డ్',
    registerComplaint: 'ఫిర్యాదు నమోదు',
    trackComplaint: 'ఫిర్యాదు ట్రాక్ చేయండి',
    complaintHistory: 'ఫిర్యాదు చరిత్ర',
    feedback: 'అభిప్రాయం (ఫీడ్‌బ్యాక్)',
    profile: 'ప్రొఫైల్',
    settings: 'సెట్టింగ్‌లు',
    logout: 'లాగ్‌అవుట్',
    welcome: 'స్వాగతం',
    totalComplaints: 'మొత్తం ఫిర్యాదులు',
    pending: 'పెండింగ్',
    resolved: 'పరిష్కరించబడింది',
    inProgress: 'పురోగతిలో ఉంది',
    rejected: 'తిరస్కరించబడింది',
    closed: 'మూసివేయబడింది',
    assigned: 'కేటాయించబడింది',
    latestActivity: 'ఇటీవలి కార్యాచరణ',
    recentComplaints: 'ఇటీవలి ఫిర్యాదులు',
    quickActions: 'త్వరిత చర్యలు',
    govAnnouncements: 'ప్రభుత్వ ప్రకటనలు',
    citizenProfileSummary: 'నాగరిక ప్రొఫైల్ సారాంశం',
    notifications: 'నోటిఫికేషన్‌లు',
    ticketId: 'టికెట్ ఐడి',
    search: 'శోధించండి',
    category: 'వర్గం',
    priority: 'ప్రాధాన్యత',
    status: 'స్థితి',
    date: 'తేదీ',
    language: 'భాష',
    schools: 'పాఠశాలలు',
    village: 'గ్రామం (పంచాయితీ)',
    revenue: 'రెవెన్యూ శాఖ',
    housing: 'గృహనిర్మాణం',
    land: 'భూమి / ల్యాండ్',
    others: 'ఇతరములు',
    anonymousLabel: 'గుప్తంగా ఫిర్యాదు చేయండి',
    anonymousDesc: 'మీ వ్యక్తిగత వివరాలు పరిష్కరించే అధికారులకు కనిపించవు.',
    submit: 'సమర్పించండి',
    reset: 'రీసెట్',
    complaintTitle: 'ఫిర్యాదు శీర్షిక',
    complaintCategory: 'ఫిర్యాదు వర్గం',
    complaintDesc: 'వివరణాత్మక సమాచారం',
    gpsLocation: 'GPS స్థానం',
    fetchLocation: 'ప్రస్తుత స్థానాన్ని పొందండి',
    address: 'చిరునామా',
    landmark: 'గుర్తు (ల్యాండ్‌మార్క్)',
    district: 'జిల్లా',
    state: 'రాష్ట్రం',
    pincode: 'పిన్ కోడ్',
    searchPlaceholder: 'టికెట్ ఐడి, మొబైల్ లేదా ఈమెయిల్ ద్వారా వెతకండి...',
    timeline: 'ఫిర్యాదు స్థితి కాలక్రమం',
    selectRole: 'వినియోగదారు పాత్రను ఎంచుకోండి',
    citizenRole: 'నాగరికుడు',
    officerRole: 'అధికారి',
    adminRole: 'అడ్మినిస్ట్రేటర్',
    emailOrMobile: 'ఈమెయిల్ చిరునామా / మొబైల్ సంఖ్య',
    enterEmailOrMobile: 'నమోదిత ఈమెయిల్ లేదా మొబైల్ సంఖ్యను నమోదు చేయండి',
    passwordLabel: 'పాస్‌వర్డ్',
    rememberMe: 'నన్ను గుర్తుంచుకో',
    forgotPassword: 'పాస్‌వర్డ్ మర్చిపోయారా?',
    signInButton: 'లాగిన్ అవ్వండి',
    newCitizen: 'కొత్త వినియోగదారులా?',
    createAccount: 'ఖాతాను సృష్టించండి',
    fullName: 'పూర్తి పేరు',
    enterFullName: 'మీ పూర్తి పేరు నమోదు చేయండి',
    emailLabel: 'ఈమెయిల్ చిరునామా',
    mobileLabel: 'మొబైల్ సంఖ్య',
    mobilePlaceholder: '10 అంకెల మొబైల్ సంఖ్య',
    passwordPlaceholder: 'బలమైన పాస్‌వర్డ్‌ను ఎంచుకోండి',
    stateLabel: 'రాష్ట్రం',
    districtLabel: 'జిల్లా',
    pincodeLabel: 'పిన్ కోడ్',
    selectState: 'రాష్ట్రాన్ని ఎంచుకోండి',
    selectDistrict: 'జిల్లాను ఎంచుకోండి',
    registerButton: 'ఖాతాను నమోదు చేయండి',
    alreadyAccount: 'ఇప్పటికే खाता ఉందా?',
    signInHere: 'ఇక్కడ లాగిన్ అవ్వండి'
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('language_mode') || 'en';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('language_mode', newLang);
  };

  const t = (key) => {
    if (!TRANSLATIONS[lang]) return key;
    return TRANSLATIONS[lang][key] || TRANSLATIONS['en'][key] || key;
  };

  const translateText = async (text, targetLang = 'en', sourceLang = 'auto') => {
    const apiKey = import.meta.env.VITE_TRANSLATE_API_KEY;
    if (!text || text.trim() === '') return '';

    try {
      if (apiKey && apiKey !== 'YOUR_API_KEY') {
        const url = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            q: text,
            target: targetLang,
            source: sourceLang === 'auto' ? undefined : sourceLang
          })
        });
        const data = await res.json();
        if (data?.data?.translations?.[0]?.translatedText) {
          const txt = document.createElement('textarea');
          txt.innerHTML = data.data.translations[0].translatedText;
          return txt.value;
        }
      } else {
        const langPair = sourceLang === 'auto' ? `en|${targetLang}` : `${sourceLang}|${targetLang}`;
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${langPair}`;
        const res = await fetch(url);
        const data = await res.json();
        if (data?.responseData?.translatedText) {
          return data.responseData.translatedText;
        }
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
    return text;
  };

  return (
    <LanguageContext.Provider value={{ lang, changeLanguage, t, translateText }}>
      {children}
    </LanguageContext.Provider>
  );
};

