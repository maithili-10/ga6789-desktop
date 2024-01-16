import { CircularProgress } from '@mui/material';

const MyLoader = ({ size, margin, color }) => {
  return (
    <div style={{textAlign:'center', display:'flex', justifyContent:'center'}}>
      <CircularProgress size={size ? size : 22} style={{ margin:`${ margin ? margin : '' }`, color: `${color ? color : 'white'}` }}/>    
    </div>
  )
}

export default MyLoader