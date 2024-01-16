import BaseUrl from "./BaseUrl"

// get Daga balance
export const APIDagaBalance = async () => {
  try {
    const res = await BaseUrl.get('player/daga/balance' , {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    if (res.data && res?.data.status) {
      return res?.data;
    }
  } catch (e) {
    if(e.response?.data?.message == 'FORBIDDEN') {
      return 'FORBIDDEN'
    } else if (e.response?.data?.message == 'NETWORK_ERROR') {
      return 'NETWORK_ERROR'
    } else if (e.response?.data?.message == 'Unauthenticated.') {
      return 'Unauthenticated'
    } else if (e.message == 'Network Error') {
      return 'NETWORK_ERROR'
    }
  }
  return null;
}

//  get DAGA max min details
export const APIDagaPoints = async () => {
  try {
    const res = await BaseUrl.get("player/daga/game")
    // console.log(res)
    if (res.status === 200) {
      return res.data;
    }
  } catch (error) {
  }
}

// Deposit Daga API
export const APIDagaDeposit = async (points) => {
  try {
    // console.log('daga points: ', points)
    const res = await BaseUrl.post('/player/daga/deposit', {amount: points ? points : ''}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    // console.log(res)
    if (res.data && res?.data.status) {
      return res?.data;
    }
    } catch (e) {
      // console.log(e)
      if(e.response?.data?.message == 'FORBIDDEN') {
        return 'FORBIDDEN'
      } else if (e.response?.data?.message == 'INSUFFICIENT_BALANCE') {
        return 'INSUFFICIENT_BALANCE'
      } else if (e.response?.data?.message == 'AMOUNT_NOT_ACCEPTED') {
        return 'AMOUNT_NOT_ACCEPTED'
      } else if (e.response?.data?.message == 'NETWORK_ERROR') {
        return 'NETWORK_ERROR'
      } else {
       return null
      }
  }
}

// Withdraw DAGA API
export const APIDagaWithdraw = async (points) => {
  try {
    const res = await BaseUrl.post('/player/points/withdraw/daga', {amount: points}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('auth_token')}`
      }
    });
    // console.log(res)
    if (res.data && res?.data.status) {
      return res?.data;
    }
    } catch (e) {
      // console.log(e)
      if(e.response?.data?.message == 'FORBIDDEN') {
        return 'FORBIDDEN'
      } else if (e.response?.data?.message == 'LACK_FUND') {
        return 'LACK_FUND'
      } else if (e.response?.data?.message == 'NETWORK_ERROR') {
        return 'NETWORK_ERROR'
      } else if ( e.response?.data?.message == 'WITHDRAW_LIMIT_OVER') {
        return 'WITHDRAW_LIMIT_OVER'
      }
  }
}