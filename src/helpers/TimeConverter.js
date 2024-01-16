export default function TimeConverter(serverdate) {
    
    // const utcDateString = "2023-06-29T16:45:06.387Z"; // UTC date string (example)
    // const date=serverdate.toISOString()
    if(serverdate){
    const utcDateWithoutMillis = serverdate?.slice(0, -5) + "Z";
    const utcDate = new Date(utcDateWithoutMillis);
    // console.log("UTC Date:", utcDate.toISOString());

    // Step 2:
    const offsetMinutes = utcDate.getTimezoneOffset();
    // console.log("Time Zone Offset (minutes):", offsetMinutes);

    // Step 3:
    const localTime = new Date(utcDate.getTime() - offsetMinutes * 60 * 1000);
    // console.log("Local Time:", localTime.toISOString());

    // Display Local Time
    const localTimeString = localTime.toLocaleString();
    return localTimeString;
}
}