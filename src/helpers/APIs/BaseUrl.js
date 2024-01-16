import axios from "axios";

const BaseUrl = axios.create({
  // staging gasv388 base URL
  // baseURL: "https://staging.gasv388.net/api",

  // master gasv388 base URL
  // baseURL: "https://master.gasv388.net/api",

  // gasv388 base URL Live
  baseURL: "https://bo.gasv388.net/api",
});

export default BaseUrl;
