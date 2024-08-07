// @generated
// This file is automatically generated from our schemas by the command `pnpm types:generate`. Do not modify manually.

export interface UserFile {
  id: string;
  uid: string;
  data?: any | null;
  s3: boolean;
  s3Key: string | null;
  checksum: string;
  filename: string;
  mimetype: string;
  filesize: number;
  createdAt: Date;
  updatedAt: Date;
}
