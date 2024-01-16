import BaseUrl from "./BaseUrl";

// phone check API
export const APICheckIfPhoneExists = async (phone) => {
  try {
    const res = await BaseUrl.get("/check_phone/" + phone);
    if (res.data && res.data.status) {
      return res.data.status;
    }
  } catch (e) {
    // console.log(e);
  }
};

// register API
export const APIRegisterUser = async (phone, password, agentId) => {
  try {
    const res = await BaseUrl.post("/register_user", {
      phone,
      password,
      agent_id: agentId,
    });
    if (res.data && res.data.status && res.data.token) {
      return res.data.token;
    }
  } catch (e) {
    // console.log(e);
  }
  return null;
};

// login User
export const APILoginUser = async (phone, password) => {
  try {
    const res = await BaseUrl.post("/login_user", {
      phone,
      password,
    });
    if (res.data && res.data.status && res.data.token) {
      return res.data.token;
    }
  } catch (e) {
    if (e.response.data?.message == "PASSWORD_INCORRECT") {
      return e.response.data.message;
    } else if (e.response.data?.message == "PLAYER_NOT_ALLOWED_LOGIN") {
      return e.response.data.message;
    } else if (e.status == 422) {
      return null;
    }
  }
};

// get user data
export const APIUser = async () => {
  try {
    const res = await BaseUrl.get("/user", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    });
    // console.log("res is", res);
    if (res.status === 200) {
      // console.log("res.data is", res.data);
      return res.data;
    }
  } catch (e) {
    return e;
  }
  return null;
};

// register user as agent
export const APIRegisterAgent = async (name, phone, password) => {
  try {
    const res = await BaseUrl.post("/register_agent", {
      name,
      phone,
      password,
    });
    if (res.data && res.data.status) {
      return res.data.status;
    }
  } catch (e) {
    // console.log(e);
  }
  // return null;
};
