# How to Edit Your Website (For Non-Programmers)

Welcome to Latvia Guide! Your website is built to be extremely fast, secure, and easy to edit without needing to know any complex coding languages.

This document explains how to change text, add new guides, and update tools.

---

## 1. How to start the website on your computer
To see your changes live on your computer:
1. Open your terminal or command prompt.
2. Make sure you are in the `latvia-guide` folder.
3. Run this command:
   ```bash
   npm run dev
   ```
4. Open your web browser and go to `http://localhost:4321`.
5. Whenever you save a file, the browser will update automatically!

---

## 2. How to Edit or Add a Guide
All guides are located in the `src/content/guides/` folder. They are organized by language (e.g., `en` for English, `tr` for Turkish) and then by category (e.g., `housing`, `work`).

### To edit an existing guide:
1. Open the file you want to edit (for example: `src/content/guides/en/work/finding-a-job.mdx`).
2. You will see some text at the very top between `---` lines. This is the **settings** of the page (called Frontmatter).
   ```yaml
   ---
   title: "Finding a Job"
   description: "The best websites and channels to look for work in Latvia."
   section: "work"
   badge: "draft"
   verified: false
   ---
   ```
3. Below the second `---`, you can edit the text just like a normal document.
4. Use `#` for big titles, `##` for subtitles, and `*` for bullet points.

### To change the Trust Badge:
In the settings at the top of the file, change `badge:` to one of these exact words:
* `badge: "official"` (Green - strict government info)
* `badge: "verified"` (Blue - checked by locals)
* `badge: "draft"` (Yellow - not yet checked)

### To add a Warning Box:
Inside your text, you can add a warning by typing:
```html
<WarningBox>
  Your warning text goes here! Watch out for scams!
</WarningBox>
```

---

## 3. How to Edit Useful Websites & Phrases
You don't need to touch any code! Just open the data files.

* **To edit Websites:** Open `src/data/links.json`. You can easily change titles, URLs, and descriptions.
* **To edit Phrases:** Open `src/data/phrases.json`. You can add new words or change the translations.
* **To edit the 30-Day Checklist:** Open `src/data/checklist.json`. 

---

## 4. How to Edit Homepage Text (Translations)
If you want to change the text on the homepage buttons or the footer, you edit the dictionary files:
* For English: `src/i18n/en.json`
* For Turkish: `src/i18n/tr.json`

Just find the text you want to change and rewrite the part in quotes on the right side.
*Example: `"home.problem.doctor": "I need a doctor"`*

---

## 5. How to Publish Your Changes
When you are happy with your edits:
1. Stop the local server by pressing `Ctrl + C` in your terminal.
2. Run this command to verify there are no errors:
   ```bash
   npm run build
   ```
3. If it says "Complete!", your site is ready to be uploaded to your hosting provider (like Vercel, Netlify, or GitHub Pages).
