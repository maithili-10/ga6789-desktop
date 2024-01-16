import axios from 'axios';

const BASE_URL = "https://bo2.svw38.com/api";

const AxiosAPI = async(route) => {
  try{
    const res = await axios.get(`${BASE_URL}${route}`,{
      headers: { 
        Authorization: `Bearer ${token}`,
        Accept: "application/json"
      }
    });
    if (res.data && res.data.length) {
      return res.data;
    }
  }catch(e){
    // console.log(e);
  }
  return null;
}
export default AxiosAPI;