export type UserProps = {
  username: string;
  address: string;
  bio: string;
  email: string;
  link: string;
  downloads?: number;
};

export interface IUserInfo {
  forgotten: boolean;
  item_hash: string;
  current_revision: number;
  revision_hashes: string[];
  timestamp: number;
  signer: string;
  changed: false;
  username: string;
  address: string;
  downloads: number;
  bio: string;
  email: string;
  link: string;
}

export interface INotification {
  type: string;
  message_text: string;
}
