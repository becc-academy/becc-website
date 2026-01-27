export interface IBaseEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export type TStatus = 'active' | 'inactive' | 'pending';

export interface IUser extends IBaseEntity {
  email: string;
  name: string;
  role: string;
}
