# Tech Stack

## Framework & Build System
- **Nuxt 3** (v3.17.6) - Vue.js meta-framework with SSR disabled (SPA mode)
- **Vue 3** (v3.5.17) - Frontend framework with Composition API
- **Vite** - Build tool and dev server
- **TypeScript** - Type safety throughout the codebase

## Mobile & PWA
- **Capacitor** (v7.4.2) - Native mobile app wrapper
- **@vite-pwa/nuxt** - PWA functionality with service worker
- **iOS Support** - Native iOS app via Capacitor

## Styling & UI
- **Tailwind CSS** - Utility-first CSS framework
- **HeadlessUI Vue** - Unstyled accessible UI components
- **Phosphor Icons** - Icon library
- **Dark Mode** - Class-based dark mode support

## Backend & Auth
- **Supabase** - Backend-as-a-Service for auth and database
- **Pinia** - State management

## Development Tools
- **ESLint** - Code linting with Nuxt ESLint config
- **PostCSS** - CSS processing

## Common Commands

### Development
```bash
npm run dev              # Start dev server on all interfaces
npm run dev:mobile       # Start dev server for mobile testing (port 3000)
```

### Building
```bash
npm run build           # Build for production
npm run generate        # Generate static site
npm run preview         # Preview production build
npm run preview:mobile  # Preview on mobile (port 4173)
```

### Mobile Development
```bash
npm run ios:build       # Generate and sync iOS build
npm run ios:open        # Open iOS project in Xcode
```

### Setup
```bash
npm install            # Install dependencies
npm run postinstall    # Prepare Nuxt (runs automatically)
```

## Environment Variables
- `SUPABASE_URL` - Supabase project URL
- `SUPABASE_KEY` - Supabase anon key