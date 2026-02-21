export interface MyMatch {
  _id: string;
  users: MatchUser[];
  matchedAt: string;
  createdAt: string;
  updatedAt: string;
}
export interface MatchUser {
  _id: string;
  name: string;
  email: string;
  gender: "male" | "female" | "other";
  bio: string;
  age: number;
}