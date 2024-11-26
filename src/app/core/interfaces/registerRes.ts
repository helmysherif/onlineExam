export interface RegisterRes
{
  message : string,
  token : string,
  userEmail : string
}
export interface RegisterUserRes
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
export interface RegisterAPIRes
{
  message: string;
  token: string;
  user: RegisterUserRes;
}