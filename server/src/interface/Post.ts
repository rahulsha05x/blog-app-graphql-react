export interface Post {
  id: string;
  title: string;
  description: string;
}
export interface inputVars {
  id: string;
}
export interface PostResponse {
  success: boolean;
  code: string;
  response?: any;
  error?: any;
}
