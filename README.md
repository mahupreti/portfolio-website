# Mahesh Upreti — Portfolio

Personal portfolio website for Mahesh Upreti, CloudOps Engineer & AI Enthusiast.

Live at: [maheshupreti.com](https://maheshupreti.com)

---

## About

A fully static, single-page portfolio built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step, no dependencies. Designed with a dark/light theme toggle, smooth scroll animations, and a responsive layout that works on all screen sizes.

## Features

- Dark / light mode toggle with `localStorage` persistence and OS preference detection
- Scroll-triggered reveal animations using `IntersectionObserver`
- Animated stat counters
- Responsive mobile navigation with hamburger menu
- Contact form with client-side validation
- Sections: Hero, About, Skills, Certifications, Projects, Experience, Education, Awards, Community, Contact

## Tech Stack

| Layer | Choice |
|-------|--------|
| Markup | HTML5 |
| Styling | CSS3 (custom properties, grid, flexbox) |
| Scripting | Vanilla JavaScript (ES6+) |
| Fonts | Inter + JetBrains Mono via Google Fonts |
| Hosting | Cloudflare Pages |

## Project Structure

```
portfolio/
├── index.html      # Main HTML — all sections
├── styles.css      # All styles including dark/light theme
├── script.js       # Animations, nav, theme toggle, form
├── .gitignore
└── README.md
```

## Local Development

No build step needed. Just open `index.html` in your browser:

```bash
# Option 1 — open directly
open index.html

# Option 2 — serve locally with Python
python3 -m http.server 8080
# then visit http://localhost:8080

# Option 3 — serve with Node
npx serve .
```

## Deployment

Hosted on **Cloudflare Pages** with automatic deployments on every push to `main`.

To deploy your own fork:
1. Fork this repo
2. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
3. Connect your GitHub repo
4. Leave build settings blank (no framework, no build command)
5. Click **Save and Deploy**

Custom domain is configured via Cloudflare Pages → Custom Domains.

## Contact

- Email: [maheshupretiofficial@gmail.com](mailto:maheshupretiofficial@gmail.com)
- LinkedIn: [linkedin.com/in/mahesh-upreti-](https://www.linkedin.com/in/mahesh-upreti-/)
- GitHub: [github.com/mahupreti](https://github.com/mahupreti)
- Dev.to: [dev.to/mahupreti](https://dev.to/mahupreti)
- Website: [guidekorner.com](https://guidekorner.com)

---

&copy; 2026 Mahesh Upreti
