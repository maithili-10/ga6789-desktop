import BaseUrl from "./BaseUrl"

export const APICheckAnnouncement = async () => {
  try {
    const res = await BaseUrl.get("/player/announcements");
    // console.log(res)
    if(res.status === 200) {
      return res.data
    }
  } catch (error) {
    // console.log(error)
  }
}

