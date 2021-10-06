declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URI: string;
      JWT_TOKEN: string;
    }
  }
}

export {}