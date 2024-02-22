export interface RegistrationStatus {
  username: string;
}

export interface JwtPayload {
  email: string;
}

export interface LoginStatus {
  email: string;
  accessToken: string;
  refreshToken: string;
}

export type JwtPayloadWithRt = JwtPayload & { refreshToken: string };

export type Tokens = {
  accessToken: string;
  refreshToken: string;
};