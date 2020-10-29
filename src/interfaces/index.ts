export interface OAuth {
  accessToken: Promise<any>,
  clientSecret?: string;
  clientId?: string;
  refreshToken?: string;
}

export interface Mail {
  from?: string;
  to: string;
  replyTo?: string;
  subject: string;
  generateTextFromHTML: boolean;
  html: string;
}