import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import baselineHouses from '../data/baselineData.js';

const AppContext = createContext();

const translations = {
  en: {
    appName: 'Household Energy Tracker',
    brandTagline: 'Smart, simple home energy insights',
    navBudget: 'Budget',
    navAppliances: 'Appliances',
    navAnalytics: 'Analytics',
    navChatbot: 'Chatbot',
    navLogin: 'Login',
    languageLabel: 'Language',
    loginHeading: 'Secure Login',
    emailLabel: 'Email',
    mobileLabel: 'Mobile Number',
    passwordLabel: 'Password',
    emailPlaceholder: 'hello@example.com',
    mobilePlaceholder: '+91 98765 43210',
    passwordPlaceholder: '••••••••',
    forgotPassword: 'Forgot Password?',
    continueGoogle: 'Continue with Google',
    targetBillHeading: 'Set Your Monthly Energy Budget',
    targetBillHint: 'Enter the electricity bill amount you want to stay below.',
    targetBillPlaceholder: 'Monthly target (₹)',
    nextButton: 'Next',
    previousButton: 'Previous',
    appliancesHeading: 'Welcome to Household Energy Consumption',
    appliancePageDescription: 'Customize appliances, wattages, and room usage hours for your household.',
    wattageLabel: 'Wattage (W)',
    wattageDefault: 'W default',
    addRoom: 'Add Room',
    usageHours: 'Usage Hours',
    totalBillLabel: 'Total Estimated Bill',
    baselineLabel: 'Benchmark Compared to 15-House Average',
    comparedToTarget: 'Compared to your target',
    recommendationsHeading: 'Smart Energy Recommendations',
    chatbotHeading: 'Energy Assistant',
    talkPrompt: 'Ask me for ideas to save more or optimize usage.',
    currentBill: 'Current Bill',
    targetValue: 'Target',
    overBudget: 'Above budget',
    underBudget: 'Under budget',
    languageEnglish: 'English',
    languageTelugu: 'తెలుగు',
    languageHindi: 'हिन्दी',
    welcome: 'Welcome Back',
    signIn: 'Sign in to continue',
    loginButton: 'Login',
    chartLabel: 'Energy usage breakdown',
    baselineComparison: 'Baseline comparison',
    dynamicTip: 'Dynamic tip',
    currentPlanText: 'Current plan is ₹{total} while target is ₹{target}.',
    resetDefaults: 'Reset Appliance Defaults',
    sendButton: 'Send',
    googleSignInFailed: 'Google sign-in failed. Please try again.',
    authNotConfigured: 'Authentication service not configured.',
    loading: 'Loading...',
    chatWelcome: 'Hello! I am your energy assistant. Ask me how to save more on your bill.',
    chatReplyOverBudget: 'Your bill is above target, so keep cooling to essential rooms only and consider switching off lights when not needed.',
    chatReplyNearTarget: 'You are doing well. Try a few small habits like unplugging idle devices to make the next month even better.',
    chatReplyEfficient: 'Excellent! Your usage is efficient today—keep running heavy loads in shorter bursts and enjoy the savings.',
    recTip1: 'Reduce AC runtime by 1-2 hours and close gaps around windows.',
    recTip2: 'Swap older lights for LEDs and switch them off in unused rooms.',
    recTip3: 'Use fans at medium speed with ceiling fan timers to trim peak usage.',
    recTip4: 'Unplug chargers and idle electronics when not in use.',
    signUpHeading: 'Create Account',
    signUpButton: 'Sign Up',
    toggleSignUp: "Don't have an account? Sign Up",
    toggleLogin: 'Already have an account? Login',
    fullNameLabel: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    invalidEmail: 'Please enter a valid email address.',
    invalidFullName: 'Please enter your full name.',
    weakPassword: 'Password must be at least 6 characters.',
    logoutButton: 'Logout'
  },
  te: {
    appName: 'హౌస్‌హోల్డ్ ఎనర్జీ ట్రాకర్',
    brandTagline: 'స్మార్ట్, సులభమైన హోం ఎనర్జీ సూచనలు',
    navBudget: 'బడ్జెట్',
    navAppliances: 'ఉపకరణాలు',
    navAnalytics: 'విశ్లేషణ',
    navChatbot: 'చాట్‌బాట్',
    languageLabel: 'భాష',
    loginHeading: 'సురక్షిత లాగిన్',
    emailLabel: 'ఇమెయిల్',
    mobileLabel: 'మొబైల్ నంబర్',
    passwordLabel: 'పాస్వర్డ్',
    emailPlaceholder: 'hello@example.com',
    mobilePlaceholder: '+91 98765 43210',
    passwordPlaceholder: '••••••••',
    forgotPassword: 'పాస్వర్డ్ మరిచారు?',
    continueGoogle: 'గూగుల్‌తో కొనసాగించండి',
    targetBillHeading: 'మీ నెలవారీ ఎనర్జీ బడ్జెట్‌ను సెట్ చేసుకోండి',
    targetBillHint: 'మీరు దిగువlda ఉండాలనుకునే విద్యుత్ బిల్ మొత్తాన్ని నమోదు చేయండి.',
    targetBillPlaceholder: 'నెలవారీ లక్ష్యం (₹)',
    nextButton: 'తరువాత',
    previousButton: 'మునుపటి',
    appliancesHeading: 'హౌస్‌హోల్డ్ ఎనర్జీ వినియోగానికి స్వాగతం',
    appliancePageDescription: 'మీ కుటుంబంలోని ఉపకరణాలను, వాటాలేజ్‌లను మరియు గది వినియోగ గంటలను అనుకూలపరచండి.',
    wattageLabel: 'వాటేజ్ (W)',
    wattageDefault: 'W డిఫాల్ట్',
    addRoom: 'రూమ్ జోడించు',
    usageHours: 'వినియోగ సమయాలు',
    totalBillLabel: 'మొత్తం అంచనా బిల్',
    baselineLabel: '15 ఇళ్ల సగటు తో తులనాత్మక బెంచ్మార్క్',
    comparedToTarget: 'మీ లక్ష్యంతో పోల్చినప్పుడు',
    recommendationsHeading: 'స్మార్ట్ ఎనర్జీ సూచనలు',
    chatbotHeading: 'ఎనర్జీ సహాయకుడు',
    talkPrompt: 'మరింత ఆదా చేయడానికి లేదా వినియోగాన్ని ఆప్టిమైజ్ చేయడానికి అడగండి.',
    currentBill: 'ప్రస్తుత బిల్',
    targetValue: 'లక్ష్యం',
    overBudget: 'బడ్జెట్‌కు మించి',
    underBudget: 'బడ్జెట్ కింద',
    languageEnglish: 'English',
    languageTelugu: 'తెలుగు',
    languageHindi: 'हिन्दी',
    welcome: 'మళ్లీ సుస్వాగతం',
    signIn: 'కొనసాగడానికి సైన్ ఇన్ చేయండి',
    loginButton: 'లాగిన్',
    chartLabel: 'ఎనర్జీ వినియోగ విభజన',
    baselineComparison: 'బేస్‌లైన్ పోలిక',
    dynamicTip: 'డైనమిక్ టిప్',
    currentPlanText: 'ప్రస్తుత ప్లాన్ ₹{total} మరియు లక్ష్యం ₹{target}.',
    resetDefaults: 'ఉపకరణాల ఆరోహణను తిరిగి సెట్ చేయండి',
    sendButton: 'పంపండి',
    googleSignInFailed: 'గూగుల్ సైన్‑ఇన్ విఫలమైంది. దయచేసి మళ్ళీ ప్రయత్నించండి.',
    chatWelcome: 'హలో! నేను మీ ఎనర్జీ సహాయకుడిని. మీ బిల్లుపై మరింత పొదుపు కోసం నన్ను అడగండి.',
    chatReplyOverBudget: 'మీ బిల్ లక్ష్యానికి మించి ఉంది, కాబట్టి అనవసర గదులు మాత్రమే చల్లదనం చేయండి మరియు అవసరం లేని సమయంలో లైట్లు ఆపండి.',
    chatReplyNearTarget: 'మీరు బాగా చేస్తున్నారు. మరింత బాగా కోల్పోకుండా ఫాలోని యంత్రాలను అన్‌ప్లగ్ చేయడం వంటి చిన్న సూచనలు ప్రయత్నించండి.',
    chatReplyEfficient: 'అద్భుతమే! మీ వినియోగం ఈ రోజు సమర్థవంతంగా ఉంది—భారీ లోడ్లను చిన్న వ్యవధులలో నడిపి ఆదా‌ను ఆస్వాదించండి.',
    recTip1: 'AC వినియోగాన్ని 1-2 గంటల సంప్రదాయంగా తగ్గించండి మరియు విండోల చుట్టూ గ్యాపులు మూసివేయండి.',
    recTip2: 'పాత లైట్లను LEDలకు మార్చండి మరియు ఉపయోగంలో లేని గదుల్లో వాటిని ఆపండి.',
    recTip3: 'ఫ్యాన్‌లను మధ్యస్థ వేల్ మీద వాడండి మరియు టైమర్లను వినియోగించండి.',
    recTip4: 'చార్జర్లను మరియు బయటి పరికరాలను ఉపయోగంలో లేని సమయంలో అన్‌ప్లగ్ చేయండి.',
    signUpHeading: 'ఖాతాను సృష్టించండి',
    signUpButton: 'సైన్ అప్',
    toggleSignUp: 'ఖాతా లేదా? సైన్ అప్',
    toggleLogin: 'ఇప్పటికే ఖాతా ఉందా? లాగిన్',
    fullNameLabel: 'పూర్తి పేరు',
    fullNamePlaceholder: 'మీ పూర్తి పేరును నమోదు చేయండి',
    invalidEmail: 'దయచేసి సరైన ఇమెయిల్ చిరునామాను నమోదు చేయండి.',
    invalidFullName: 'దయచేసి మీ పూర్తి పేరును నమోదు చేయండి.',
    weakPassword: 'పాస్‌వర్డ్ కనీసం 6 అక్షరాలు ఉండాలి.',
    logoutButton: 'లాగౌట్'
  },
  hi: {
    appName: 'हाउसहोल्ड एनर्जी ट्रैकर',
    brandTagline: 'स्मार्ट, सरल घर ऊर्जा अंतर्दृष्टि',
    navBudget: 'बजट',
    navAppliances: 'उपकरण',
    navAnalytics: 'एनालिटिक्स',
    navChatbot: 'चैटबोट',
    languageLabel: 'भाषा',
    loginHeading: 'सिक्योर लॉगिन',
    emailLabel: 'ईमेल',
    mobileLabel: 'मोबाइल नंबर',
    passwordLabel: 'पासवर्ड',
    emailPlaceholder: 'hello@example.com',
    mobilePlaceholder: '+91 98765 43210',
    passwordPlaceholder: '••••••••',
    forgotPassword: 'पासवर्ड भूल गए?',
    continueGoogle: 'Google के साथ जारी रखें',
    targetBillHeading: 'अपना मासिक ऊर्जा बजट सेट करें',
    targetBillHint: 'वह विद्युत बिल राशि दर्ज करें जिसके नीचे आप रहना चाहते हैं।',
    targetBillPlaceholder: 'मासिक लक्ष्य (₹)',
    nextButton: 'आगे',
    previousButton: 'पीछे',
    appliancesHeading: 'हाउसहोल्ड ऊर्जा खपत में आपका स्वागत है',
    appliancePageDescription: 'अपने घर के उपकरणों, वॉटेज और उपयोग घंटे को अनुकूलित करें।',
    wattageLabel: 'वॉटेज (W)',
    wattageDefault: 'W डिफॉल्ट',
    addRoom: 'रूम जोड़ें',
    usageHours: 'उपयोग घंटे',
    totalBillLabel: 'कुल अनुमानित बिल',
    baselineLabel: '15-हाउस औसत के मुकाबले बेंचमार्क',
    comparedToTarget: 'आपके लक्ष्य की तुलना में',
    recommendationsHeading: 'स्मार्ट ऊर्जा सिफारिशें',
    chatbotHeading: 'ऊर्जा सहायक',
    talkPrompt: 'अधिक बचत या उपयोग को अनुकूलित करने के लिए मुझसे पूछें।',
    currentBill: 'वर्तमान बिल',
    targetValue: 'लक्ष्य',
    overBudget: 'बजट से ऊपर',
    underBudget: 'बजट के नीचे',
    languageEnglish: 'English',
    languageTelugu: 'తెలుగు',
    languageHindi: 'हिन्दी',
    welcome: 'फिर से स्वागत है',
    signIn: 'जारी रखने के लिए साइन इन करें',
    loginButton: 'लॉगिन',
    chartLabel: 'ऊर्जा उपयोग ब्रेकडाउन',
    baselineComparison: 'बेसलाइन तुलना',
    dynamicTip: 'डायनेमिक टिप',
    currentPlanText: 'वर्तमान योजना ₹{total} है जबकि लक्ष्य ₹{target} है।',
    resetDefaults: 'उपकरण डिफॉल्ट रीसेट करें',
    sendButton: 'भेजें',
    googleSignInFailed: 'Google साइन-इन विफल हुआ। कृपया पुन: प्रयास करें।',
    chatReplyOverBudget: 'आपका बिल लक्ष्य से ऊपर है, इसलिए केवल आवश्यक कमरों को ठंडा रखें और अनावश्यक समय में लाइट बंद करें।',
    chatReplyNearTarget: 'आप अच्छा कर रहे हैं। कुछ छोटे आदतें आज़माएँ जैसे निष्क्रिय डिवाइस अनप्लग करना ताकि अगला महीना और बेहतर हो।',
    chatWelcome: 'नमस्ते! मैं आपका ऊर्जा सहायक हूं। अधिक बचत के लिए मुझसे पूछें।',
    chatReplyEfficient: 'उत्कृष्ट! आपका उपयोग आज कुशल है—भारी लोड को छोटी अवधि में चलाएँ और बचत का आनंद लें।',
    recTip1: 'AC उपयोग को 1-2 घंटे कम करें और खिड़कियों के आस-पास के गैप बंद करें।',
    recTip2: 'पुरानी लाइट्स को LED से बदलें और अनावश्यक कमरे में बंद करें।',
    recTip3: 'फैंस को मध्यम गति पर चलाएँ और समय नियंत्रणों का उपयोग करें।',
    recTip4: 'चार्जर्स और निष्क्रिय उपकरणों को उपयोग में नहीं होने पर अनप्लग करें।',
    signUpHeading: 'खाता बनाएं',
    signUpButton: 'साइन अप',
    toggleSignUp: 'खाता नहीं है? साइन अप',
    toggleLogin: 'पहले से खाता है? लॉगिन',
    fullNameLabel: 'पूरा नाम',
    fullNamePlaceholder: 'अपना पूरा नाम दर्ज करें',
    invalidEmail: 'कृपया एक वैध ईमेल पता दर्ज करें।',
    invalidFullName: 'कृपया अपना पूरा नाम दर्ज करें।',
    weakPassword: 'पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।',
    logoutButton: 'लॉगआउट'
  }
};

