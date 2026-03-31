import { useState, useEffect, createContext, useContext } from 'react';

const translations = {
    en: {
        nav: {
            home: "Home",
            requestTutor: "Request a Tutor",
            becomeTutor: "Become a Tutor",
            aiExperience: "AI Experience",
            admin: "Admin"
        },
        hero: {
            title: "Find Your Perfect Tutor",
            subtitle: "Connect with expert tutors in your language, your schedule, your way.",
            requestBtn: "Request a Tutor",
            becomeBtn: "Become a Tutor"
        },
        howItWorks: {
            title: "How It Works",
            step1Title: "Submit a Request",
            step1Desc: "Tell us what subject you need help with and your preferences.",
            step2Title: "We Match You",
            step2Desc: "Our team finds the best tutor based on your needs.",
            step3Title: "Start Learning",
            step3Desc: "Begin your personalized tutoring sessions."
        },
        featured: {
            title: "Featured Tutors",
            experience: "years experience",
            subjects: "Subjects",
            languages: "Languages"
        },
        testimonials: {
            title: "What Students Say"
        },
        requestForm: {
            title: "Request a Tutor",
            subtitle: "Tell us what you need and we'll match you with the perfect tutor.",
            fullName: "Full Name",
            phone: "Phone Number",
            email: "Email",
            subject: "Subject",
            level: "Grade / Level",
            schedule: "Preferred Schedule",
            budget: "Budget",
            location: "Location (optional)",
            preferredLang: "Preferred Tutoring Language",
            submit: "Submit Request",
            submitting: "Submitting...",
            success: "Request Submitted!",
            successMsg: "We'll match you with a tutor soon."
        },
        becomeForm: {
            title: "Become a Tutor",
            subtitle: "Join our community of expert tutors and start teaching.",
            fullName: "Full Name",
            phone: "Phone Number",
            email: "Email",
            subjects: "Subjects You Teach",
            experience: "Years of Experience",
            availability: "Availability",
            languages: "Languages Spoken",
            bio: "Short Bio",
            submit: "Apply Now",
            submitting: "Submitting...",
            success: "Application Submitted!",
            successMsg: "We'll review your application and get back to you."
        },
        ai: {
            title: "AI Tutoring Experience",
            subtitle: "Explore the future of education with AI-powered learning tools.",
            feature1: "Personalized Learning Paths",
            feature1Desc: "AI adapts to your learning style and pace.",
            feature2: "Interactive Study Sessions",
            feature2Desc: "Engage with AI-driven practice problems and explanations.",
            feature3: "Multilingual Support",
            feature3Desc: "Learn in English, Amharic, or Afaan Oromo."
        },
        requestSteps: {
            title: "How to Request a Tutor",
            subtitle: "It only takes a few minutes. Tap each step to learn more.",
            step1Title: "Fill in the Form",
            step1Desc: "Enter your name, subject, grade level, schedule preference, and budget. The more detail you provide, the better your match will be.",
            step2Title: "We Review & Match",
            step2Desc: "Our team reviews your request and carefully matches you with the most suitable tutor from our network based on your needs and language preference.",
            step3Title: "Start Your Sessions",
            step3Desc: "Once matched, you'll be contacted directly to confirm session details. You can then begin learning at your preferred time and place."
        },
        becomeSteps: {
            title: "How to Become a Tutor",
            subtitle: "Join our network in three simple steps. Tap each step for details.",
            step1Title: "Submit Your Application",
            step1Desc: "Fill in your name, contact details, subjects you teach, years of experience, and a short bio. Tell us what makes you a great tutor.",
            step2Title: "We Review Your Profile",
            step2Desc: "Our admin team reviews your application, verifies your background, and ensures you're a great fit for our students' needs.",
            step3Title: "Get Matched & Teach",
            step3Desc: "Once approved, you'll be added to our tutor network. When a student request matches your profile, we'll reach out to connect you."
        },
        footer: {
            rights: "All rights reserved.",
            tagline: "Connecting students with expert tutors."
        },
        jobs: {
            title: "Tutor Job Board",
            heading: "Open Tutoring Opportunities",
            subtitle: "These are real student requests posted by our team. If you match the requirements, apply as a tutor and we'll connect you.",
            searchPlaceholder: "Search by subject, level...",
            openPositions: "open position",
            openPositionsPlural: "open positions",
            loading: "Loading...",
            noJobs: "No open jobs found",
            noJobsDesc: "Check back soon or adjust your search.",
            applyBtn: "Apply as Tutor",
            ctaTitle: "Don't see the right fit?",
            ctaDesc: "Submit your tutor profile and we'll match you when a relevant request comes in.",
            ctaBtn: "Apply as a Tutor",
            statusOpen: "Open",
            statusFilled: "Filled",
            statusClosed: "Closed",
            today: "Today",
            yesterday: "Yesterday",
            daysAgo: "days ago",
            weeksAgo: "weeks ago",
            monthsAgo: "months ago"
        },
        faq: {
            title: "Frequently Asked Questions",
            subtitle: "Everything you need to know about how we connect students and tutors.",
            q1: "Is this an online tutoring platform?",
            a1: "No. We are a connection bridge — we collect your information and match you with the right tutor. All sessions happen in-person or through your own preferred channel after we connect you.",
            q2: "How does the matching process work?",
            a2: "You submit a request with your subject, level, schedule, and language preference. Our team reviews it and connects you with the most suitable available tutor.",
            q3: "How long does it take to get matched with a tutor?",
            a3: "We typically connect you with a tutor within 24–48 hours of receiving your request.",
            q4: "Is there a fee for using this service?",
            a4: "Connecting through our platform is free. Any tutoring fees are agreed directly between you and the tutor.",
            q5: "What subjects and levels do you support?",
            a5: "We support a wide range of subjects from primary school through university level, including math, science, languages, and more.",
            q6: "Can I request a tutor who speaks Amharic or Afaan Oromo?",
            a6: "Absolutely. We have tutors available in English, Amharic, and Afaan Oromo. Just specify your preferred language when submitting your request.",
            q7: "I'm a tutor — how do I join?",
            a7: "Click 'Become a Tutor', fill in your details, and our team will review your application. Once approved, you'll be added to our tutor network."
        },
        readyToTeach: {
            tutorTitle: "Ready to Start Teaching?",
            tutorDesc: "Share your expertise and make a real impact. We'll connect you with students who need exactly what you offer — no platform fees, no middleman after the match.",
            tutorBullet1: "Submit your profile once",
            tutorBullet2: "We match you with the right students",
            tutorBullet3: "You set your own schedule & rates",
            tutorBtn: "Apply as a Tutor",
            studentTitle: "Need a Tutor?",
            studentDesc: "Tell us your subject, level, and schedule. We'll find the perfect tutor and connect you directly — fast, simple, and free to request.",
            studentBullet1: "Fill in one simple form",
            studentBullet2: "We review & find your match",
            studentBullet3: "Get connected within 24–48 hrs",
            studentBtn: "Request a Tutor"
        },
        common: {
            english: "English",
            amharic: "አማርኛ",
            oromo: "Afaan Oromo",
            jobBoard: "Job Board",
            step: "Step",
            pending: "Pending",
            assigned: "Assigned",
            completed: "Completed",
            approved: "Approved",
            rejected: "Rejected",
            search: "Search...",
            filter: "Filter",
            actions: "Actions",
            delete: "Delete",
            edit: "Edit",
            save: "Save",
            cancel: "Cancel",
            back: "Back"
        }
    },
    am: {
        nav: {
            home: "መነሻ",
            requestTutor: "አስተማሪ ጠይቅ",
            becomeTutor: "አስተማሪ ሁን",
            aiExperience: "AI ተሞክሮ",
            admin: "አስተዳዳሪ"
        },
        hero: {
            title: "ምርጥ አስተማሪዎን ያግኙ",
            subtitle: "ከባለሙያ አስተማሪዎች ጋር በቋንቋዎ፣ በጊዜዎ፣ በአሰራርዎ ይገናኙ።",
            requestBtn: "አስተማሪ ጠይቅ",
            becomeBtn: "አስተማሪ ሁን"
        },
        howItWorks: {
            title: "እንዴት ይሰራል",
            step1Title: "ጥያቄ ያስገቡ",
            step1Desc: "የሚፈልጉትን ትምህርት እና ምርጫዎን ይንገሩን።",
            step2Title: "እናገናኝዎታለን",
            step2Desc: "ቡድናችን ለፍላጎትዎ ተስማሚ አስተማሪ ያገኛል።",
            step3Title: "መማር ይጀምሩ",
            step3Desc: "ለእርስዎ የተዘጋጀ የማስተማር ክፍለ ጊዜ ይጀምሩ።"
        },
        featured: {
            title: "ተመራጭ አስተማሪዎች",
            experience: "ዓመት ልምድ",
            subjects: "ትምህርቶች",
            languages: "ቋንቋዎች"
        },
        testimonials: {
            title: "ተማሪዎች ምን ይላሉ"
        },
        requestForm: {
            title: "አስተማሪ ጠይቅ",
            subtitle: "የሚፈልጉትን ይንገሩን ተስማሚ አስተማሪ እናገኝልዎታለን።",
            fullName: "ሙሉ ስም",
            phone: "ስልክ ቁጥር",
            email: "ኢሜይል",
            subject: "ትምህርት",
            level: "ክፍል / ደረጃ",
            schedule: "ተመራጭ ጊዜ",
            budget: "በጀት",
            location: "አካባቢ (አማራጭ)",
            preferredLang: "ተመራጭ የማስተማሪያ ቋንቋ",
            submit: "ጥያቄ ያስገቡ",
            submitting: "በማስገባት ላይ...",
            success: "ጥያቄ ተልኳል!",
            successMsg: "በቅርቡ ተስማሚ አስተማሪ እናገኝልዎታለን።"
        },
        becomeForm: {
            title: "አስተማሪ ሁን",
            subtitle: "ከባለሙያ አስተማሪዎች ማህበረሰብ ጋር ይቀላቀሉ።",
            fullName: "ሙሉ ስም",
            phone: "ስልክ ቁጥር",
            email: "ኢሜይል",
            subjects: "የሚያስተምሯቸው ትምህርቶች",
            experience: "ዓመት ልምድ",
            availability: "ተገኝነት",
            languages: "ቋንቋዎች",
            bio: "አጭር መግለጫ",
            submit: "ያመልክቱ",
            submitting: "በማስገባት ላይ...",
            success: "ማመልከቻ ተልኳል!",
            successMsg: "ማመልከቻዎን እንገመግምና እንመልሳለን።"
        },
        ai: {
            title: "AI የማስተማር ተሞክሮ",
            subtitle: "በ AI የተደገፈ የትምህርት ዘዴዎችን ያስሱ።",
            feature1: "ለእርስዎ የተዘጋጀ መንገድ",
            feature1Desc: "AI ከመማሪያ ዘይቤዎ ጋር ይላመዳል።",
            feature2: "ተሳታፊ ክፍለ ጊዜዎች",
            feature2Desc: "በ AI ከተዘጋጁ ልምምዶች ጋር ይሳተፉ።",
            feature3: "ባለብዙ ቋንቋ ድጋፍ",
            feature3Desc: "በእንግሊዝኛ፣ በአማርኛ ወይም በኦሮምኛ ይማሩ።"
        },
        requestSteps: {
            title: "አስተማሪ እንዴት ይጠይቁ",
            subtitle: "ጥቂት ደቂቃዎች ብቻ ይፈጃል። እያንዳንዱን ደረጃ ይጫኑ።",
            step1Title: "ቅጹን ይሙሉ",
            step1Desc: "ስምዎን፣ ትምህርቱን፣ ክፍሉን፣ ጊዜ ምርጫዎን እና በጀቱን ያስገቡ። የበለጠ ዝርዝር ካስገቡ ተሻሻለ ግጥምጥም ያገኛሉ።",
            step2Title: "እንገመግምና እናዛምዳለን",
            step2Desc: "ቡድናችን ጥያቄዎን ይገመግምና ፍላጎትዎን እና የቋንቋ ምርጫዎን መሰረት አድርጎ ተስማሚ አስተማሪ ያዛምዳል።",
            step3Title: "ክፍለ ጊዜዎን ይጀምሩ",
            step3Desc: "ከተዛመዱ በኋላ ለክፍለ ጊዜ ዝርዝሮች ቀጥታ ይደወልሎዎታል። ከዚያ ሁሉ ሊጀምሩ ይችላሉ።"
        },
        becomeSteps: {
            title: "አስተማሪ እንዴት ይሆናሉ",
            subtitle: "በሶስት ቀላል ደረጃዎች ይቀላቀሉ። እያንዳንዱን ደረጃ ይጫኑ።",
            step1Title: "ማመልከቻ ያስገቡ",
            step1Desc: "ስምዎን፣ ዕውቂያ ዝርዝሮችዎን፣ የሚያስተምሯቸውን ትምህርቶች፣ ልምድዎን እና አጭር መግለጫ ያስገቡ።",
            step2Title: "መገለጫዎን እንገመግምዋለን",
            step2Desc: "የአስተዳዳሪ ቡድናችን ማመልከቻዎን ይገመግምና ለተማሪዎቻችን ፍላጎት ተስማሚ መሆንዎን ያረጋግጣል።",
            step3Title: "ይዛመዱና ያስተምሩ",
            step3Desc: "ከፀደቁ በኋላ ወደ አስተማሪ አውታረ መረብ ይጨመሩ። የተማሪ ጥያቄ ከፕሮፋይልዎ ጋር ሲዛመድ እናገናኝዎታለን።"
        },
        footer: {
            rights: "መብቱ በሕግ የተጠበቀ ነው።",
            tagline: "ተማሪዎችን ከባለሙያ አስተማሪዎች ጋር የሚያገናኝ።"
        },
        jobs: {
            title: "የአስተማሪ ሥራ ሰሌዳ",
            heading: "ክፍት የማስተማር ዕድሎች",
            subtitle: "እነዚህ በቡድናችን የተለጠፉ የእውነተኛ ተማሪ ጥያቄዎች ናቸው። መስፈርቱ ካሟሉ እንደ አስተማሪ ያመልክቱ።",
            searchPlaceholder: "በትምህርት፣ ደረጃ ፈልግ...",
            openPositions: "ክፍት ቦታ",
            openPositionsPlural: "ክፍት ቦታዎች",
            loading: "በመጫን ላይ...",
            noJobs: "ክፍት ሥራ አልተገኘም",
            noJobsDesc: "በቅርቡ ይመልከቱ ወይም ፍለጋዎን ያስተካክሉ።",
            applyBtn: "እንደ አስተማሪ ያመልክቱ",
            ctaTitle: "ተስማሚ ሥራ አላዩም?",
            ctaDesc: "የአስተማሪ መገለጫዎን ያስገቡ ተስማሚ ጥያቄ ሲመጣ እናገናኝዎታለን።",
            ctaBtn: "እንደ አስተማሪ ያመልክቱ",
            statusOpen: "ክፍት",
            statusFilled: "ሞልቷል",
            statusClosed: "ተዘግቷል",
            today: "ዛሬ",
            yesterday: "ትናንት",
            daysAgo: "ቀናት በፊት",
            weeksAgo: "ሳምንታት በፊት",
            monthsAgo: "ወራት በፊት"
        },
        faq: {
            title: "ብዙ ጊዜ የሚጠየቁ ጥያቄዎች",
            subtitle: "ተማሪዎችን እና አስተማሪዎችን እንዴት እንደምናገናኝ የሚያስፈልጉዎትን ሁሉ ያግኙ።",
            q1: "ይህ የመስመር ላይ ማስተማር መድረክ ነው?",
            a1: "አይደለም። እኛ ድልድይ ነን — መረጃዎን እንሰበስብ ተስማሚ አስተማሪ እናዛምዳለን። ሁሉም ክፍለ ጊዜዎች ካገናኘን በኋላ ምርጫዎ ባለው ቻናል ይካሄዳሉ።",
            q2: "የማዛመድ ሂደቱ እንዴት ይሰራል?",
            a2: "ትምህርት፣ ደረጃ፣ ጊዜ ምርጫ እና ቋንቋ ያስገቡ። ቡድናችን ይገምግምና ተስማሚ አስተማሪ ያዛምዳል።",
            q3: "አስተማሪ ለማዛመድ ምን ያህል ጊዜ ይወስዳል?",
            a3: "ጥያቄ ከደረሰን በኋላ ብዙውን ጊዜ በ24-48 ሰዓት ውስጥ እናገናኝዎታለን።",
            q4: "ለዚህ አገልግሎት ክፍያ አለ?",
            a4: "በመድረካችን ማስተሳሰር ነፃ ነው። ማንኛውም የማስተማሪያ ክፍያ ቀጥታ ከአስተማሪዎ ጋር ይስማማሉ።",
            q5: "ምን ዓይነት ትምህርቶችና ደረጃዎች ይደገፋሉ?",
            a5: "ከፕሪስኩል እስከ ዩኒቨርሲቲ ሂሳብ፣ ሳይንስ፣ ቋንቋ ወዘተን ጨምሮ ሰፊ ዓይነቶችን ይደግፋሉ።",
            q6: "አማርኛ ወይም ኦሮምኛ ተናጋሪ አስተማሪ መጠየቅ ይቻላል?",
            a6: "በእርግጥ። አስተማሪዎቻችን በእንግሊዝኛ፣ አማርኛ እና ኦሮምኛ አሉ። ጥያቄ ሲያስገቡ ቋንቋዎን ይግለጹ።",
            q7: "አስተማሪ ነኝ — እንዴት እቀላቀላለሁ?",
            a7: "'አስተማሪ ሁን' ጠቅ ያድርጉ ዝርዝሮቹን ይሙሉ ቡድናችን ያጸድቅዎታል። ከፀደቁ በኋላ ወደ አስተማሪ አውታር ይጨምሩዎታለን።"
        },
        readyToTeach: {
            tutorTitle: "ማስተማር ለመጀመር ዝግጁ ነዎት?",
            tutorDesc: "እውቀትዎን ያካፍሉ እና ተጽዕኖ ያሳድሩ። ያስፈልጉዎትን ተማሪዎች እናዛምዳለን — ክፍያ የለም።",
            tutorBullet1: "መገለጫዎን አንድ ጊዜ ያስገቡ",
            tutorBullet2: "ተስማሚ ተማሪዎች እናዛምዳለን",
            tutorBullet3: "ጊዜዎን እና ዋጋዎን እርስዎ ይወስናሉ",
            tutorBtn: "እንደ አስተማሪ ያመልክቱ",
            studentTitle: "አስተማሪ ፈልጎዋሉ?",
            studentDesc: "ትምህርቱን፣ ደረጃውን እና ጊዜዎን ይንገሩን። ፈጣን፣ ቀላል እና ነፃ ነው።",
            studentBullet1: "አንድ ቀላል ቅጽ ይሙሉ",
            studentBullet2: "እናጣራ ተስማሚ አስተማሪ እናዛምዳለን",
            studentBullet3: "በ24-48 ሰዓት ይገናኛሉ",
            studentBtn: "አስተማሪ ጠይቅ"
        },
        common: {
            english: "English",
            amharic: "አማርኛ",
            oromo: "Afaan Oromo",
            jobBoard: "ሥራ ሰሌዳ",
            step: "ደረጃ",
            pending: "በመጠባበቅ ላይ",
            assigned: "ተመድቧል",
            completed: "ተጠናቋል",
            approved: "ፀድቋል",
            rejected: "ተቀባይነት አላገኘም",
            search: "ፈልግ...",
            filter: "አጣራ",
            actions: "ድርጊቶች",
            delete: "ሰርዝ",
            edit: "አርትዕ",
            save: "አስቀምጥ",
            cancel: "ሰርዝ",
            back: "ተመለስ"
        }
    },
    or: {
        nav: {
            home: "Fuula Jalqabaa",
            requestTutor: "Barsiisaa Gaafadhu",
            becomeTutor: "Barsiisaa Ta'i",
            aiExperience: "Muuxannoo AI",
            admin: "Bulchiinsa"
        },
        hero: {
            title: "Barsiisaa Kee Sirrii Argadhu",
            subtitle: "Barsiisota ogeeyyii waliin afaan keetiin, yeroo keetiin wal-qunnamii.",
            requestBtn: "Barsiisaa Gaafadhu",
            becomeBtn: "Barsiisaa Ta'i"
        },
        howItWorks: {
            title: "Akkamiin Hojjeta",
            step1Title: "Gaaffii Galchi",
            step1Desc: "Barnoota barbaaddu fi filannoo kee nutti himi.",
            step2Title: "Si Waliin Geenyaa",
            step2Desc: "Gareen keenya barsiisaa siif ta'u argata.",
            step3Title: "Barachuu Jalqabi",
            step3Desc: "Sagantaa barnoota dhuunfaa jalqabi."
        },
        featured: {
            title: "Barsiisota Filatamoo",
            experience: "waggaa muuxannoo",
            subjects: "Barnoota",
            languages: "Afaanota"
        },
        testimonials: {
            title: "Barattoonni Maal Jedhu"
        },
        requestForm: {
            title: "Barsiisaa Gaafadhu",
            subtitle: "Waan barbaaddu nutti himi barsiisaa siif ta'u arganna.",
            fullName: "Maqaa Guutuu",
            phone: "Lakk. Bilbilaa",
            email: "Imeelii",
            subject: "Barnoota",
            level: "Kutaa / Sadarkaa",
            schedule: "Yeroo Filannoo",
            budget: "Baajata",
            location: "Bakka (dirqama miti)",
            preferredLang: "Afaan Barnoota Filannoo",
            submit: "Gaaffii Galchi",
            submitting: "Galchaa jira...",
            success: "Gaaffiin Ergameera!",
            successMsg: "Barsiisaa siif ta'u dafnee arganna."
        },
        becomeForm: {
            title: "Barsiisaa Ta'i",
            subtitle: "Hawaasa barsiisota ogeeyyii waliin makamii.",
            fullName: "Maqaa Guutuu",
            phone: "Lakk. Bilbilaa",
            email: "Imeelii",
            subjects: "Barnoota Barsiiftu",
            experience: "Waggaa Muuxannoo",
            availability: "Argamuu",
            languages: "Afaanota",
            bio: "Ibsa Gabaabaa",
            submit: "Iyyaadhu",
            submitting: "Galchaa jira...",
            success: "Iyyannoon Ergameera!",
            successMsg: "Iyyannoo kee ilaallee deebii siif kennina."
        },
        ai: {
            title: "Muuxannoo Barnoota AI",
            subtitle: "Meeshaalee barnoota AI'n deeggaraman qoradhu.",
            feature1: "Karaa Barnoota Dhuunfaa",
            feature1Desc: "AI akkaataa barachuu keetii waliin walsima.",
            feature2: "Yeroo Barnootaa Hirmaataa",
            feature2Desc: "Shaakala AI'n qophaa'an waliin hirmaadhu.",
            feature3: "Deeggarsa Afaan Heddu",
            feature3Desc: "Afaan Ingilizii, Amaariffaa, ykn Afaan Oromootiin baradhu."
        },
        requestSteps: {
            title: "Akkamiin Barsiisaa Gaafatan",
            subtitle: "Daqiiqaa muraasa qofa fudhata. Tarkaanfii tokko tokkoon cuqaasi.",
            step1Title: "Foormii Guuti",
            step1Desc: "Maqaa kee, barnoota, kutaa, yeroo filannoo fi baajata galchi. Qabiyyee dabalataa yoo laatte, walitti simuu gaariidha.",
            step2Title: "Ilaallee Si Waliin Geenyaa",
            step2Desc: "Gareen keenya gaaffii kee ilaalee, barsiisaa siif ta'u filata.",
            step3Title: "Yeroo Barnoota Jalqabi",
            step3Desc: "Erga walitti simamtee booda, yeroo fi iddoo beeksisaaf qunnamtii siif goona."
        },
        becomeSteps: {
            title: "Akkamiin Barsiisaa Ta'an",
            subtitle: "Tarkaanfii sadii salphaan makamii. Tokkoo tokkoon cuqaasi.",
            step1Title: "Iyyannoo Galchi",
            step1Desc: "Maqaa kee, qunnamtii, barnoota barsiiftu, muuxannoo fi ibsa gabaabaa galchi.",
            step2Title: "Profaayilii Kee Ilaalaa",
            step2Desc: "Gareen bulchiinsaa iyyannoo kee ilaalee, barattootaaf ta'uu kee mirkaneessa.",
            step3Title: "Walitti Simamii Barsiisi",
            step3Desc: "Erga fudhatamtee booda, tarreessee barsiisota keessa galchamta. Gaaffiin barataa profaayilii kee waliin yoo walsime, si qunnamna."
        },
        footer: {
            rights: "Mirgi seeraan eegamaa dha.",
            tagline: "Barattoota barsiisota ogeeyyii waliin walqunnamsiisa."
        },
        jobs: {
            title: "Boordi Hojii Barsiisaa",
            heading: "Carraalee Barsiisuu Banaa",
            subtitle: "Kun gaaffii barattoota dhugaa gareen keenya maxxanse. Barbaachisaa yoo taate, barsiisaa ta'uuf iyyaadhu.",
            searchPlaceholder: "Barnoota, sadarkaan barbaadi...",
            openPositions: "iddoo banaa",
            openPositionsPlural: "iddoolee banaa",
            loading: "Fe'aa jira...",
            noJobs: "Hojiin banaan hin argamne",
            noJobsDesc: "Yeroo muraasa booda ilaali ykn barbaadaa kee sirreessi.",
            applyBtn: "Barsiisaa Ta'uuf Iyyaadhu",
            ctaTitle: "Miindaa sirrii hin argine?",
            ctaDesc: "Profaayilii barsiisaa kee galchi yeroo gaaffiin walsimu si waliin geenyaa.",
            ctaBtn: "Barsiisaa Ta'uuf Iyyaadhu",
            statusOpen: "Banaa",
            statusFilled: "Guutameera",
            statusClosed: "Cufameera",
            today: "Har'a",
            yesterday: "Kaleessa",
            daysAgo: "guyyaa dura",
            weeksAgo: "torbee dura",
            monthsAgo: "ji'a dura"
        },
        faq: {
            title: "Gaaffilee Yeroo Hedduu Gaafataman",
            subtitle: "Barattoota fi barsiisota walitti simsuuf barbaachisu hundumaa argadhu.",
            q1: "Kun marsariitii barnoota online dha?",
            a1: "Lakki. Hundee walitti simsiisuu qofa — odeeffannoo kee sassabnee barsiisaa siif ta'u waliin si geenyaa. Sagantaaleen hundi erga wal-qunnamtiin taasifamee booda kanaalee filattetti gaggeeffama.",
            q2: "Tartiibni walitti simsiisuu akkamitti hojjeta?",
            a2: "Barnoota, sadarkaa, yeroo fi afaan galchita. Gareen keenya ilaalee barsiisaa siif ta'u waliin si geenyaa.",
            q3: "Barsiisaa argachuuf yeroon meeqa fudhata?",
            a3: "Gaaffiin erga gahee booda sa'aatii 24-48 keessatti si waliin geenyaa.",
            q4: "Tajaajila kanaan fayyadamuuf kaffaltii jiraa?",
            a4: "Marsariitii keenya dhaan walitti simsisuun bilisaan. Kafaltiin barnoota kamiyyuu barsiisaa kee waliin kallattiidhaan waliigaltama.",
            q5: "Barnoota fi sadarkaa maalfaatu deeggara?",
            a5: "Sadarkaa sadarkaa jalqabaa hanga yunivarsiitii herrega, saayinsii, afaanota fi kkf deeggarama.",
            q6: "Barsiisaa Afaan Amaaraa ykn Oromoo dubbatu gaafachuu dandayaa?",
            a6: "Eeyyee. Barsiisotni keenya Afaan Ingilizii, Amaaraa fi Oromoo jiru. Gaaffii galchitetti afaan filannoo kee ibsi.",
            q7: "Barsiisaa dha — akkamiin makamaa?",
            a7: "'Barsiisaa Ta'i' cuqaasi, odeeffannoo kee guuti, gareen keenya ilaalee siif mirkanneessa. Erga fudhatamtee booda tarreessa barsiisota keessa galchamta."
        },
        readyToTeach: {
            tutorTitle: "Barsiisuu Jalqabuuf Qophii?",
            tutorDesc: "Beekumsa kee qoodi dhiibbaa dhugaa godhi. Barattootni siif barbaadaman waliin si geenyaa — kaffaltii malee.",
            tutorBullet1: "Profaayilii kee yeroo tokko galchi",
            tutorBullet2: "Barattootni siif ta'an waliin si geenyaa",
            tutorBullet3: "Sagantaa fi gatii kee of danda'e murteessi",
            tutorBtn: "Barsiisaa Ta'uuf Iyyaadhu",
            studentTitle: "Barsiisaa Barbaaddaa?",
            studentDesc: "Barnoota, sadarkaa fi yeroo kee nutti himi. Barsiisaa siif ta'u dafnee si waliin geenyaa.",
            studentBullet1: "Foormii salphaa tokko guuti",
            studentBullet2: "Ilaallee walitti simsiisina",
            studentBullet3: "Sa'aatii 24-48 keessatti walitti simamta",
            studentBtn: "Barsiisaa Gaafadhu"
        },
        common: {
            english: "English",
            amharic: "አማርኛ",
            oromo: "Afaan Oromo",
            jobBoard: "Boordi Hojii",
            step: "Tarkaanfii",
            pending: "Eeggataa",
            assigned: "Ramadameera",
            completed: "Xumurameera",
            approved: "Fudhatameera",
            rejected: "Diddameera",
            search: "Barbaadi...",
            filter: "Calaltu",
            actions: "Gocha",
            delete: "Haqi",
            edit: "Gulaali",
            save: "Olkaa'i",
            cancel: "Haqi",
            back: "Duuba"
        }
    }
};

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState(() => {
        return localStorage.getItem('app_lang') || 'en';
    });

    useEffect(() => {
        localStorage.setItem('app_lang', lang);
    }, [lang]);

    const t = (path) => {
        const keys = path.split('.');
        let result = translations[lang];
        for (const key of keys) {
            result = result?.[key];
        }
        return result || path;
    };

    return (
        <LanguageContext.Provider value={{ lang, setLang, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) throw new Error('useLanguage must be used within LanguageProvider');
    return context;
}