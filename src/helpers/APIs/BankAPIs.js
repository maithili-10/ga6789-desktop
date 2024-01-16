import BaseUrl from "./BaseUrl";

// get company banks
export const APIGetCompanyBanks = async () => {
  try {
    const res = await BaseUrl.get("/bank/all", {
      headers: { Authorization: `Bearer ${localStorage.getItem('auth_token')}` }
    });
    if (res.data && res.data.length) {
      return res.data;
    }
  } catch (e) {
    // console.log(e);
  }
  return null;
}

// add bank account
export const AddAccountAPI = async (bank_name, account_number, User_name) => {

  var formData = new FormData();
  formData.append("bank_name", bank_name);
  formData.append("account_number", account_number);
  formData.append("User_name", User_name);

  try {
    const res = await BaseUrl.post("/bank/add_user_bank", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    if (res.status == 200) {
      return res;
    }
  } catch (e) {

  }
  return null;
}

// get enabled user banks for withdraw 
export const bankListAPI = async () => {
  try {
    const res = await BaseUrl.get("/player/active/banks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    if (res.data?.status){
      return res.data?.response
    }
  } catch (e) {
    // console.log(e);
  }
  return null;
}

// disabled user bank
export const disableBankAPI = async (id) => {
  try {
    const res = await BaseUrl.delete(`/bank/delete_user_bank/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    if (res.data?.status){
      return res.data?.response
    }
  } catch (e) {
    // console.log(e);
  }
  return null;
}