const defaultAppliances = [
  {
    id: 'ac',
    name: 'AC',
    icon: '❄️',
    defaultWattage: 1500,
    wattage: 1500,
    rooms: [{ id: 'room-1', label: 'Room 1', hours: 5 }]
  },
  {
    id: 'refrigerator',
    name: 'Refrigerator',
    icon: '🧊',
    defaultWattage: 200,
    wattage: 200,
    rooms: [{ id: 'room-1', label: 'Kitchen', hours: 24 }]
  },
  {
    id: 'fan',
    name: 'Fan',
    icon: '🌀',
    defaultWattage: 80,
    wattage: 80,
    rooms: [{ id: 'room-1', label: 'Room 1', hours: 8 }]
  },
  {
    id: 'lights',
    name: 'Lights',
    icon: '💡',
    defaultWattage: 60,
    wattage: 60,
    rooms: [{ id: 'room-1', label: 'Room 1', hours: 6 }]
  },
  {
    id: 'laptop',
    name: 'Laptop',
    icon: '💻',
    defaultWattage: 65,
    wattage: 65,
    rooms: [{ id: 'room-1', label: 'Desk', hours: 5 }]
  },
  {
    id: 'tv',
    name: 'TV',
    icon: '📺',
    defaultWattage: 100,
    wattage: 100,
    rooms: [{ id: 'tv-room-1', label: 'Room 1', hours: 4 }]
  },
  {
    id: 'geyser',
    name: 'Geyser',
    icon: '♨️',
    defaultWattage: 2000,
    wattage: 2000,
    rooms: [{ id: 'geyser-room-1', label: 'Bathroom', hours: 1 }]
  },
  {
    id: 'water-purifier',
    name: 'Water Purifier',
    icon: '🚰',
    defaultWattage: 40,
    wattage: 40,
    rooms: [{ id: 'water-purifier-room-1', label: 'Kitchen', hours: 2 }]
  }
];

