# Emma Carney — Contemporary Romance Author Website

Official hero landing page and romance catalog for author **Emma Carney** (contemporary romance pen name of bestselling author Michael Parker).

---

## 🌸 Aesthetic & Design Features

- **Soft, Dreamy Romance Aesthetic**: Built with a delicate pastel palette of blush pink, soft rose, cream, warm porcelain, and rich dusty rose accents.
- **Elegant Typography**:
  - Headings: *Playfair Display*
  - Flowing Accent Script: *Alex Brush*
  - Body Text: *Plus Jakarta Sans*
- **Dynamic Pastel Orb Background**: Performant, hardware-accelerated CSS keyframe animations creating drifting, heavily blurred pastel orbs in rose, blush, and cream tones.
- **3D Book Presentations**:
  - High-resolution, realistic 3D angled book mockups with page block edge, spine crease highlight, ambient sheen, and soft floating drop shadows matching the presentation style of Michael Parker's main website.
  - Interactive mouse hover parallax tilt on book cards.
- **Complete Romance Catalog**:
  - **Dare to Dream** (Featured Release)
  - **Max and Emma**
  - **The Girl with No Name**
  - **Happy Lies the Heart**
  - **Chapel Acre**
- **Interactive Features**:
  - Full-viewport Hero with title treatment (*DARE to DREAM*), author eyebrow, tagline, and call-to-actions.
  - Featured Spotlight novel section with detailed synopsis and reading attributes.
  - Book Grid featuring all 4 novels with star ratings, Kindle Unlimited badges, and direct Amazon action buttons.
  - Interactive **Quick Synopsis Modal** for instant reader previews without leaving the page.
  - Behind the Pen / About Emma section highlighting her connection to Michael Parker.
  - Cross-navigation banner to Michael Parker's historical thriller catalog ([michaelparkerbooks.com](https://www.michaelparkerbooks.com/)).
  - Reader Club newsletter signup form with instant validation feedback.

---

## 📂 Project Structure

```
Emma Carney/
├── index.html               # Semantic, accessible, SEO-optimized landing page
├── styles.css               # Dreamy romance design system & responsive layout
├── script.js                # Interactive UI, 3D tilt, modal preview, newsletter
├── README.md                # Documentation & feature overview
├── DEPLOYMENT.md            # Subfolder & standalone hosting instructions
└── images/
    ├── author-portrait.jpg  # Warm romance author portrait
    ├── 3d/                  # 3D Angled Book Mockups (transparent PNGs)
    │   ├── dare-to-dream-3d.png
    │   ├── max-and-emma-3d.png
    │   ├── girl-with-no-name-3d.png
    │   └── happy-lies-the-heart-3d.png
    └── covers/              # High-resolution sharpened 2D covers (1000x1500)
        ├── dare-to-dream-2d.jpg
        ├── max-and-emma-2d.jpg
        ├── girl-with-no-name-2d.jpg
        └── happy-lies-the-heart-2d.jpg
```

---

## 🚀 How to Preview Locally

Double-click `index.html` to open in any web browser, or launch a quick local server:

```powershell
# Using Python
python -m http.server 3000

# Or using Node / npx
npx serve .
```

Then visit `http://localhost:3000`.
