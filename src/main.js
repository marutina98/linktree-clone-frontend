
// Stylesheets

import '@/assets/main.css';

// Vue & Pinia

import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

// Plugins
// CookieConsentBanner, Router and Pinia

import CookieConsentBanner from './plugins/CookieConsentBanner';
import cookieConsentBannerConfig from './settings/cookie-consent-banner-config';

import router from './routes/router';

const pinia = createPinia();

createApp(App)
.use(router)
.use(CookieConsentBanner, cookieConsentBannerConfig)
.use(pinia)
.mount('#app');

// Set Authenticated Store in authenticationService
// The store cannot be used without creating Pinia First.

import { authenticationService } from './services/authentication.service';
import { useAuthenticatedStore } from './stores/use-authenticated-store.store';

authenticationService.authenticatedStore = useAuthenticatedStore();