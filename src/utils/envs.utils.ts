interface EnvUtils {
  API_KEY: string | undefined;
  BACKEND_URL: string | undefined;
  SECRET_KEY: string | undefined;
}

const envsUtils: EnvUtils = {
  API_KEY: process.env.NEXT_PUBLIC_API_KEY,
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL,
  SECRET_KEY: process.env.NEXT_PUBLIC_SECRET_KEY_FRONTEND,
};

export default envsUtils;
