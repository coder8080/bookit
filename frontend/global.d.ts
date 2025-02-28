interface ImportMetaEnv {
  readonly APP_NAME: string;
  readonly APP_VERSION: string;
  readonly VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
