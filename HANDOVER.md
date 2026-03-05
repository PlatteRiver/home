# Platte River Analytics – Website Handover

Simple guide for the next person who owns or maintains this site.

---

## Credentials (fill in and store securely)

### GitHub
- **What it is:** Where the website code lives (version history, branches).
- **Repo:** _e.g. `PlatteRiver/home` or your org/repo URL_
- **Access:**
  - **Username / email:** _________________________________
  - **Password or personal access token:** _________________________________
- **What you use it for:** Pushing code changes; Netlify watches this repo and redeploys when you push.

### Netlify
- **What it is:** Hosting and forms. Builds the site from GitHub and serves it at your live URL. Receives contact and training-registration form submissions.
- **Site URL:** _e.g. `https://yoursite.netlify.app` or `https://www.platte-river.com`_
- **Login:** https://app.netlify.com
  - **Email:** _________________________________
  - **Password:** _________________________________
- **What you use it for:** See builds and deploy status; view form submissions (Contact + Training Registration); change domain or env vars if needed.

---

## Tech stack

| Layer | Technology |
|-------|------------|
| Framework | React 18 |
| Build tool | Vite 5 |
| Styling | Tailwind CSS (via CDN in `index.html`) |
| Routing | React Router 6 |
| Icons | Font Awesome (self-hosted) |
| SEO (per-page title/description) | react-helmet-async |
| Hosting & forms | Netlify |

---

## Project structure (what matters)

- **`/`** – Home (hero, services, industries, contact form, etc.)
- **`/blog`** – Blog listing (posts are in code in `src/pages/Blog.jsx` for now).
- **`/about`** – About page.
- **`/training`** – Training courses + registration form.
- **`/acrevision`** – AcreVision product page.

Code lives mainly in `src/`: `pages/` (one file per route), `components/` (Navbar, Footer, etc.). Static assets (images, favicon) are in `public/`.

---

## Running and building locally

- **Install dependencies:** `npm install`
- **Run dev server:** `npm run dev` → open the URL shown (e.g. http://localhost:5173)
- **Production build:** `npm run build` → output in `dist/`
- **Preview production build:** `npm run preview`

Forms (contact, training registration) **do not submit** on localhost; they work when the site is deployed on Netlify (or when using `netlify dev`).

---

## Forms (Netlify)

Two forms are wired to Netlify:

1. **Contact** – On the home page (“Ready to Transform Your Spatial Data…”). Submissions appear in Netlify dashboard under **Forms**.
2. **Training registration** – On the `/training` page. Same place in Netlify **Forms**.

Both use honeypot fields to reduce spam. To get email notifications or connect to other tools, configure that in Netlify under the site’s **Form settings** (or notifications).

---

## Deploying changes

1. Edit code locally.
2. Commit and push to the branch Netlify watches (usually `main`).
3. Netlify automatically runs `npm run build` and deploys. Check the **Deploys** tab in Netlify for status and logs.

---

## Other useful info

- **Live site / canonical URL:** All SEO and canonicals use `https://www.platte-river.com`. If the live URL is different, search for `platte-river.com` and `SITE_URL` in the repo and update.
- **Blog content:** Posts are defined in `src/pages/Blog.jsx` (no CMS). To add or edit a post, edit that file and add an object to the `blogPosts` array.
- **Tailwind:** Styling is loaded via the Tailwind CDN in `index.html`. For production hardening later, the project could be switched to build-time Tailwind (see Tailwind docs).

---

*Update this file when credentials or URLs change; keep a secure copy of credentials and don’t commit passwords or tokens to the repo.*
