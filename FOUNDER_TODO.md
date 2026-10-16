# Latvia Guide: Founder Launch Action List

This document lists all tasks that **only you (the founder)** can perform or approve before publicly sharing `https://latviaguide.com`. The technical team has set up all systems, safeguards, and draft templates; your decisions here finalize the launch.

---

## 1. Domain, Contact & Email Configuration
- [ ] **Set Official Contact Email in `src/config.ts`:**
  - Currently set to placeholder: `contact@latviaguide.com`.
  - Ensure your domain mailbox is created, receiving emails, and configured with SPF/DKIM/DMARC records.
  - Test sending an email from your phone to this address to verify inbox delivery.
- [ ] **DNS & Custom Domain Verification:**
  - Verify `https://latviaguide.com` has an active SSL certificate (HTTPS enforced).
  - Verify `www.latviaguide.com` properly redirects to `https://latviaguide.com` (or vice versa).

---

## 2. Personal Story & Photo for About Page
*The technical team has placed a ready-to-fill section structure that never exposes raw code to visitors.*
- [ ] **Supply Your Personal Story (English and Turkish):**
  - Why did you move to Latvia?
  - What was your biggest challenge when arriving (PMLP, bank account, housing search)?
  - Why did you decide to build this guide for other foreigners?
- [ ] **Provide a Photo (Optional but Recommended):**
  - Add a friendly, high-resolution portrait photo to `public/founder.jpg`.
  - If you prefer to remain anonymous, approve using an illustration or brand icon instead.

---

## 3. Legal & Regulatory Review
*Note: The technical team has drafted plain-English and Turkish GDPR-compliant Privacy Policy, Terms & Disclaimer, and Cookie notices based on the site's actual data footprint (no account creation, no first-party cookies, local storage for checklists, OpenStreetMap tiles).*
- [ ] **Configure Domain Email Inboxes / Forwarders:**
  - Create `privacy@latviaguide.com` and `legal@latviaguide.com` (or set them as email forwards to your primary address).
- [ ] **Fill Data Controller Details:**
  - In `src/pages/[lang]/privacy/index.astro`, replace or supplement the contact email with your registered entity name, registration number, or registered address in Latvia if operating as a company or self-employed sole proprietor.
- [ ] **Legal Review by a Qualified Professional:**
  - Have a legal advisor in Latvia/EU review the published policies:
    - Privacy Policy: `/en/privacy/` & `/tr/privacy/` (and alias `/tr/gizlilik/`)
    - Cookies Policy: `/en/cookies/` & `/tr/cookies/` (and alias `/tr/cerezler/`)
    - Terms of Service: `/en/terms/` & `/tr/terms/` (and alias `/tr/sartlar/`)

---

## 4. Analytics Decision (Privacy vs. Tracking)
*The dummy Google Tag Manager code (`G-XXXXXXXXXX`) has been deactivated because it lacked cookie consent and created performance/privacy liabilities.*
- [ ] **Choose an Analytics Approach:**
  - **Option A (Recommended for simplicity & GDPR compliance):** Use a cookieless, lightweight analytics tool like Plausible, Fathom, or Cloudflare Web Analytics. No cookie banner is required under EU law.
  - **Option B:** If using Google Analytics 4 (GA4), you must provide a valid measurement ID and approve integrating an EU cookie consent banner before GA4 scripts fire.

---

## 5. Visual Asset & Social Share Approval
- [ ] **Social Share Image (Open Graph / Twitter Card):**
  - Inspect `public/social-card.jpg` (or generated social card).
  - Confirm the brand colors, logo, and title typography represent your desired image when shared on WhatsApp, Telegram, LinkedIn, and Facebook.
- [ ] **Review Homepage Hero Image:**
  - Confirm you are happy with the Riga skyline hero image and contrast over dark background.

---

## 6. Real-Device Physical Testing
*Automated builds and tests run in headless environments; real human tactile feel requires your phone.*
- [ ] Test the site on your personal mobile phone (iOS Safari and Android Chrome).
- [ ] Run the 5-second test and 6 tasks from `USER_TEST_KIT.md` with 3 real expat friends in Riga.
- [ ] Test switching between English and Turkish on your phone.
- [ ] Test ticking items on the `/en/checklist/` and refreshing the page to verify your ticks stay saved.

---

## 7. Node Version & Server Environment
- [ ] When building or deploying in your hosting provider (Vercel, Netlify, Cloudflare Pages, or GitHub Actions), ensure the Node.js version is set to **`22.x`** (Astro 7 requires `>= 22.12.0`). A `.nvmrc` file specifying `22` has been added.
