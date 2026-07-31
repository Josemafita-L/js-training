import api from "./axios";


export interface WebsiteRequest {

  fullName: string;

  companyName: string;

  email: string;

  phone: string;

  pages: string;

  features: string[];

  hosting: string;

  seo: string;

  notes: string;

}



export const submitWebsiteRequest = async (
  data: WebsiteRequest
) => {


  const formattedData = {

    full_name: data.fullName,

    company_name: data.companyName,

    email: data.email,

    phone: data.phone,

    pages: Number(data.pages),

    features: data.features.join(","),

    hosting: data.hosting,

    seo: data.seo,

    notes: data.notes,

  };


  const response = await api.post(
    "/website-request",
    formattedData
  );


  return response.data;

};