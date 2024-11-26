export interface LoginRes
{
  message : string,
  token : string,
  userEmail : string
}
export interface LoginUserRes
{
  username:string,
  firstName: string,
  lastName:string,
  email: string,
  phone: string,
  role:string,
  isVerified: boolean,
  _id: string,
  createdAt: string
}
export interface LoginAPIRes
{
  message: string;
  token: string;
  user: LoginUserRes;
}