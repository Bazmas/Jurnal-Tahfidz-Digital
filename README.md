# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Android PWA

The production build includes an installable Android PWA. Deploy the site to
Netlify over HTTPS, then open it in Chrome on Android and use **Install app**
or **Add to Home screen**. The app uses the existing Tahfidz logo for its
standard and maskable icons; replace the corresponding files in
`public/images/` if the branding changes.

The service worker precaches the app shell and the listed branding assets. It
does not cache API, authentication, or journal responses. When an update is
available, the app asks before activating it and reloading the page.

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.
