import BaseUrl from "./BaseUrl";

// get all categories, home section
export const getGameCategories = async () => {
  try {
    const res = await BaseUrl.get("/player/game_categories", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    if (e.response.status == 500) {
      return "NETWORK_ERROR";
    }
  }
  return null;
};

// get GAMES of all categories, all cat modal
export const APIAllCategoryGames = async () => {
  try {
    const res = await BaseUrl.get("player/game_categories_items", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    if (res.data) {
      return res.data;
    }
  } catch (e) {
    if (e.response.data.message == "INSUFFICIENT_BALANCE") {
      return "thiếu cân bằng";
    } else {
      // console.log(e);
    }
  }
  return null;
};
// get special trending games and categories
export const APIAllTrendingGames = async () => {
  try {
    const res = await BaseUrl.get("/player/game_categories_special", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    if (res.data) {
      return res.data;
    }
  } catch (e) {
    if (e.response.data.message == "INSUFFICIENT_BALANCE") {
      return "thiếu cân bằng";
    } else {
      // console.log(e);
    }
  }
  return null;
};

// get Game balance,  all cat : play now modal
export const APIGameBalance = async (gameId) => {
  try {
    const res = await BaseUrl.get(`player/game/${gameId}/balance`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    if (res.data && res?.data.length) {
      return res?.data;
    }
    return res.data;
  } catch (e) {
    if (e.response?.data?.message == "ACCOUNT_DOESNT_EXIST") {
      return "ACCOUNT_DOESNT_EXIST";
    } else if (e.response?.data?.message == "NETWORK_ERROR") {
      return "NETWORK_ERROR";
    } else if (e.response?.data?.message == "GAME_PROVIDER_NOT_SUPPORTED") {
      return "NOT_SUPPORTED";
    } else {
      // console.log(e)
    }
  }
  return null;
};

// Deposit in the game, play now
export const APIGameDeposit = async (id, amount) => {
  // console.log(amount)
  try {
    const res = await BaseUrl.post(
      `player/game/login`,
      { game_id: id, amount },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    // console.log(res)
    if (res.data) {
      return res.data;
    }
  } catch (e) {
    // console.log(e)
    if (e.response.data.message == "INSUFFICIENT_BALANCE") {
      return "INSUFFICIENT_BALANCE";
    } else if (e.response.data.message == "BALANCE_NETWORK_ERROR") {
      return "BALANCE_NETWORK_ERROR";
    } else if (e.response.data.message == "REGISTRATION_NETWORK_ERROR") {
      return "REGISTRATION_NETWORK_ERROR";
    } else if (e.response.data.message == "LOGIN_NETWORK_ERROR") {
      return "LOGIN_NETWORK_ERROR";
    } else if (e.response.data.message == "PENDING_TRANSACTION") {
      return e.response.data;
    } else if (e.response.data.message == "PLEASE_DEPOSIT") {
      return e.response.data;
    } else if (e.response.data.message == "PENDING_DEPOSIT") {
      return e.response.data;
    } else if (e.response.data.message == "DEPOSIT_NETWORK_ERROR") {
      return "DEPOSIT_NETWORK_ERROR";
    } else {
      return null;
    }
    // else if (e.response.data.message == 'ADMIN_FORBIDDEN') {
    //   return 'adminForbidden'
    // }
  }
  return null;
};

// single Game Withdraw API, all cat modal
export const SingleGameWithdrawAPI = async (id, balance) => {
  try {
    const res = await BaseUrl.post(
      `/player/points/withdraw/game/${id}`,
      { amount: balance },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    // console.log(res)
    if (res.data && res.data?.status) {
      return res.data && res.data;
    }
  } catch (e) {
    // console.log(e)
    if (e.response.data.message == "PENDING_TRANSACTION") {
      return "PENDING_TRANSACTION";
    } else if (e.response.data.message == "BALANCE_NETWORK_ERROR") {
      return "BALANCE_NETWORK_ERROR";
    } else if (e.response.data.message == "LACK_FUND") {
      return "LACK_FUND";
    } else if (e.response.data.message == "ACCOUNT_DOESNT_EXIST") {
      return "ACCOUNT_DOESNT_EXIST";
    } else if (e.response.data.message == "PENDING_WITHDRAW") {
      return "PENDING_WITHDRAW";
    } else if (e.response.data.message == "NETWORK_ERROR") {
      return "NETWORK_ERROR";
    } else {
      return null;
    }
  }
};

// all Games withdraw API, all cat modal
export const AllGameWithdrawAPI = async (finalBlanceArray) => {
  try {
    const res = await BaseUrl.post(
      "player/points/withdraw/all",
      { game_items: finalBlanceArray },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    // && res.data.message && res.data.message == 'POINTS_TRANSFERRED_SUCCESSFULLY'
    if (res.data) {
      // && res.data.status;
      return res.data;
    }
  } catch (e) {
    // console.log(e)
    if (e.response.data.message == "PENDING_TRANSACTION") {
      return "PENDING_TRANSACTION";
    } else if (e.response.data.message == "BALANCE_NETWORK_ERROR") {
      return "BALANCE_NETWORK_ERROR";
    } else if (e.response.data.message == "LACK_FUND") {
      return "LACK_FUND";
    } else if (e.response.data.message == "ACCOUNT_DOESNT_EXIST") {
      return "ACCOUNT_DOESNT_EXIST";
    } else if (e.response.data.message == "PENDING_WITHDRAW") {
      return "PENDING_WITHDRAW";
    } else if (e.response.data.message == "NETWORK_ERROR") {
      return "NETWORK_ERROR";
    } else {
      return null;
    }
  }
  return null;
};

// check if any pending transaction of game, play now
export const APIGamePendingTransactions = async (gameId) => {
  try {
    const res = await BaseUrl.get(
      `/player/check/game/pending/transactions?game_item_id=${gameId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        },
      }
    );
    if (res.status === 200) {
      return res.data;
    }
  } catch (e) {
    // console.log(e);
    return e;
  }
  return null;
};

// get single Game Item
// export const getGameItems = async (id) => {
//   try {
//     const res = await BaseUrl.get(`/player/${id}/game_items`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem('auth_token')}`
//       }
//     });
//     if (res.status === 200) {
//       return res.data
//     }

//   } catch (e) {
//     return e
//   }
//   return null;
// }
