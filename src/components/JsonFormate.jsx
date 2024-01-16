const JsonFormate = (data) => {
  const obj = JSON?.parse(data && data);
  if(obj && obj?.vn){
    return  obj?.vn ;
  }
}
export default JsonFormate