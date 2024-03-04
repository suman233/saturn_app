import { HomeRoot } from "@/interface/stoysec.interface";
import axiosInstance from "../axiosInstance";
import { endpoints } from "../endpoints";

// export const fetchAboutUs = async () => {
//   const res = await axiosInstance.get(endpoints.cms.about);
//   return res;
// };

// Faq
export const fetchCMS = async() => {
  const res = await axiosInstance.get<HomeRoot>(
    endpoints.cms.home
  );
  console.log('homecms', res.data.data);
  
  return res?.data?.data;
};
