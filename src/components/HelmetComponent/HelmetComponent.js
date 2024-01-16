import { Helmet } from 'react-helmet'

const HelmetComponent = ({title, description}) => {
  return (
    <Helmet>
      <title>{title ? title : 'Ga6789 - ĐẠI LÝ ĐÁ GÀ TRỰC TIẾP THOMO SV388, CAMPUCHIA'}</title>
      <meta name="description" 
        content={description ? description 
          : "Gà 6789 - đăng ký tài khoản chơi đá gà trực tiếp Sv388 thomo & campuchia tại Ga6789"
        } 
      />
    </Helmet>
  )
}

export default HelmetComponent