# Kunal Gupta — Portfolio

Personal portfolio site. Plain HTML/CSS/JS, no build step, no framework, no tracking.

## Structure

```
portfolio-site/
├── index.html        # page content
├── css/
│   └── style.css      # all styling
├── js/
│   └── script.js       # scroll-based nav highlighting (progressive enhancement)
├── assets/
│   └── favicon.svg     # tab icon
└── README.md
```

## Run locally

No build tools needed — just open `index.html` in a browser, or serve it locally:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

This repo is structured to work directly with **GitHub Pages** — see the deployment
steps in the chat, or: Settings → Pages → Deploy from branch → `main` → `/ (root)`.
