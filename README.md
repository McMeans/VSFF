# Virginia Student Film Festival Website

Website for the Virginia Student Film Festival.

## Project Structure

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
│   └── media/
│       ├── images/        # Image assets
│       │   ├── Bird Logo 2.jpg
│       │   ├── Logo.jpg
│       │   └── [Executive board photos]
│       ├── favicon.ico    # Site favicon
│       ├── icon.png       # App icon
│       └── icon.svg       # Vector icon
├── robots.txt             # Search engine directives
├── site.webmanifest       # PWA manifest
└── webpack.*.js           # Webpack configuration files
```

## Development

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm start
```

Build for production:
```bash
npm run build
```

## Features

- Single-page application with sections for:
  - Home
  - Mission Statement
  - Executive Board Bios
  - Event Details
  - Festival History
  - Featured Videos (with upload capability)

## License

See LICENSE.txt for details.
