export interface ResetPassword
{
  email:string;
  newPassword:string;
}
export interface ResetPasswordRes
{
  message:string;
}
export interface ResetPasswordAPIRes
{
  message:string;
  token:string;
}