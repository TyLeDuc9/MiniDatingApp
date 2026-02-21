export interface Like {
  _id?: string;
  fromUser: string; 
  toUser: string;  
  createdAt?: string;
  updatedAt?: string;
}
export interface LikePayload {
  fromUser: string;
  toUser: string;  
}
export interface LikeResponse {
  match: boolean;
  message: string;
  matchData?: {
    _id: string;
    users: string[];
    createdAt: string;
  };
}
export interface GetMyLikesResponse {
  likedUserIds: string[];
}