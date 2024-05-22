import { RowDataPacket } from "mysql2"
export type CountResult = RowDataPacket & {
  'COUNT(*)': number;
};

export type LoginResault = RowDataPacket  &                                                                                                                                                
  {
    id:Number,
    username: string,
    email: string,
    password: string
  }