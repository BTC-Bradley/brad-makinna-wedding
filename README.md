# MaKinna & Bradley Wedding Website

A beautiful, responsive wedding website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🎨 Rustic, romantic design with earthy tones
- 📱 Fully responsive for all devices
- ⏰ Countdown timer to the wedding day
- 📝 RSVP form with meal preferences
- 📸 Photo gallery with lightbox
- 📍 Venue details and Google Maps integration
- 🏨 Accommodation recommendations
- 🎁 Registry information
- 📞 Contact form
- 📖 Our story timeline

## Getting Started

### Prerequisites

- Node.js 18.x or later
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/bradley-makinna-wedding.git
   cd bradley-makinna-wedding
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env.local` file in the root directory and add your environment variables:
   ```
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Customization

### Content

1. Update the wedding details in `src/app/page.tsx`:
   - Wedding date and time
   - Venue information
   - Countdown timer target date

2. Modify the timeline in `src/app/story/page.tsx`:
   - Add or remove timeline events
   - Update story text and images
   - Customize the timeline layout

3. Update hotel information in `src/app/accommodations/page.tsx`:
   - Add or remove hotel options
   - Update room rates and availability
   - Add booking links and special codes

4. Add your registry links in `src/app/registry/page.tsx`:
   - Add registry store names and links
   - Customize registry descriptions
   - Add registry store logos

5. Update the RSVP form in `src/app/rsvp/page.tsx`:
   - Modify meal options
   - Add or remove guest information fields
   - Update RSVP deadline

### Images

1. Replace placeholder images in the `public/images` directory:
   - `hero-bg.jpg` - Hero section background
   - `story-1.jpg` through `story-4.jpg` - Timeline photos
   - `gallery-1.jpg` through `gallery-6.jpg` - Gallery photos
   - `avatar.jpg` - Profile picture in header

2. Update image metadata in `src/app/gallery/page.tsx`:
   - Add image captions
   - Modify image descriptions
   - Update image credits

### Colors and Typography

The color scheme and typography can be customized in `tailwind.config.js`:

```js
theme: {
  extend: {
    colors: {
      sage: '#9CAF88',
      ivory: '#FFFFF0',
      taupe: '#B5A99C',
      rose: '#E8B4BC',
      earth: '#8B7355',
    },
    fontFamily: {
      serif: ['Playfair Display', 'serif'],
      sans: ['Montserrat', 'sans-serif'],
      script: ['Dancing Script', 'cursive'],
    },
  },
}
```

### Forms and Data Management

1. RSVP Form (`src/app/rsvp/page.tsx`):
   - Currently stores responses in JSON files
   - For production:
     - Set up a database (PostgreSQL, MongoDB, etc.)
     - Implement email notifications (SendGrid, AWS SES)
     - Add form validation and spam protection
     - Consider using a form service like Formspree or Netlify Forms

2. Contact Form (`src/app/contact/page.tsx`):
   - Similar setup to RSVP form
   - Add reCAPTCHA or similar spam protection
   - Configure email notifications for form submissions

### Deployment

1. Choose a hosting platform:
   - Vercel (recommended for Next.js)
   - Netlify
   - AWS Amplify

2. Set up environment variables:
   ```
   NEXT_PUBLIC_SITE_URL=your-production-url
   ```

3. Configure custom domain:
   - Update DNS settings
   - Set up SSL certificate
   - Configure redirects if needed

### Additional Customization

1. Navigation (`src/components/Header.tsx`):
   - Modify navigation items
   - Update mobile menu behavior
   - Customize header styling

2. Layout (`src/app/layout.tsx`):
   - Update metadata
   - Modify global styles
   - Add analytics or tracking scripts

3. Components:
   - Customize reusable components in `src/components/`
   - Add new components as needed
   - Modify existing component styles

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Configure environment variables
4. Deploy

### Other Platforms

The site can be deployed to any platform that supports Next.js:

1. Build the site:
   ```bash
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```bash
   npm start
   # or
   yarn start
   ```

## Domain Setup

1. Purchase a domain (e.g., from GoDaddy, Namecheap)
2. Add DNS records pointing to your hosting provider
3. Configure SSL certificate

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Fonts from Google Fonts
- Icons from Heroicons
- Images from Unsplash (replace with your own)
