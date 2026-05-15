# CSP Frontend

This repository contains the frontend HTML, CSS, and JavaScript for a web-based ATM and banking interface.

## Features

- **Comprehensive Banking Workflows**: Includes interfaces for Domestic and International transactions, Deposits, Withdrawals, Fast Cash, Balance Enquiry, and PIN management.
- **Centralized CSS**: All styling is managed globally via `styles.css`. Each page's styling is scoped specifically to prevent cascading conflicts, ensuring visual consistency across all views.
- **Dynamic JavaScript Validation**: Form inputs are validated in real-time across the application using `validation.js`.
  - Enforces strict rules for Usernames (min 5 characters, alphanumeric).
  - Enforces strong Password policies (min 8 characters, uppercase, lowercase, numbers, and special characters).
  - Ensures Account Numbers are exactly 12 digits.
  - Validates standard IFSC codes.
- **Responsive Error Handling**: Validation errors trigger dynamic, styled warning messages that seamlessly fade into the UI to guide the user.

## Structure

- `*.html`: The various frontend pages (e.g., `index.html`, `deposit.html`, `withdraw.html`).
- `styles.css`: The central stylesheet for the entire application.
- `validation.js`: The global form validation script that handles client-side input rules.
- `*_icon.png`: Visual assets used across the interface.

## Setup & Deployment

Since this project consists of static HTML, CSS, and JS files, it is completely deploy-ready. You can serve this project using any static file server or host it directly on platforms like Vercel, Netlify, or GitHub Pages.

To view locally, simply open `index.html` in any modern web browser.
