# Support Request — Production Credentials

Use one of the messages below depending on your contact method.

---

## English Version (Email / Support Ticket)

**Subject**: Request for Production API Credentials — Al-Askari Holy Shrine Donation Platform

---

Dear QiCard Payment Gateway Support Team,

I hope this message finds you well.

My name is [Your Name], and I am the developer responsible for integrating the QiCard Payment Gateway into the official donation platform for **Al-Askari Holy Shrine (العتبة العسكرية المقدسة)** in Samarra, Iraq.

We have successfully completed the integration and tested it using the sandbox environment with the provided test credentials:

- **Base URL**: `https://uat-sandbox-3ds-api.qi.iq/api/v1`
- **Username**: `paymentgatewaytest`
- **Terminal ID**: `237984`

The integration is now fully functional and ready for production deployment. We are accepting charitable donations on behalf of the shrine through our platform at:

**Platform**: Al-Askari Holy Shrine Donation Website  
**Payment Method**: QiCard (Mastercard via Qi Card gateway)  
**Currency**: IQD (Iraqi Dinar)  
**Transaction Type**: One-time charitable donations

We would like to request the following **production credentials** to go live:

1. Production `username`
2. Production `password`
3. Production `terminalId`
4. Production `base URL`

Additionally, please confirm:
- The correct `finishPaymentUrl` format expected by the production gateway
- Any IP whitelisting requirements for our server
- Whether there are any additional steps required before going live (KYC, contract signing, etc.)

Please find our technical contact details below:

- **Developer Name**: [Your Name]
- **Email**: [your@email.com]
- **Phone**: [your phone number]
- **Organization**: العتبة العسكرية المقدسة (Al-Askari Holy Shrine)
- **Website**: [your website URL]

Thank you for your support. We look forward to hearing from you.

Best regards,  
[Your Name]  
[Your Title / Role]  
[Your Contact Information]

---

## Arabic Version (رسالة عربية)

**الموضوع**: طلب بيانات اعتماد الإنتاج — منصة تبرعات العتبة العسكرية المقدسة

---

السادة فريق دعم بوابة الدفع Qi Card المحترمون،

تحية طيبة وبعد،

أنا [اسمك]، المطور المسؤول عن دمج بوابة الدفع QiCard في منصة التبرعات الرسمية للعتبة العسكرية المقدسة في سامراء، العراق.

لقد أكملنا عملية الدمج بنجاح واختبرناها باستخدام بيئة الاختبار (Sandbox) بالبيانات التجريبية المتوفرة:

- **Base URL**: `https://uat-sandbox-3ds-api.qi.iq/api/v1`
- **Username**: `paymentgatewaytest`
- **Terminal ID**: `237984`

المنصة جاهزة تقنياً للنشر الفعلي، ونرغب في الحصول على بيانات اعتماد بيئة الإنتاج لبدء استقبال التبرعات الحقيقية.

**تفاصيل المشروع**:
- **المنصة**: موقع تبرعات العتبة العسكرية المقدسة
- **طريقة الدفع**: كي كارد (Mastercard عبر بوابة Qi Card)
- **العملة**: الدينار العراقي (IQD)
- **نوع المعاملات**: تبرعات خيرية لمرة واحدة

نطلب منكم تزويدنا بالبيانات التالية لبيئة **الإنتاج (Production)**:

1. اسم المستخدم (username)
2. كلمة المرور (password)
3. معرّف المحطة (terminalId)
4. رابط API الأساسي (Base URL)

كما نرجو إبلاغنا بـ:
- الصيغة الصحيحة لـ `finishPaymentUrl` المطلوبة في بيئة الإنتاج
- أي متطلبات لتحديد عناوين IP المسموح بها لخادمنا
- أي خطوات إضافية قبل الإطلاق الرسمي (توثيق الهوية، توقيع عقد، إلخ)

**بيانات التواصل**:
- **اسم المطور**: [اسمك]
- **البريد الإلكتروني**: [بريدك الإلكتروني]
- **رقم الهاتف**: [رقم هاتفك]
- **الجهة**: العتبة العسكرية المقدسة
- **الموقع الإلكتروني**: [رابط موقعك]

شاكرين حسن تعاونكم، ونتطلع إلى ردكم الكريم.

مع التقدير،  
[اسمك]  
[مسماك الوظيفي]  
[بيانات التواصل]

---

## Where to Send

| Channel | Details |
|---|---|
| Developer Portal | https://developers-gate.qi.iq |
| QiCard Website | https://qi.iq/en/home |
| Support (general) | Check https://qi.iq/en/home for contact info |

---

## What to Expect Back

QiCard will likely ask for:

1. **Business registration documents** — to verify the organization is legitimate
2. **Contract/agreement** — merchant agreement with QiCard / International Smart Card (ISC)
3. **Website review** — they may review the donation platform before approving
4. **Bank account details** — for settlement of collected funds

Once approved, they will provide:
- Production `QICARD_USERNAME`
- Production `QICARD_PASSWORD`
- Production `QICARD_TERMINAL_ID`
- Production `QICARD_BASE_URL`

Replace these in `.env.local` and the platform is live.
