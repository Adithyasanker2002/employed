import commonAPI from "./commonApi";
import SERVERURL from "./serverURL";



export const uploadEmployeeAPI=async(empDetails)=>{
    return await commonAPI("POST",`${SERVERURL}/employee`,empDetails)
}   



export const getEmployeeAPI=async()=>{
    return await commonAPI("GET",`${SERVERURL}/employee`,"")
}


export const deleteEmployeeAPI = async (id) => {
    return await commonAPI("DELETE", `${SERVERURL}/employee/${id}`, "");
  };


export const updateEmployeeAPI = async (id, empDetails) => {
    return await commonAPI("PUT", `${SERVERURL}/employee/${id}`, empDetails);
  };



export const getEmployeeByIdAPI = async (id) => {
  return await commonAPI("GET", `${SERVERURL}/employee/${id}`, "");
};

  
  