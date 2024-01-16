import BaseUrl from "./BaseUrl";

export const WithdrawAPI = async (bank_id, transaction_amount, bank_account_number,reject_previous) => {

  var formData = new FormData();
  formData.append("bank_id", bank_id);
  formData.append("transaction_amount", transaction_amount);
  formData.append("bank_account_number", bank_account_number);
  reject_previous && formData.append("reject_previous", reject_previous || false);

  const token = localStorage.getItem('auth_token')
  try {
    const res = await BaseUrl.post("/account/withdraw", formData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (res.data) {
      return res.data;
    }
  } catch (e) {
    // console.log('e is' , e)
    if(e.response.data?.message === 'PLAYER_NOT_ALLOWED_TO_WITHDRAW'){
        return 'PLAYER_NOT_ALLOWED_TO_WITHDRAW'
    }
    if(e.response.data?.message === 'INSUFFICIENT_BALANCE'){
      return 'INSUFFICIENT_BALANCE'
  }
    else if (e.response.status === 403) {
      return "WAIT_PLEASE"
    } else if (e.response.status === 401) {
      return "MAKE_DEPOSIT_REQUEST_FIRST"
    }else{
      // console.log(e);
    }
  }
  return null;

}

// check withdraw allowed
export const withdrawAllowed =  ()=>{

  return BaseUrl.get('player/check/allow/withdraw', {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('auth_token')}`
    }
  });
}