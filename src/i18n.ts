import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      "header": {
        "title": "SARAB TECH",
        "home": "Home",
        "about": "About us",
        "portfolio": "Portfolio",
        "pricing": "Pricing",
        "blog": "Blog",
        "project_prompt": "Have a project for us?",
        "lets_talk": "Let's Talk",
        "address": "651 N Broad St, Middletown, DE 19709, USA"
      },
      "hero": {
        "title": "SARAB TECH",
        "subtitle": "Shaping your digital success story together.",
        "scroll": "Scroll to explore"
      },
      "about": {
        "subtitle": "About Sarab",
        "title_1": "Empowering Your",
        "title_2": "Success Journey.",
        "desc": "Enhance your online presence with Sarab. Specializing in web and app development, we create seamless, innovative solutions to shape your digital success story together.",
        "point_1": "Our expert team creates visually captivating and highly functional websites that make a lasting impact.",
        "point_2": "We develop cutting-edge mobile apps that deliver seamless experiences and cater to your specific needs.",
        "point_3": "Our top priority is exceptional customer service, ensuring your satisfaction every step of the way."
      },
      "customers": {
        "title": "Our Customers"
      },
      "services": {
        "subtitle": "Our Services",
        "title": "What We Do",
        "web_dev": "Web Development",
        "web_dev_desc": "Visually captivating and highly functional websites.",
        "app_dev": "App Development",
        "app_dev_desc": "Cutting-edge mobile apps that deliver seamless experiences.",
        "chatbot": "Chatbot Systems",
        "chatbot_desc": "Intelligent conversational agents like rodood.ly."
      },
      "figures": {
        "subtitle": "Sarab in numbers",
        "title": "Our Impact",
        "desc": "Over the years we have done many things that we are proud of. This motivates us to continue looking for new challenges in order to improve our services.",
        "customers": "Happy Customers",
        "trainees": "Trainees",
        "users": "Service Users",
        "projects": "Great Projects"
      },
      "portfolio": {
        "subtitle": "Our premium projects",
        "title": "Selected Works",
        "view_details": "View Details"
      },
      "blog": {
        "subtitle": "Our blog",
        "title": "Insights, ideas, and product thinking",
        "description": "A space where we share practical lessons on digital products, web experiences, mobile strategy, and AI-powered customer journeys.",
        "cta": "Start your next story",
        "read_more": "Read More",
        "more_title": "Continue Reading",
        "more_description": "Explore more articles from the Sarab team.",
        "posts": {
          "1": {
            "category": "Product Strategy",
            "date": "March 2026",
            "read_time": "4 min read",
            "title": "How to turn an idea into a launch-ready digital product",
            "excerpt": "A simple framework for moving from concept to roadmap, validating the right features, and building momentum before development starts.",
            "section_1_title": "Start with the problem, not the feature list",
            "section_1_body": "Strong digital products begin with a clear business problem and a precise user need. Before design or engineering starts, define who the product is for, what friction it removes, and what measurable outcome success should create. This keeps teams aligned and prevents early scope from drifting into nice-to-have ideas.",
            "section_2_title": "Build the smallest version that proves value",
            "section_2_body": "A launch-ready product is not the biggest version of an idea. It is the smallest version that delivers a credible, useful experience. Focus on the user journey that creates trust first, then cut anything that does not directly support that journey. This makes delivery faster and learning clearer.",
            "section_3_title": "Use launch as the start of iteration",
            "section_3_body": "The first release should open a feedback loop, not close the project. Once real users interact with the product, teams gain insight into onboarding, feature adoption, and retention. Treat launch as the moment your assumptions meet reality and your roadmap becomes smarter.",
            "takeaways_title": "Key takeaways",
            "takeaway_1": "Define the business goal and user pain point before deciding what to build.",
            "takeaway_2": "Prioritize the smallest product that can prove trust and usefulness.",
            "takeaway_3": "Plan post-launch learning as part of the product strategy from day one."
          },
          "2": {
            "category": "Web Experience",
            "date": "February 2026",
            "read_time": "3 min read",
            "title": "What modern websites need to feel premium and perform well",
            "excerpt": "The details that shape trust online: speed, storytelling, structure, and interaction patterns that make brands feel polished.",
            "section_1_title": "Performance is part of the brand",
            "section_1_body": "Visitors notice how a site feels before they read every word. Fast loading, responsive layouts, and smooth interactions all contribute to credibility. A premium brand loses impact quickly when pages lag, layouts jump, or mobile experiences feel neglected.",
            "section_2_title": "Structure creates clarity",
            "section_2_body": "Modern websites perform best when they guide people through a deliberate narrative. Clear hierarchy, focused sections, and concise messaging help users understand what a company offers and why it matters. Great structure reduces friction and improves conversion without adding visual noise.",
            "section_3_title": "Interaction should reinforce confidence",
            "section_3_body": "Animations, hover states, and transitions work best when they support the story instead of competing with it. Premium experiences use motion to direct attention, confirm actions, and add polish. The goal is not more effects but more confidence in every step.",
            "takeaways_title": "Key takeaways",
            "takeaway_1": "Site speed and responsiveness shape trust as much as visual design does.",
            "takeaway_2": "A clear narrative structure improves understanding and conversion.",
            "takeaway_3": "Thoughtful motion should clarify interactions rather than distract from them."
          },
          "3": {
            "category": "AI Systems",
            "date": "January 2026",
            "read_time": "5 min read",
            "title": "Where chatbots create real business value",
            "excerpt": "A grounded look at when conversational systems help most, from customer support and lead capture to operational efficiency.",
            "section_1_title": "Use chatbots where speed and consistency matter",
            "section_1_body": "Chatbots create the most value when teams handle high-volume conversations with repeated questions or predictable workflows. This includes order updates, lead qualification, basic troubleshooting, and routing requests to the right department. In these cases, automation shortens response times and reduces pressure on human teams.",
            "section_2_title": "Design around handoff, not just automation",
            "section_2_body": "A useful chatbot is not one that tries to answer everything. It is one that knows what it can handle well and when to hand the conversation to a person. Clear escalation paths, context retention, and thoughtful prompts create better customer experiences than aggressive automation.",
            "section_3_title": "Measure outcomes that matter to the business",
            "section_3_body": "The success of a conversational system should be tied to service and revenue outcomes. Teams should track response speed, resolution quality, captured leads, and customer satisfaction. When the measurement is practical, chatbot systems become easier to improve and easier to justify.",
            "takeaways_title": "Key takeaways",
            "takeaway_1": "Automate repeated, high-volume conversations where response time matters.",
            "takeaway_2": "Strong chatbot experiences depend on graceful human handoff.",
            "takeaway_3": "Measure business outcomes, not just message counts, to assess value."
          }
        }
      },
      "contact": {
        "title": "How can we help?",
        "desc": "Ready to build something extraordinary? Let's talk about your next project.",
        "button": "Contact Us"
      },
      "projects": {
        "1": {
          "title": "E-Commerce Platform",
          "category": "Web Development",
          "desc": "A full-featured e-commerce platform with real-time inventory management, seamless payment gateway integration, and a responsive, mobile-first design."
        },
        "2": {
          "title": "rodood.ly Chatbot",
          "category": "AI & Chatbots",
          "desc": "An intelligent conversational agent designed to automate customer support, handle inquiries 24/7, and integrate seamlessly with existing CRM systems."
        },
        "3": {
          "title": "Healthcare App",
          "category": "Mobile App",
          "desc": "A secure and intuitive mobile application for patients to book appointments, access medical records, and consult with doctors via telemedicine."
        },
        "4": {
          "title": "Fintech Dashboard",
          "category": "Web Application",
          "desc": "A comprehensive financial dashboard providing real-time analytics, transaction monitoring, and customizable reporting for enterprise clients."
        }
      },
      "modal": {
        "view_live": "View Live Project"
      },
      "footer": {
        "important_links": "Important Links",
        "terms": "Terms and conditions",
        "privacy": "Privacy Policy",
        "refund": "Refund & Dispute Policy",
        "cancelation": "Cancelation Policy",
        "promotions": "Terms & Conditions of Any Promotions",
        "security": "Security Policy"
      }
    }
  },
  ar: {
    translation: {
      "header": {
        "title": "سراب تك",
        "home": "الرئيسية",
        "about": "من نحن",
        "portfolio": "أعمالنا",
        "pricing": "الأسعار",
        "blog": "المدونة",
        "project_prompt": "هل لديك مشروع لنا؟",
        "lets_talk": "لنتحدث",
        "address": "651 N Broad St, Middletown, DE 19709, USA"
      },
      "hero": {
        "title": "سراب تك",
        "subtitle": "نشكل قصة نجاحك الرقمية معاً.",
        "scroll": "مرر للاستكشاف"
      },
      "about": {
        "subtitle": "عن سراب",
        "title_1": "تمكين رحلة",
        "title_2": "نجاحك.",
        "desc": "عزز تواجدك الرقمي مع سراب. نحن متخصصون في تطوير الويب والتطبيقات، ونبتكر حلولاً سلسة ومبتكرة لتشكيل قصة نجاحك الرقمية معاً.",
        "point_1": "يقوم فريق الخبراء لدينا بإنشاء مواقع ويب جذابة بصريًا وعالية الأداء تترك أثرًا دائمًا.",
        "point_2": "نطور تطبيقات هواتف محمولة متطورة تقدم تجارب سلسة وتلبي احتياجاتك الخاصة.",
        "point_3": "أولويتنا القصوى هي خدمة العملاء الاستثنائية، لضمان رضاك في كل خطوة."
      },
      "customers": {
        "title": "عملاؤنا"
      },
      "services": {
        "subtitle": "خدماتنا",
        "title": "ماذا نفعل",
        "web_dev": "تطوير الويب",
        "web_dev_desc": "مواقع ويب جذابة بصريًا وعالية الأداء.",
        "app_dev": "تطوير التطبيقات",
        "app_dev_desc": "تطبيقات هواتف محمولة متطورة تقدم تجارب سلسة.",
        "chatbot": "أنظمة الدردشة الآلية",
        "chatbot_desc": "وكلاء محادثة أذكياء مثل ردود.لي."
      },
      "figures": {
        "subtitle": "سراب في أرقام",
        "title": "تأثيرنا",
        "desc": "على مر السنين قمنا بالعديد من الأشياء التي نفخر بها. هذا يحفزنا على مواصلة البحث عن تحديات جديدة من أجل تحسين خدماتنا.",
        "customers": "عميل سعيد",
        "trainees": "متدرب",
        "users": "مستخدم للخدمات",
        "projects": "مشروع رائع"
      },
      "portfolio": {
        "subtitle": "مشاريعنا المميزة",
        "title": "أعمال مختارة",
        "view_details": "عرض التفاصيل"
      },
      "blog": {
        "subtitle": "مدونتنا",
        "title": "رؤى وأفكار وتفكير في بناء المنتجات",
        "description": "مساحة نشارك فيها دروسًا عملية حول المنتجات الرقمية وتجارب الويب واستراتيجيات التطبيقات ورحلات العملاء المدعومة بالذكاء الاصطناعي.",
        "cta": "ابدأ قصتك القادمة",
        "read_more": "اقرأ المزيد",
        "more_title": "واصل القراءة",
        "more_description": "استكشف المزيد من المقالات من فريق سراب.",
        "posts": {
          "1": {
            "category": "استراتيجية المنتج",
            "date": "مارس 2026",
            "read_time": "قراءة لمدة 4 دقائق",
            "title": "كيف تحول الفكرة إلى منتج رقمي جاهز للإطلاق",
            "excerpt": "إطار عملي للانتقال من الفكرة إلى خارطة طريق واضحة، والتحقق من الميزات المناسبة، وبناء زخم حقيقي قبل بدء التطوير.",
            "section_1_title": "ابدأ بالمشكلة لا بقائمة الميزات",
            "section_1_body": "المنتجات الرقمية القوية تبدأ بفهم واضح لمشكلة العمل واحتياج المستخدم الحقيقي. قبل بدء التصميم أو التطوير، يجب تحديد الفئة المستهدفة، وما العائق الذي سيتم حله، وما النتيجة القابلة للقياس التي تعني النجاح. هذا يضمن بقاء الفريق على نفس الاتجاه ويمنع تضخم النطاق مبكرًا.",
            "section_2_title": "ابنِ أصغر نسخة تثبت القيمة",
            "section_2_body": "المنتج الجاهز للإطلاق ليس أكبر نسخة ممكنة من الفكرة، بل أصغر نسخة تقدم تجربة مفيدة وموثوقة. ركز على الرحلة الأساسية التي تولد الثقة أولًا، ثم استبعد كل ما لا يدعمها مباشرة. بهذه الطريقة يصبح التنفيذ أسرع والتعلم أوضح.",
            "section_3_title": "اعتبر الإطلاق بداية للتطوير المستمر",
            "section_3_body": "يجب أن يفتح الإصدار الأول حلقة تغذية راجعة حقيقية، لا أن يكون نهاية المشروع. عندما يبدأ المستخدمون الفعليون باستخدام المنتج، تظهر رؤى مهمة حول التهيئة والتفاعل والاحتفاظ بالمستخدمين. الإطلاق هو اللحظة التي تختبر فيها الافتراضات على أرض الواقع وتصبح خارطة الطريق أكثر ذكاءً.",
            "takeaways_title": "أهم النقاط",
            "takeaway_1": "حدد هدف العمل وألم المستخدم قبل تحديد ما الذي سيتم بناؤه.",
            "takeaway_2": "أعط الأولوية لأصغر منتج قادر على إثبات الثقة والفائدة.",
            "takeaway_3": "خطط للتعلم بعد الإطلاق كجزء أساسي من استراتيجية المنتج."
          },
          "2": {
            "category": "تجربة الويب",
            "date": "فبراير 2026",
            "read_time": "قراءة لمدة 3 دقائق",
            "title": "ما الذي يجعل المواقع الحديثة تبدو مميزة وتعمل بكفاءة",
            "excerpt": "التفاصيل التي تصنع الثقة عبر الإنترنت: السرعة، والسرد، والبنية، وأنماط التفاعل التي تمنح العلامات التجارية حضورًا احترافيًا.",
            "section_1_title": "الأداء جزء من هوية العلامة",
            "section_1_body": "الزائر يلاحظ إحساس الموقع قبل أن يقرأ كل كلمة. سرعة التحميل، واستجابة الواجهة، وسلاسة التفاعل كلها عناصر تصنع المصداقية. حتى العلامات القوية تفقد أثرها بسرعة عندما يكون الموقع بطيئًا أو غير مهيأ جيدًا للهاتف.",
            "section_2_title": "البنية الواضحة تصنع الفهم",
            "section_2_body": "أفضل المواقع الحديثة هي التي تقود المستخدم عبر قصة مقصودة. التسلسل الواضح، والأقسام المركزة، والرسائل المختصرة تساعد الزائر على فهم ما تقدمه الشركة ولماذا يهمه ذلك. البنية الجيدة تقلل الاحتكاك وترفع التحويل دون ضوضاء بصرية.",
            "section_3_title": "التفاعل يجب أن يعزز الثقة",
            "section_3_body": "الحركة، وحالات التحويم، والانتقالات تكون في أفضل حالاتها عندما تدعم القصة بدل أن تنافسها. التجارب المميزة تستخدم الحركة لتوجيه الانتباه وتأكيد الأفعال وإضافة صقل بصري. الهدف ليس المزيد من المؤثرات بل المزيد من الثقة في كل خطوة.",
            "takeaways_title": "أهم النقاط",
            "takeaway_1": "السرعة والاستجابة تؤثران في الثقة بقدر تأثير التصميم البصري.",
            "takeaway_2": "البنية السردية الواضحة تحسن الفهم وترفع التحويل.",
            "takeaway_3": "الحركة الجيدة توضح التفاعل ولا تشتت المستخدم."
          },
          "3": {
            "category": "أنظمة الذكاء الاصطناعي",
            "date": "يناير 2026",
            "read_time": "قراءة لمدة 5 دقائق",
            "title": "أين تصنع روبوتات المحادثة قيمة حقيقية للأعمال",
            "excerpt": "نظرة عملية على الحالات التي تقدم فيها الأنظمة الحوارية أكبر فائدة، من دعم العملاء والتقاط العملاء المحتملين إلى رفع الكفاءة التشغيلية.",
            "section_1_title": "استخدم روبوتات المحادثة حيث تكون السرعة والثبات مهمين",
            "section_1_body": "تظهر القيمة الأكبر لروبوتات المحادثة عندما تتعامل الفرق مع عدد كبير من المحادثات المتكررة أو المهام المتوقعة. يشمل ذلك تحديثات الطلبات، وتأهيل العملاء المحتملين، وحل الأسئلة الأساسية، وتوجيه الطلبات إلى الجهة المناسبة. في هذه الحالات يقل زمن الاستجابة ويخف الضغط على الفرق البشرية.",
            "section_2_title": "صمم التجربة حول التحويل إلى الموظف لا حول الأتمتة فقط",
            "section_2_body": "الروبوت المفيد ليس الذي يحاول الإجابة عن كل شيء، بل الذي يعرف ما الذي يمكنه التعامل معه بكفاءة ومتى يجب تحويل المحادثة إلى شخص حقيقي. مسارات التصعيد الواضحة، وحفظ السياق، والصياغة الجيدة تخلق تجربة أفضل بكثير من الأتمتة المبالغ فيها.",
            "section_3_title": "قِس النتائج التي تهم العمل فعلًا",
            "section_3_body": "نجاح النظام الحواري يجب أن يرتبط بمؤشرات خدمة وإيرادات حقيقية. من المهم متابعة سرعة الاستجابة، وجودة الحل، والعملاء المحتملين الذين تم التقاطهم، ورضا العملاء. عندما تكون المقاييس عملية يصبح تحسين النظام وتبرير الاستثمار فيه أسهل بكثير.",
            "takeaways_title": "أهم النقاط",
            "takeaway_1": "قم بأتمتة المحادثات المتكررة ذات الحجم الكبير حيث تكون سرعة الرد مهمة.",
            "takeaway_2": "التجربة القوية تعتمد على تحويل سلس إلى العنصر البشري عند الحاجة.",
            "takeaway_3": "قِس أثر النظام على نتائج العمل لا على عدد الرسائل فقط."
          }
        }
      },
      "contact": {
        "title": "كيف يمكننا المساعدة؟",
        "desc": "هل أنت مستعد لبناء شيء استثنائي؟ لنتحدث عن مشروعك القادم.",
        "button": "اتصل بنا"
      },
      "projects": {
        "1": {
          "title": "منصة تجارة إلكترونية",
          "category": "تطوير الويب",
          "desc": "منصة تجارة إلكترونية متكاملة الميزات مع إدارة المخزون في الوقت الفعلي، وتكامل سلس لبوابة الدفع، وتصميم متجاوب يركز على الهاتف المحمول."
        },
        "2": {
          "title": "روبوت محادثة ردود.لي",
          "category": "الذكاء الاصطناعي وروبوتات المحادثة",
          "desc": "وكيل محادثة ذكي مصمم لأتمتة دعم العملاء، والتعامل مع الاستفسارات على مدار الساعة طوال أيام الأسبوع، والتكامل بسلاسة مع أنظمة إدارة علاقات العملاء الحالية."
        },
        "3": {
          "title": "تطبيق رعاية صحية",
          "category": "تطبيق هاتف",
          "desc": "تطبيق هاتف محمول آمن وبديهي للمرضى لحجز المواعيد، والوصول إلى السجلات الطبية، واستشارة الأطباء عبر التطبيب عن بعد."
        },
        "4": {
          "title": "لوحة تحكم التكنولوجيا المالية",
          "category": "تطبيق ويب",
          "desc": "لوحة تحكم مالية شاملة توفر تحليلات في الوقت الفعلي، ومراقبة المعاملات، وتقارير قابلة للتخصيص لعملاء المؤسسات."
        }
      },
      "modal": {
        "view_live": "عرض المشروع المباشر"
      },
      "footer": {
        "important_links": "روابط هامة",
        "terms": "الشروط والأحكام",
        "privacy": "سياسة الخصوصية",
        "refund": "سياسة الاسترجاع والمنازعات",
        "cancelation": "سياسة الإلغاء",
        "promotions": "شروط وأحكام أي عروض ترويجية",
        "security": "السياسة الأمنية"
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
