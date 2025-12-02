declare module "jsonwebtoken" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface JwtPayload {
    userId: number;
    password?: string;
    userRole: string;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Jwt {}
}
