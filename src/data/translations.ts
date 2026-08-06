export const translations = {
  en: {
    // Navbar
    nav_home: "Home & Blog",
    nav_articles: "Articles & Technical Study",
    nav_live: "🔴 Live Counter",
    nav_motors: "Motor Research",

    // Hero
    hero_tag: "ON_DEVICE // BARE_METAL // ESP32",
    hero_title: "Predictive Motor Protection",
    hero_subtitle: "Zero-Cloud local TinyML inference. Fusing kinetic vibrations, acoustic emissions, and stray magnetic flux for sub-5ms absolute trip protection.",
    hero_btn_fault: "INJECT MOTOR FAULT",
    hero_btn_reset: "RESET TO NOMINAL",
    hero_lbl_vibe: "Vibration",
    hero_lbl_acoustic: "Acoustic",
    hero_lbl_magnetic: "Flux",
    hero_lbl_latency: "Latency",
    hero_lbl_status: "Status",
    hero_lbl_safe: "SYSTEM_SAFE",
    hero_lbl_tripped: "FAULT_TRIPPED",

    // TriModal
    sensing_tag: "SENSORY_INPUTS // TRI-MODAL_FUSION",
    sensing_title: "Unified Observation Chamber",
    sensing_desc: "Fusing three distinct physical modalities allows the system to identify multiple fault signatures that are individually invisible to traditional sensors.",
    modality_vibration: "Mechanical Vibration",
    modality_acoustic: "Acoustic Emissions",
    modality_magnetic: "Stray Magnetic Flux",

    // Simulator
    sim_tag: "SYSTEM_TELEMETRY // ESP32_DMA_STREAM",
    sim_title: "Instantaneous Motor Fault Simulator",
    sim_desc: "Bilingual predictive protection test bench",
    sim_btn_inject: "INJECT RELUCTANCE FAULT // حقن خلل",
    sim_btn_reset: "RESET TO NOMINAL // إعادة تعيين",
    sim_trip_sent: "TRIP COMMAND SENT",
    sim_trip_desc: "The TinyML K-Means engine detected a critical vector shift. Core 0 bypassed the network buffer, pulling GPIO 4 low to trip the solid-state relay.",

    // Intelligence
    intel_tag: "ON_DEVICE_AI // TINYML_ENGINE",
    intel_title: "Zero-Cloud Local Intelligence",
    intel_desc: "Sending safety-critical telemetry to the cloud adds latency and potential failure points. TRI-MODAL makes decisions locally on the ESP32 chip. If a rotor seizes, the shutdown sequence begins immediately.",

    // Impact
    impact_loss: "ANNUAL LOSSES DUE TO UNPLANNED DOWNTIME",
    impact_title: "Traditional motor protection relies on thermal relays. They are structurally blind.",
    impact_desc: "A thermal relay only responds to heat (Joule heating P=I²R). By the time it detects the failure, the insulation has melted, the windings have burned, and the production line has halted.",
    impact_footer: "We transition predictive diagnostics to the microsecond level.",

    // Team
    team_tag: "DEVELOPERS_AND_ENGINEERS",
    team_title: "Project Development Team",
    team_desc: "The engineering minds behind the multi-physics sensor fusion and edge AI processing models on the ESP32 microcontroller.",

    // Mentions
    mentions_tag: "RECOGNITION // ENG_JOURNAL",
    mentions_title: "Industry Recognition & Mentions",
    mentions_desc: "Featured in global technology reviews and embedded engineering research journals.",

    // Footer
    footer_copyright: "All rights reserved. Breaking the mold of traditional protection.",
    footer_tag: "SCIENTIFIC_SHOWCASE"
  },
  ar: {
    // Navbar
    nav_home: "الرئيسية والمدونة",
    nav_articles: "الأبحاث والدراسات",
    nav_live: "🔴 العداد المباشر",
    nav_motors: "أبحاث المحركات",

    // Hero
    hero_tag: "معالجة داخلية // نظام خام // متحكم ESP32",
    hero_title: "الحماية التنبؤية للمحركات",
    hero_subtitle: "استدلال TinyML محلي بالكامل بدون سحابة. دمج الاهتزازات الميكانيكية، الانبعاثات الصوتية، والتدفق المغناطيسي الشارد لتأمين فصل فوري في أقل من 5 ملي ثانية.",
    hero_btn_fault: "حقن خلل بالدوران",
    hero_btn_reset: "إعادة للوضع الطبيعي",
    hero_lbl_vibe: "الاهتزاز",
    hero_lbl_acoustic: "الإنبعاث الصوتي",
    hero_lbl_magnetic: "التدفق المغناطيسي",
    hero_lbl_latency: "زمن الاستجابة",
    hero_lbl_status: "حالة النظام",
    hero_lbl_safe: "نظام_آمن_بالكامل",
    hero_lbl_tripped: "تم_الفصل_لوجود_خلل",

    // TriModal
    sensing_tag: "المدخلات الحسية // دمج الأنماط الثلاثة",
    sensing_title: "غرفة المراقبة والتحليل الموحد",
    sensing_desc: "يتيح الدمج بين ثلاثة أنماط فيزيائية مختلفة للنظام رصد بصمات أعطال متعددة ومعقدة، والتي تظل غير مرئية ومجهولة بالنسبة للمستشعرات التقليدية الفردية.",
    modality_vibration: "الاهتزاز الميكانيكي",
    modality_acoustic: "الانبعاثات الصوتية والموجات",
    modality_magnetic: "التدفق المغناطيسي الشارد",

    // Simulator
    sim_tag: "القياسات اللحظية // تدفق ESP32 DMA",
    sim_title: "محاكي أعطال المحرك الفوري",
    sim_desc: "منصة اختبار متقدمة ثنائية اللغة لتقييم حماية المحرك التنبؤية",
    sim_btn_inject: "حقن خلل مغناطيسي مفاجئ",
    sim_btn_reset: "إعادة التعيين إلى التشغيل الطبيعي",
    sim_trip_sent: "تم إرسال إشارة الفصل",
    sim_trip_desc: "رصد نظام الذكاء الاصطناعي TinyML انحرافاً حرجاً في متجه الميزات. قامت النواة 0 بتجاوز مخازن الاتصال، وخفضت جهد منفذ GPIO 4 لفتح ريلاي الطاقة في 1.84ms.",

    // Intelligence
    intel_tag: "الذكاء الاصطناعي على الجهاز // محرك TinyML",
    intel_title: "معالجة محلية بالكامل بدون خوادم سحابية",
    intel_desc: "نقل البيانات الحساسة للسحابة يعرض الأنظمة الصناعية للتأخير ومخاطر الاختراق. يعمل نظام TRI-MODAL بشكل مستقل تماماً داخل معالج ESP32. عند حدوث احتكاك أو قصر، يتم الفصل محلياً.",

    // Impact
    impact_loss: "الخسائر السنوية الناتجة عن التوقف غير المخطط له",
    impact_title: "مرحلات الحرارة التقليدية عمياء هيكلياً.",
    impact_desc: "المرحل الحراري التقليدي لا يستجيب إلا للحرارة المتولدة عن المقاومة (P=I²R). وبحلول الوقت الذي يستجيب فيه للخلل، يكون عزل المحرك قد انهار واحترقت الملفات وتوقف المصنع بالكامل.",
    impact_footer: "نحن ننقل التشخيصات التنبؤية والوقائية إلى مستوى الميكروثانية.",

    // Team
    team_tag: "المطورون والمهندسون",
    team_title: "فريق تطوير وهندسة المشروع",
    team_desc: "العقول الهندسية والبحثية التي صممت نماذج دمج المستشعرات المتقدمة، ورمز الاستدلال TinyML المكتوب بلغة C/C++ على معالج ESP32.",

    // Mentions
    mentions_tag: "التقدير الأكاديمي // مجلات الهندسة المضمنة",
    mentions_title: "الإشارات والتقدير الصناعي للمشروع",
    mentions_desc: "تم استعراض تفاصيل المشروع ومناقشته في كبرى المراجعات التكنولوجية ومجلات أبحاث الأنظمة المدمجة العالمية.",

    // Footer
    footer_copyright: "جميع الحقوق محفوظة. كسر القوالب التقليدية لحماية الأنظمة الصناعية.",
    footer_tag: "معرض_تقني_وعلمي"
  }
};
export type TranslationKeys = keyof typeof translations.en;
