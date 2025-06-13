import "express";

declare module "express-serve-static-core" {
  interface Response {
    json200: (response: any, message?: string) => Response;
    json201: (response: any, message?: string) => Response;
    json302: () => Response;
    json400: (message: string) => Response;
    json401: () => Response;
    json403: () => Response;
    json404: () => Response;
    json500: (message: string) => Response;
  }
}
