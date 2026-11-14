/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Užklausų formos POST adresas (pvz., Formspree). Nenurodžius – forma veikia demonstraciniu režimu. */
  readonly VITE_FORM_ENDPOINT?: string
  /** Pilnas svetainės adresas canonical/OG/sitemap žymoms. */
  readonly VITE_SITE_URL?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
