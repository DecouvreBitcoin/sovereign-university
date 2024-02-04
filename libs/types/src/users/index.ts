import type { default as AccountBase } from '../sql/users/Accounts';

export * from './courses';

export type Account = AccountBase & {
  role: UserRole;
};
export type UserRole = 'student' | 'teacher' | 'admin';
export type UserDetails = Pick<
  Account,
  'uid' | 'username' | 'display_name' | 'email' | 'contributor_id'
> & {
  role: UserRole;
};