const energyCostPerUnit = 15;

const computeHouseAverage = (houses) => {
  const average = {
    febBill: 0,
    marBill: 0,
    aprBill: 0,
    acUsageHours: 0,
    fanUsageHours: 0,
    heaterUsageHours: 0,
    houseCount: houses.length
  };

  houses.forEach((house) => {
    average.febBill += house.febBill;
    average.marBill += house.marBill;
    average.aprBill += house.aprBill;
    average.acUsageHours += house.acUsageHours;
    average.fanUsageHours += house.fanUsageHours;
    average.heaterUsageHours += house.heaterUsageHours;
  });

  return {
    febBill: average.febBill / average.houseCount,
    marBill: average.marBill / average.houseCount,
    aprBill: average.aprBill / average.houseCount,
    acUsageHours: average.acUsageHours / average.houseCount,
    fanUsageHours: average.fanUsageHours / average.houseCount,
    heaterUsageHours: average.heaterUsageHours / average.houseCount,
    houseCount: average.houseCount
  };
};

const keywordsDb = {
  en: [
    { keywords: ['bill', 'cost', 'reduce', 'save', 'budget', 'expensive', 'high', 'money'], response: 'To lower your bill, identify your highest-wattage appliances like ACs or geysers and reduce their runtime by 1 hour daily. Unplug standby electronics as they draw idle power.' },
    { keywords: ['ac', 'cooling', 'air conditioning', 'aircon', 'temp', 'temperature'], response: 'Keep your AC set to 24-26°C. Every degree higher can save up to 6% of the cooling electricity. Clean filters monthly for optimal efficiency.' },
    { keywords: ['fan', 'ceiling fan', 'cooler'], response: 'Ceiling fans are highly efficient and consume only 30-80W. Run fans at medium speed (level 3 or 4) and turn them off when leaving the room.' },
    { keywords: ['light', 'led', 'bulb', 'lighting', 'tube', 'tubelight'], response: 'Replace traditional incandescent bulbs with energy-efficient LED bulbs, which use up to 80% less energy. Always turn off lights when leaving empty rooms.' },
    { keywords: ['fridge', 'refrigerator', 'freezer'], response: 'Ensure your refrigerator is kept at 3-5°C and the freezer at -18°C. Keep it at least 2 inches away from the wall for proper ventilation.' },
    { keywords: ['geyser', 'heater', 'hot water', 'water heater', 'bath'], response: 'Limit geyser usage to 15-20 minutes and set the thermostat to 50-60°C instead of the maximum. Use low-flow showerheads to reduce hot water demand.' },
    { keywords: ['laptop', 'computer', 'desk', 'tv', 'television'], response: 'Enable sleep mode on your laptop and turn off your TV completely rather than leaving it in standby mode. Standby power can account for up to 10% of your bill.' },
    { keywords: ['cooking', 'kitchen', 'microwave', 'oven', 'induction', 'chimney'], response: 'Use microwave ovens or induction cooktops as they are more energy-efficient than traditional electric coils. Always cover pots while cooking to retain heat.' },
    { keywords: ['washing', 'laundry', 'dryer', 'wash'], response: 'Only run washing machines with full loads and use cold water cycles, which saves up to 90% of the washing energy. Air-dry clothes instead of using the electric dryer.' },
    { keywords: ['solar', 'green', 'renewable'], response: 'Installing solar panels can drastically cut or eliminate your grid electricity bills. Government subsidies are also available to make residential solar setup affordable.' },
    { keywords: ['unplug', 'standby', 'charger', 'idle', 'phantom'], response: 'Unplug chargers and appliances when not in use. Even when turned off, plugged-in devices draw "phantom load" which contributes to your monthly energy bill.' },
    { keywords: ['hello', 'hi', 'hey', 'help', 'who are you'], response: 'Hello! I am your Smart Energy Saving Assistant. Ask me how to reduce your electricity bill, optimize appliance usage, or save energy.' }
  ],
  te: [
    { keywords: ['బిల్', 'ఖర్చు', 'తగ్గించ', 'ఆదా', 'బడ్జెట్', 'డబ్బు'], response: 'మీ బిల్లును తగ్గించడానికి, AC లేదా గీజర్ వంటి ఎక్కువ వాటేజ్ ఉన్న పరికరాల వాడకాన్ని రోజుకు 1 గంట తగ్గించండి. ప్లగ్‌లను తీసివేయండి.' },
    { keywords: ['ac', 'ఏసి', 'కూలింగ్', 'ఉష్ణోగ్రత'], response: 'మీ AC ని 24-26°C వద్ద ఉంచండి. ప్రతి డిగ్రీ పెంచడం ద్వారా 6% వరకు విద్యుత్తును ఆదా చేయవచ్చు. ఫిల్టర్లను క్రమం తప్పకుండా శుభ్రం చేయండి.' },
    { keywords: ['ఫ్యాన్', 'ఫ్యాన్లు', 'కూలర్'], response: 'సీలింగ్ ఫ్యాన్లు చాలా సమర్థవంతమైనవి, 30-80W మాత్రమే వినియోగిస్తాయి. ఫ్యాన్లను మధ్యస్థ వేగంతో నడపండి మరియు గది నుండి వెళ్ళేటప్పుడు వాటిని ఆపివేయండి.' },
    { keywords: ['లైట్', 'లైట్లు', 'బల్బ్', 'led'], response: 'పాత బల్బులను ఎల్‌ఈడీ (LED) బల్బులతో మార్చండి, ఇవి 80% తక్కువ విద్యుత్తును వాడుకుంటాయి. ఖాళీ గదుల్లో లైట్లను ఆపివేయడం మర్చిపోవద్దు.' },
    { keywords: ['ఫ్రిజ్', 'రిఫ్రిజిరేటర్'], response: 'రిఫ్రిజిరేటర్ 3-5°C మరియు ఫ్రీజర్ -18°C వద్ద ఉండేలా చూసుకోండి. సరైన వెంటిలేషన్ కోసం గోడ నుండి కనీసం 2 అంగుళాల దూరంలో ఉంచండి.' },
    { keywords: ['గీజర్', 'హీటర్', 'వేడి నీరు'], response: 'గీజర్ వాడకాన్ని 15-20 నిమిషాలకు పరిమితం చేయండి మరియు థర్మోస్టాట్‌ను 50-60°C కి సెట్ చేయండి. వేడి నీటి వినియోగాన్ని తగ్గించండి.' },
    { keywords: ['ల్యాప్‌టాప్', 'కంప్యూటర్', 'టీవీ'], response: 'ల్యాప్‌టాప్‌ను స్లీప్ మోడ్‌లో ఉంచండి మరియు టీవీని స్టాండ్‌బైలో కాకుండా పూర్తిగా ఆపివేయండి. స్టాండ్‌బై పవర్ మీ బిల్లును పెంచుతుంది.' },
    { keywords: ['వంట', 'కిచెన్', 'ఓవెన్', 'ఇండక్షన్'], response: 'వంట చేసేటప్పుడు గిన్నెలపై మూత పెట్టండి, ఇది వేడిని నిలిపి ఉంచి వంటను వేగవంతం చేస్తుంది. ఇండక్షన్ వాడకం మంచిది.' },
    { keywords: ['వాషింగ్', 'బట్టలు', 'డ్రైయర్'], response: 'వాషింగ్ మెషీన్లను పూర్తి లోడ్‌తో మాత్రమే రన్ చేయండి మరియు చల్లని నీటిని ఉపయోగించండి. బట్టలను సహజంగా ఎండబెట్టండి.' },
    { keywords: ['సోలార్', 'సౌర'], response: 'సోలార్ ప్యానెల్స్ అమర్చడం ద్వారా మీ విద్యుత్ బిల్లులను పూర్తిగా తగ్గించుకోవచ్చు. ప్రభుత్వ సబ్సిడీలు కూడా అందుబాటులో ఉన్నాయి.' },
    { keywords: ['ప్లగ్', 'చార్జర్'], response: 'వాడనప్పుడు చార్జర్లు మరియు ఇతర పరికరాల ప్లగ్‌లను తీసివేయండి. స్విచ్ ఆఫ్ చేసినా, ప్లగ్ ఉంటే అవి కొద్దిగా కరెంట్ లాగుతాయి.' },
    { keywords: ['హలో', 'నమస్కారం'], response: 'నమస్కారం! నేను మీ స్మార్ట్ ఎనర్జీ సహాయకుడిని. విద్యుత్ బిల్లు ఆదా చేయడం ఎలాగో నన్ను అడగండి.' }
  ],
  hi: [
    { keywords: ['बिल', 'लागत', 'कम', 'बचत', 'बजट', 'पैसा'], response: 'बिल कम करने के लिए, एसी या गीजर जैसे उच्च-वाट क्षमता वाले उपकरणों का उपयोग रोजाना 1 घंटा कम करें। स्टैंडबाय उपकरणों को अनप्लग करें.' },
    { keywords: ['एसी', 'कूलिंग', 'तापमान', 'ac'], response: 'अपने एसी को 24-26 डिग्री सेल्सियस पर सेट रखें। हर डिग्री बढ़ाने से कूलिंग बिजली में 6% तक की बचत हो सकती है। नियमित रूप से फिल्टर साफ करें।' },
    { keywords: ['पंखा', 'कूलर', 'fan'], response: 'सीलिंग पंखे बहुत कुशल होते हैं और केवल 30-80W की खपत करते हैं। उन्हें मध्यम गति पर चलाएं और कमरे से बाहर जाते समय बंद कर दें।' },
    { keywords: ['लाइट', 'बल्ब', 'एलईडी', 'led'], response: 'पारंपरिक बल्बों को ऊर्जा-कुशल एलईडी बल्बों से बदलें, जो 80% तक कम ऊर्जा का उपयोग करते हैं। खाली कमरों में लाइट बंद करना न भूलें।' },
    { keywords: ['फ्रिज', 'रेफ्रिजरेटर'], response: 'सुनिश्चित करें कि आपका रेफ्रिजरेटर 3-5 डिग्री सेल्सियस और फ्रीजर -18 डिग्री सेल्सियस पर हो। वेंटिलेशन के लिए इसे दीवार से 2 इंच दूर रखें।' },
    { keywords: ['गीजर', 'हीटर', 'गर्म पानी'], response: 'गीजर के उपयोग को 15-20 मिनट तक सीमित रखें और तापमान को 50-60 डिग्री सेल्सियस पर सेट करें। गर्म पानी की मांग कम करें।' },
    { keywords: ['लैपटॉप', 'कंप्यूटर', 'टीवी'], response: 'लैपटॉप पर स्लीप मोड चालू करें और टीवी को स्टैंडबाय में रखने के बजाय पूरी तरह से बंद कर दें। स्टैंडबाय बिजली आपका बिल बढ़ा सकती है।' },
    { keywords: ['रसोई', 'खाना', 'ओवन', 'इंडक्शन'], response: 'खाना पकाते समय बर्तनों को ढककर रखें, जिससे गर्मी बनी रहती है और खाना जल्दी पकता है। माइक्रोवेव या इंडक्शन अधिक कुशल हैं।' },
    { keywords: ['धुलाई', 'कपड़े', 'वाशिंग'], response: 'वाशिंग मशीन को केवल फुल लोड पर चलाएं और ठंडे पानी का उपयोग करें। कपड़ों को बिजली के ड्रायर के बजाय हवा में सुखाएं।' },
    { keywords: ['सोलर', 'सौर'], response: 'सोलर पैनल लगाने से आपके बिजली बिल में भारी कमी आ सकती है। आवासीय सोलर सेटअप को किफायती बनाने के लिए सरकारी सब्सिडी भी उपलब्ध है।' },
    { keywords: ['प्लग', 'चार्ज'], response: 'उपयोग में न होने पर चार्जर और उपकरणों को अनप्लग करें। स्विच ऑफ होने पर भी, वे बिजली की खपत करते रहते हैं।' },
    { keywords: ['नमस्ते', 'हेलो', 'प्रणाम'], response: 'नमस्ते! मैं आपका स्मार्ट ऊर्जा सहायक हूं। बिजली बिल कम करने के तरीके जानने के लिए मुझसे पूछें।' }
  ]
};

