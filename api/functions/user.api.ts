import { IFormInput, LoginInput } from "@/interface/common.interface";

import { IgetSignUpQuery } from "@/interface/apiresp.interfaces";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

export const signUpMutation = async (body: IFormInput) => {
  const res = await axiosInstance.post(
    endpoints.auth.signup,
    body
  );
  return res;
};
export const emailCheck = async (body: LoginInput )=>{
  const resp= await axiosInstance.post(
    endpoints.auth.checkMagicEmail,
    body
  );
  return resp;
}
export const loginMutation = async (body: LoginInput) => {
  const res = await axiosInstance.post(
    endpoints.auth.getUser,
    body
  );
  return res;
};
export const GetProfileDetails = async () => {
  const res = await axiosInstance.get<IgetSignUpQuery>(
    endpoints.auth.profileDetails
  );
  return res;
};
// export const signUpProfileMutation = async (body: IFormInput) => {
//   const res = await axiosInstance.post<IgetSignUpQuery>(
//     endpoints.auth.signUpProfile,
//     body
//   );
//   return res;
// };
