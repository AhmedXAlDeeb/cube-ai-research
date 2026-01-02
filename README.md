
# CUBE.AI Research Library

This repository hosts **CUBE.AI’s collaborative research reading environment**.
It allows the team to curate papers, read them together, annotate with shared insights, and maintain internal research reports in a structured, versioned way.

🔗 **Open the Research App:**

> *(Insert deployment link here)*

---

## 🚀 1. First-Time Setup & Login

To use the Research App, you must authenticate using a **GitHub Personal Access Token (PAT)**.
This ensures that:

* All comments are attributed to the correct team member
* Private papers and internal reports are accessible

---

### Step A: Generate a GitHub Personal Access Token

1. Log in to your GitHub account
2. Click your profile picture → **Settings**
3. In the left sidebar, scroll down and select **Developer settings**
4. Go to **Personal access tokens → Tokens (classic)**
5. Click **Generate new token → Generate new token (classic)**

Use the following settings:

* **Note:** `CUBE AI App`
* **Expiration:** No expiration (or 90 days if required)
* **Scopes (CRITICAL):**

  * ✅ `repo` (Full control of private repositories)

6. Click **Generate token**
7. **Copy the token immediately** (you will not see it again)

---

### Step B: Connect the Research App

1. Open the **Research App**
2. On the configuration screen, enter:

* **Repository Owner:**
  Your GitHub username *or* the organization name

* **Repository Name:**
  `cube-ai-research`

* **Personal Access Token:**
  Paste the token you generated

* **DB File Path:**
  Leave as:

  ```
  cube-ai-library.json
  ```

3. Click **Connect & Verify**

Once verified, the app is ready to use.

---

## 📚 2. Adding Papers to the Library

### Option A: ArXiv Papers (Recommended)

Use this option for **public research papers hosted on ArXiv**.

1. Click **Add Paper**
2. Select **ArXiv URL**
3. Paste:

   * An ArXiv ID (e.g. `2510.09404`)
   * **or** the full ArXiv URL
4. Add tags (e.g. `Phase 2`, `Agents`)
5. Click **Add**

The paper will be fetched and rendered automatically.

---

### Option B: Local PDFs (Internal Reports & Private Documents)

Use this for **internal reports, drafts, or non-public papers**.

#### Phase 1: Upload the PDF

1. Navigate to the project folder:

   ```
   cube-ai-research/
   ```

2. Place the PDF inside:

   ```
   public/papers/
   ```

3. **Naming rule:**

   * Avoid spaces
   * Use underscores
   * Example: `Phase1_Report.pdf`

4. Push the file to GitHub:

   ```bash
   git add public/papers/Phase1_Report.pdf
   git commit -m "Add internal report"
   git push origin main
   ```

5. Wait **1–2 minutes** for deployment to complete
   (check the **Actions** tab on GitHub)

---

#### Phase 2: Register the Paper in the App

1. Open the Research App

2. Click **Add Paper**

3. Select **PDF in Repo**

4. Fill in:

   * **Title:** Descriptive paper name
   * **File Path:** Path starting from `papers/`

   Example:

   ```
   papers/Phase1_Report.pdf
   ```

5. Click **Add**

---

## ✍️ 3. Collaborative Reading & Annotation

### Reading

* Clicking a paper opens it in the reader
* **ArXiv papers** use a structured HTML reader
* **Internal PDFs** open in a secure PDF viewer

### Commenting

* Use the **chat sidebar on the right** to leave notes, questions, or critiques
* All comments are attributed to your GitHub identity

### Highlighting Workflow

Because PDFs are immutable, highlights are handled explicitly:

1. Copy the relevant text from the paper
2. Paste it into the **Quote** field in the sidebar
3. (Optional) Add the **Page Number**
4. Write your comment and submit

This keeps discussions precise and searchable.

---

## 🛠️ 4. Development & Deployment Guide

This section is for **developers maintaining the research app**.

---

### Installation

```bash
# Clone the repository
git clone https://github.com/<YOUR-USERNAME>/cube-ai-research.git
cd cube-ai-research

# Install dependencies
npm install
```

---

### Running Locally

To test features locally:

```bash
npm run dev
```

---

### Deploying Updates

If you:

* Modify the application code (`src/App.jsx`)
* Add or update PDFs inside `public/`

You must deploy for changes to be visible to the team.

#### Step 1: Commit Source Changes

```bash
git add .
git commit -m "Update app / add papers"
git push origin main
```

#### Step 2: Deploy to Live Site

```bash
npm run build
npm run deploy
```

---

### Troubleshooting Deployment

* Wait **2 minutes** and refresh the site
* If changes do not appear:

  * Go to the **Actions** tab on GitHub
  * Ensure **pages-build-deployment** completed successfully

---

## ✅ Intended Usage Philosophy

This repository treats papers as **living research artifacts**:

* PDFs are the source
* Annotations are discussions
* Notes are versioned knowledge
* Decisions are traceable

Use it to **read, critique, and build together** — not just archive papers.

---
