# Virginia Student Film Festival Website

A modern, single-page website for the Virginia Student Film Festival showcasing submissions, important dates, and contact information.

## 🎬 Project Structure

```
VSFF/
├── index.html              # Main single-page website
├── 404.html               # Custom 404 error page
├── upload.php             # Media upload handler
├── css/                   # Stylesheets
│   └── style.css
├── js/                    # JavaScript files
│   └── script.js
├── static/                # Static assets
│   ├── images/           # Image assets
│   │   ├── vsff-icon.png
│   │   └── vsff-hero.png
│   ├── icons/            # SVG icons
│   │   ├── film.svg
│   │   ├── award.svg
│   │   ├── calendar.svg
│   │   ├── trophy.svg
│   │   ├── document.svg
│   │   ├── heart.svg
│   │   └── users.svg
│   └── favicon.ico       # Site favicon
├── netlify.toml          # Netlify configuration
├── robots.txt            # Search engine directives
├── site.webmanifest      # PWA manifest
└── webpack.*.js          # Webpack configuration files
```

## 🚀 Development

### Installation
```bash
npm install
```

### Start Development Server
```bash
npm start
```
This runs the webpack dev server with hot reload at `http://localhost:8081`

### Build for Production
```bash
npm run build
```
This creates an optimized build in the `dist` folder.

## ✨ Features

### Website Sections
- **Home** - Hero section with call-to-action buttons
- **Features** - Showcase, awards, and annual event highlights
- **About** - Mission, vision, values, and community
- **Submissions** - Film submission guidelines and important dates
- **Contact** - Contact form with Netlify Forms integration

### Contact Form
- ✅ Netlify Forms integration (no backend needed)
- ✅ Email validation (client & server)
- ✅ Spam protection (honeypot field)
- ✅ Success/error messaging
- ✅ Form submissions viewable in Netlify dashboard

### Technical Features
- Responsive design (mobile, tablet, desktop)
- Smooth scrolling navigation
- Active section highlighting
- Animated elements on scroll
- Custom 404 page
- SEO-friendly structure

## 🚢 Deployment

This site is configured for **Netlify** deployment.

### Quick Deploy
1. Push to GitHub
2. Connect repository to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Deploy!

For detailed deployment instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md)

### Environment
- **Framework**: Vanilla HTML/CSS/JS
- **Build Tool**: Webpack 5
- **Hosting**: Netlify
- **Forms**: Netlify Forms

## 📝 License

See [LICENSE.txt](./LICENSE.txt) for details.

## 📧 Contact

Website: [vastudentfilmfest.com](https://vastudentfilmfest.com)  
Email: vastudentff@gmail.com  
Instagram: [@vastudentfilmfest](https://www.instagram.com/vastudentfilmfest/)
