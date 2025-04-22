# Bradley & MaKinna Wedding Website

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

1. Update the wedding details in `src/pages/index.tsx`
2. Modify the timeline in `src/pages/story.tsx`
3. Update hotel information in `src/pages/accommodations.tsx`
4. Add your registry links in `src/pages/registry.tsx`

### Images

1. Replace placeholder images in the `public/images` directory:
   - `hero-bg.jpg` - Hero section background
   - `story-1.jpg` through `story-4.jpg` - Timeline photos
   - `gallery-1.jpg` through `gallery-6.jpg` - Gallery photos

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

### Forms

The RSVP and contact forms currently store data in JSON files. For production, you should:

1. Set up a proper database (e.g., PostgreSQL, MongoDB)
2. Implement email notifications using a service like SendGrid
3. Add form validation and spam protection

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
