import { defineManifest } from '@crxjs/vite-plugin'
import pkg from './package.json'

export default defineManifest({
  manifest_version: 3,
  name: pkg.name,
  version: pkg.version,
  action: {
    default_icon: {
      48: 'public/logo.png',
    },
    default_popup: 'src/popup/index.html',
  },
  background: {
    service_worker: 'src/background/google-gemini-ai.ts',
    type: 'module',
  },
  content_scripts: [{
    js: ['src/content/main.ts'],
    matches: ['<all_urls>'],
  }],
  host_permissions: [
    "https://generativelanguage.googleapis.com/*",
  ],
  icons: {
    48: 'public/logo.png',
  },
  options_page: 'src/options/options.html',
  permissions: [
    'contentSettings',
    'activeTab',
    'scripting',
    'storage',
  ],
})