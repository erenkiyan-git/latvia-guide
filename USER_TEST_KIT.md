# Latvia Guide: User Testing Kit

A practical, step-by-step kit for the founder to test Latvia Guide with 3–5 real foreigners (students, workers, or newcomers in Latvia).

---

## 1. Preparation Checklist
- [ ] Recruit 3–5 participants representing your audience (e.g. 1 student, 2 foreign workers/expats, 1 new resident).
- [ ] Prepare testing device: Use a real mobile phone (or laptop screen resized to mobile).
- [ ] Ensure browser cache is cleared or open an incognito window at `https://latviaguide.com` (or preview URL).
- [ ] Set up a notepad or recording tool (ask participant permission if recording audio/screen).
- [ ] **Golden Rule:** You are testing the *website*, not the participant. If they get confused, it is always a flaw in the site's design or copy. Remain silent while they browse; never explain how to use the site.

---

## 2. Test 1: The 5-Second Clarity Test

### Instructions for Tester
1. Hand the participant the mobile phone showing the homepage (`/en/` or `/tr/`).
2. Allow them to look at the screen for **exactly 5 seconds**.
3. Turn the screen face down or take the phone back.
4. Ask the 3 questions below immediately. Write down their exact words without correcting them.

### Questions
1. *"What is this website about?"*
2. *"Who is this website created for?"*
3. *"What would you click or do first on this page?"*

### Evaluation
- **Pass:** The participant clearly identifies it as a practical guide/portal for foreigners/immigrants in Latvia and mentions searching or browsing topics.
- **Fail:** The participant thinks it is an official government embassy site, a tourist travel agency selling tours, or doesn't know where to start.

---

## 3. Test 2: Six Realistic Tasks

Have the participant hold the phone and read each task prompt aloud. Ask them to "think out loud" as they tap and scroll.

### Task 1: Address Registration (Deklarēšanās)
* **Prompt:** *"Imagine you just rented an apartment in Riga. Find out how and where to register your official living address."*
* **Target Destination:** `/en/guides/documents/address-declaration/`
* **Observe:** Do they use the search bar, look under 'Documents', or get lost? Do they notice the official source box?
* **Success criteria:** Completed in under 60 seconds with confidence.

### Task 2: Finding a Family Doctor (Ģimenes ārsts)
* **Prompt:** *"You have caught a fever and need to register with a local doctor. Find out how the healthcare system works and how to get a family doctor."*
* **Target Destination:** `/en/guides/healthcare/family-doctor/`
* **Observe:** Do they find the Healthcare section easily? Do they notice the difference between state and private healthcare?
* **Success criteria:** Locates the doctor guide without frustration.

### Task 3: Finding the PMLP Office on the Map
* **Prompt:** *"You need to collect your eID card. Find the nearest PMLP immigration office in Riga on the map and check its address."*
* **Target Destination:** `/en/map/` (filtering by immigration offices)
* **Observe:** Does the map load smoothly? Can they switch between map and list view? Do they tap 'Directions' or 'Official Website'?
* **Success criteria:** Identifies an office address in under 45 seconds.

### Task 4: First Week / Arrival Checklist
* **Prompt:** *"You arrived in Riga 2 days ago. Find the step-by-step checklist of what you must do in your first month and mark 1 task as completed."*
* **Target Destination:** `/en/checklist/`
* **Observe:** Does the progress bar update when they check an item? Do they understand that their progress is saved automatically?
* **Success criteria:** Finds checklist, ticks an item, observes percentage update.

### Task 5: Visa & Permit Hub
* **Prompt:** *"A friend from outside the European Union wants to work remotely from Latvia. Find out if Latvia offers a Digital Nomad Visa and what the main requirement is."*
* **Target Destination:** `/en/guides/documents/digital-nomad-visa/`
* **Observe:** Do they notice the trust badge? Do they see the official source link?
* **Success criteria:** Finds the nomad visa guide in under 60 seconds.

### Task 6: Switching Language
* **Prompt:** *"Switch the website language from English to Turkish (or Turkish back to English)."*
* **Target Destination:** Header language dropdown or mobile menu language buttons.
* **Observe:** Do they find the language toggle on mobile in under 5 seconds? Does the page reload to the same guide in the other language?
* **Success criteria:** Immediate language switch without losing context.

---

## 4. Problem Logging Matrix

When observing, record issues into these 3 categories:

| Level | Severity | Definition | Action Required |
| :--- | :--- | :--- | :--- |
| **P1** | **Critical Blocker** | Participant cannot complete the task or gets completely stuck. | Immediate redesign or rewrite. |
| **P2** | **Minor Friction** | Participant hesitated, took a wrong turn, or had to re-read confusing text before succeeding. | Clarify copy or button label. |
| **P3** | **Suggestion** | Participant completed the task but suggested an idea or extra feature. | Add to "Ideas for later". |

---

## 5. One-Page Results Template

*Copy this template for each participant session.*

```text
=====================================================
LATVIA GUIDE - USER SESSION REPORT
=====================================================
Participant #: ______    Date: ____________    Device: ___________________
Native Language: _________________    Status: [Student / Worker / Nomad / Other]

5-SECOND TEST:
- What is this site about? _________________________________________________
- Who is it for? ___________________________________________________________
- First action clicked? ____________________________________________________
Result: [ ] Pass    [ ] Partial    [ ] Fail

TASK PERFORMANCE:
Task 1 (Address Deklarēšanās) : [ ] Pass  [ ] Struggle  [ ] Fail   Time: ____s
Task 2 (Family Doctor)        : [ ] Pass  [ ] Struggle  [ ] Fail   Time: ____s
Task 3 (PMLP on Map)          : [ ] Pass  [ ] Struggle  [ ] Fail   Time: ____s
Task 4 (First Month Checklist): [ ] Pass  [ ] Struggle  [ ] Fail   Time: ____s
Task 5 (Nomad Visa)           : [ ] Pass  [ ] Struggle  [ ] Fail   Time: ____s
Task 6 (Language Switch)      : [ ] Pass  [ ] Struggle  [ ] Fail   Time: ____s

OBSERVED ISSUES:
1. [P1 / P2 / P3] Description: _____________________________________________
2. [P1 / P2 / P3] Description: _____________________________________________
3. [P1 / P2 / P3] Description: _____________________________________________

PARTICIPANT FEEDBACK:
- Most helpful part: _______________________________________________________
- Most confusing part: _____________________________________________________
- Would you recommend this to a new friend in Latvia? [ ] Yes  [ ] No
```
