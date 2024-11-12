export {}

declare global {
  interface Window {
    ENV: {
      API_URL: string
      API_KEY: string
    }
  }
}
