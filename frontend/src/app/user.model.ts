export interface User {
  user_id?: string;
  username: string;
  email: string;
  password: string;
  image_key: string;
  score?: number;
  game?: string;
  timestamp?: string;
}