const fallbackResponses = {
  en: "I can help you save on electricity! Ask me about AC temperature tips, fan efficiency, reducing appliance consumption, or lowering your monthly bill.",
  te: "విద్యుత్ ఆదా చేయడంలో నేను మీకు సహాయపడగలను! AC, ఫ్యాన్, రిఫ్రిజిరేటర్ లేదా మీ నెలవారీ బిల్లును తగ్గించడం గురించి నన్ను అడగండి.",
  hi: "मैं आपको बिजली बचाने में मदद कर सकता हूँ! एसी, पंखे, रेफ्रिजरेटर या अपना मासिक बिल कम करने के बारे में मुझसे पूछें।"
};

const getLocalKeywordResponse = (message, currentBill, target, language) => {
  const text = message.toLowerCase();
  const lang = keywordsDb[language] ? language : 'en';

  // Check language-specific DB first
  for (const entry of keywordsDb[lang]) {
    if (entry.keywords.some(kw => text.includes(kw))) {
      return entry.response;
    }
  }

  // Fallback to checking other languages' keywords
  for (const l of Object.keys(keywordsDb)) {
    if (l !== lang) {
      for (const entry of keywordsDb[l]) {
        if (entry.keywords.some(kw => text.includes(kw))) {
          const matchingEntry = keywordsDb[lang].find(e => e.keywords[0] === entry.keywords[0]);
          return matchingEntry ? matchingEntry.response : entry.response;
        }
      }
    }
  }

  return fallbackResponses[lang];
};

