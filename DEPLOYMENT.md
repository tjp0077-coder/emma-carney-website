# Deployment Guide: Emma Carney Romance Website

This website is designed with **100% relative paths (`./`)** and zero external build steps, meaning it can be deployed immediately in either of the two configurations below without modifying a single line of code.

---

## Option 1: Deploy as a Subfolder on `michaelparkerbooks.com` (`/emmacarney`)

To have the site accessible at:
```
https://www.michaelparkerbooks.com/emmacarney/
```

### Steps:
1. In your `michaelparkerbooks` hosting root (or repository), create a subfolder named:
   ```
   emmacarney/
   ```
2. Copy the following files and folders from this project into that `emmacarney/` directory:
   ```
   emmacarney/
   ├── index.html
   ├── styles.css
   ├── script.js
   └── images/
   ```
3. That's it! Because all paths are relative (`images/3d/...`, `styles.css`), the site will work out of the box at `https://www.michaelparkerbooks.com/emmacarney/`.
4. Your main Michael Parker website in the root remains completely untouched.

---

## Option 2: Deploy as a Separate Standalone Domain or Subdomain

If you ever wish to deploy it to its own domain (e.g. `https://www.emmacarneybooks.com` or `https://romance.michaelparkerbooks.com`):
1. Connect this `Emma Carney` directory to GitHub or drag-and-drop onto Vercel / Netlify / Cloudflare Pages.
2. No build command is required (static HTML/CSS/JS).
3. The site will deploy instantly.
