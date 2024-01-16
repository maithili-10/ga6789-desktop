import BaseUrl from './BaseUrl';

// file, 
// formData.append("deposit_receipt", file ? file : '');
// console.log(amount)
// console.log(selected_bank_id)
// console.log(reject_previous || false)
// return true
export const APIMakeDepositRequest = async (amount, selected_bank_id, reject_previous) => {
  // console.log(amount)
  // console.log(selected_bank_id)
  // console.log(reject_previous || false)
  var formData = new FormData();
  formData.append("transaction_amount", amount * 1000);
  formData.append("bank_id", selected_bank_id);
  reject_previous && formData.append("reject_previous", reject_previous || false);

  const token = localStorage.getItem('auth_token')
  try {
    const res = await BaseUrl.post("/account/deposit", formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`
      }
    });
    if (res.data) {
      return res.data;
    }
  } catch (e) {
    if (e.response.message === 'Request failed with status code 422') {
      return "ERR_FILE_FORMAT_INVALID"
    } if (e.response.status === 403) {
      return "WAIT_PLEASE"
    } else {
      return null
    }
  }
  return null;
}

export const APICheckTransaction = async (token, transactionId) => {
  try {
    const res = await BaseUrl.get("/account/transaction_status/"+transactionId, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res.data && res.data) {
      if(res.data.account){
        return true;
      }
      return false;
    }
  } catch (e) {
    // console.log(e);
  }
  return false;
}

export const APIGetAllTransactions = async (token) => {
  try {
    const res = await BaseUrl.get("/account/user_transaction", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res && res.data && res.data.response && res.data.response.length) {
      return res.data.response;
    }
  } catch (e) {
    // console.log(e);
  }
  return null;
}

export const APILatestTransaction = async (token) => {
  try {
    const res = await BaseUrl.get("/account/latest_transaction", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res && res.data) {
      return res.data;
    }
  } catch (e) {
    // console.log(e);
  }
  return null;
}

export const APIGetSingleTransaction = async (token, transactionId) => {
  try {
    const res = await BaseUrl.get("/account/transaction/" + transactionId, {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res && res.data) {
      return res.data
    }
  } catch (e) {
    // console.log(e);
  }
  return false;
}

export const APIGetCalenderData = async (token) => {
  try {
    const res = await BaseUrl.get("/player/daily/login", {
      headers: { Authorization: `Bearer ${token}` }
    });
    if (res && res.data) {
      return res.data
    }
  } catch (e) {
    // console.log(e);
  }
  return false;
}

export const depositAllowed =  ()=>{
  return BaseUrl.get('player/check/allow/deposit', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    }
  });
}