const fetchAIResponse = async (message, currentBill, target, language) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (apiKey) {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a "Smart Energy Saving Assistant". The current household electricity bill is ₹${currentBill} and their monthly target budget is ₹${target}.
The user is speaking in language: ${language}.
Your responses must be strictly related to home electricity savings, concise (1-3 sentences maximum), and actionable.
User query: "${message}"`
            }]
          }]
        })
      });
      const data = await response.json();
      if (data.candidates && data.candidates[0].content.parts[0].text) {
        return data.candidates[0].content.parts[0].text.trim();
      }
    } catch (e) {
      console.warn("Real API call failed or misconfigured, falling back to local rule-based system.", e);
    }
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(getLocalKeywordResponse(message, currentBill, target, language));
    }, 1200);
  });
};

export const AppProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => localStorage.getItem('preferredLanguage') || 'en');
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('userProfile');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      console.error('Error parsing user profile from localStorage:', e);
      return null;
    }
  });
  const [targetBill, setTargetBill] = useState(300);
  const [appliances, setAppliances] = useState(defaultAppliances);
  const [chatLog, setChatLog] = useState([
    { role: 'bot', text: translations[language]?.chatWelcome || translations[language]?.chatReplyEfficient || translations.en.chatWelcome || translations.en.chatReplyEfficient }
  ]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  useEffect(() => {
    localStorage.setItem('preferredLanguage', language);
  }, [language]);

  useEffect(() => {
    setChatLog((prev) => {
      if (prev.length === 1 && prev[0].role === 'bot') {
        return [{ role: 'bot', text: translations[language]?.chatWelcome || translations[language]?.chatReplyEfficient || translations.en.chatWelcome || translations.en.chatReplyEfficient }];
      }
      return prev;
    });
  }, [language]);

  const baselineAverage = useMemo(() => computeHouseAverage(baselineHouses), []);

  const t = (key) => translations[language]?.[key] || translations.en[key] || key;

  const toggleLanguage = () => setLanguage((prev) => (prev === 'en' ? 'te' : 'en'));

  const updateUser = (data) => {
    setUser((prev) => {
      if (data === null) {
        localStorage.removeItem('userProfile');
        return null;
      }
      const next = prev ? { ...prev, ...data } : data;
      localStorage.setItem('userProfile', JSON.stringify(next));
      return next;
    });
  };

  const updateTargetBill = (value) => setTargetBill(Number(value));

  const updateWattage = (applianceId, wattage) => {
    setAppliances((prev) =>
      prev.map((item) =>
        item.id === applianceId ? { ...item, wattage: Number(wattage || 0) } : item
      )
    );
  };

  const updateRoomHours = (applianceId, roomId, hours) => {
    setAppliances((prev) =>
      prev.map((item) => {
        if (item.id !== applianceId) return item;
        return {
          ...item,
          rooms: item.rooms.map((room) =>
            room.id === roomId ? { ...room, hours: Number(hours || 0) } : room
          )
        };
      })
    );
  };

  const addRoom = (applianceId) => {
    setAppliances((prev) =>
      prev.map((item) => {
        if (item.id !== applianceId) return item;
        const nextIndex = item.rooms.length + 1;
        return {
          ...item,
          rooms: [
            ...item.rooms,
            { id: `${applianceId}-room-${nextIndex}`, label: `Room ${nextIndex}`, hours: 4 }
          ]
        };
      })
    );
  };

  const resetAppliances = () => setAppliances(defaultAppliances);

  const totalEnergyByAppliance = useMemo(() => {
    return appliances.map((item) => {
      const totalHours = item.rooms.reduce((sum, room) => sum + Number(room.hours || 0), 0);
      const totalKwh = ((item.wattage || 0) * totalHours) / 1000;
      return {
        ...item,
        totalHours,
        energyKwh: Number(totalKwh.toFixed(2)),
        monthlyCost: Number((totalKwh * energyCostPerUnit).toFixed(2))
      };
    });
  }, [appliances]);

  const totalBill = useMemo(() => {
    return totalEnergyByAppliance.reduce((sum, item) => sum + item.monthlyCost, 0).toFixed(2);
  }, [totalEnergyByAppliance]);

  const budgetRatio = useMemo(() => {
    return Math.min(100, Math.round((Number(totalBill) / (targetBill || 1)) * 100));
  }, [totalBill, targetBill]);

  const chartData = useMemo(() => {
    return totalEnergyByAppliance.map((item) => ({ name: item.name, value: item.energyKwh }));
  }, [totalEnergyByAppliance]);

  const baselineComparison = useMemo(() => {
    return [
      { month: 'Feb', value: baselineAverage.febBill },
      { month: 'Mar', value: baselineAverage.marBill },
      { month: 'Apr', value: baselineAverage.aprBill },
      { month: 'You', value: Number(totalBill) }
    ];
  }, [baselineAverage, totalBill]);

  const getRecommendations = () => {
    const total = Number(totalBill);
    if (total > targetBill) {
      return [
        t('recTip1'),
        t('recTip2'),
        t('recTip3'),
        t('recTip4')
      ];
    }
    return [
      t('recTip1'),
      t('recTip2'),
      t('recTip3'),
      t('recTip4')
    ];
  };

  const sendChat = async (message) => {
    if (!message.trim()) return;
    setChatLog((prev) => [...prev, { role: 'user', text: message }]);
    setIsChatLoading(true);

    try {
      const reply = await fetchAIResponse(message, Number(totalBill), targetBill, language);
      setChatLog((prev) => [...prev, { role: 'bot', text: reply }]);
    } catch (error) {
      console.error("Chat error:", error);
      const errText = language === 'te' 
        ? "క్షమించండి, ప్రతిస్పందనను పొందడంలో సమస్య వచ్చింది. దయచేసి మళ్ళీ ప్రయత్నించండి." 
        : language === 'hi' 
          ? "क्षमा करें, प्रतिक्रिया प्राप्त करने में कोई समस्या हुई। कृपया पुनः प्रयास करें।"
          : "Sorry, I encountered an issue. Please try again.";
      setChatLog((prev) => [...prev, { role: 'bot', text: errText }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        t,
        toggleLanguage,
        user,
        updateUser,
        targetBill,
        updateTargetBill,
        appliances,
        updateWattage,
        updateRoomHours,
        addRoom,
        totalBill,
        budgetRatio,
        totalEnergyByAppliance,
        chartData,
        baselineComparison,
        baselineAverage,
        getRecommendations,
        chatLog,
        isChatLoading,
        sendChat,
        resetAppliances
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
