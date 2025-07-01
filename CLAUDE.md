# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Salesforce PWA Kit Retail React App that uses template extensibility to customize the base `@salesforce/retail-react-app` template. The application is a progressive web app (PWA) for e-commerce built on Salesforce Commerce Cloud.

## Key Commands

### Development
- `npm start` - Start local development server on port 3000
- `npm run build` - Build production bundle (includes translation compilation)
- `npm test` - Run Jest tests
- `npm run lint` - Lint JavaScript/JSX files
- `npm run lint:fix` - Auto-fix linting issues
- `npm run format` - Format code using PWA Kit formatter

### Deployment
- `npm run push` - Deploy to Salesforce Managed Runtime (requires Runtime Admin access)
- `npm run push -- -m "commit message"` - Deploy with a specific message

### Testing
- `npm test` - Run all tests
- To run a single test file: `npm test -- path/to/test.js`
- To run tests in watch mode: `npm test -- --watch`

### Localization
- `npm run extract-default-translations` - Extract default messages
- `npm run compile-translations` - Compile all translations
- `npm run start:pseudolocale` - Start dev server with pseudo-locale for testing

## Architecture

### Template Extensibility Pattern
The project extends the base Salesforce template rather than forking it:
- Base template: `@salesforce/retail-react-app` (npm dependency)
- Customizations: `/overrides/` directory
- Any file in `/overrides/` will override the corresponding file in the base template

### Key Directories
- `/overrides/app/` - Application customizations
  - `components/` - Custom React components
  - `pages/` - Page components (routes)
  - `static/` - Static assets and translations
  - `routes.jsx` - Route definitions
  - `ssr.js` - Server-side rendering configuration
- `/config/` - Configuration files
  - `default.js` - Main app configuration (API endpoints, features)
  - `sites.js` - Multi-site configuration
- `/translations/` - Localization files

### Important Configuration Files
- `config/default.js` - Contains:
  - Commerce API settings (clientId, organizationId, shortCode, siteId)
  - Einstein API configuration
  - Authentication settings (SLAS)
  - SSR configuration
  - Proxy settings for API calls

### API Integration Pattern
The app uses a proxy pattern for Commerce API calls:
- API calls go through the app server first
- Server adds necessary headers and authentication
- Configured in `config/default.js` under `ssrParameters.proxyConfigs`

### Server-Side Rendering (SSR)
- Enabled by default for better SEO and performance
- Entry point: `/overrides/app/ssr.js`
- Client entry: `/overrides/app/main.jsx`

## Development Workflow

1. Make changes in the `/overrides/` directory
2. Components, pages, and routes follow React patterns
3. Use existing Commerce SDK React hooks for data fetching
4. Follow the existing code style (check neighboring files)
5. Run `npm run lint:fix` before committing
6. Test changes with `npm test`

## Key Technologies
- React 18.x
- Express.js (SSR)
- PWA Kit SDK
- Commerce SDK React
- Jest (testing)
- React Intl (i18n)
- Chakra UI (component library)

## Performance Considerations
- Bundle size limits enforced (main.js: 44kB, vendor.js: 320kB)
- Use code splitting for large components
- Service worker enabled for offline functionality
- Image optimization through Commerce Cloud CDN

## Security
- Never commit API keys or secrets
- Authentication handled via SLAS (Shopper Login and API Services)
- All API calls proxied through the app server
- Security headers configured via Helmet

## Multi-Site Support
- Configure additional sites in `/config/sites.js`
- Each site can have its own locale and currency settings
- Current site: "RefArch" (reference architecture)

## React component style guidelines.
lets use .tsx of the Following style For new components. . 
```
import React from 'react'
import {Box, Heading, Image} from '@chakra-ui/react'

interface HeroBannerProps {
    title: string
    subtitle: string
    imageMobile: string
    imageTablet: string
    imageDesktop: string
}

const HeroBanner: React.FC<HeroBannerProps> = ({
    title,
    subtitle,
    imageMobile,
    imageTablet,
    imageDesktop
}) => {
    return (
        <Box className="banner">
            <Heading
                as="h1"
                fontSize={['1.5rem', '2rem', '3rem', '4rem']}
                mb={['0.5rem', '0.5rem', '1rem', '1rem']}
            >
                {title}
            </Heading>
            <Heading
                as="h2"
                fontSize={['1rem', '1.5rem', '2rem', '3rem']}
                mb={['1rem', '1rem', '1rem', '1rem']}
            >
                {subtitle}
            </Heading>
            <Image src={imageMobile} alt="Banner" width="100%" height="auto" />
        </Box>
    )
}

export default HeroBanner

```