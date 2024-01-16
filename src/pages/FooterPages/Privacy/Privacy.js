import styles from './Privacy.module.css';
import ImageSection from '../ImageSection/ImageSection';
import Privacy1 from '../../../assets/FooterPagesImages/Privacy1.webp';
import Privacy2 from '../../../assets/FooterPagesImages/Privacy2.webp';
import Privacy3 from '../../../assets/FooterPagesImages/Privacy3.webp';
import HelmetComponent from '../../../components/HelmetComponent/HelmetComponent';

const Privacy = () => {
  return (
    <div>
      <HelmetComponent
        title = 'Chính sách Quyền riêng tư khi chơi game cá cược tại GA6789'  
        description = 'Nhà cái GA6789 luôn chú trọng việc thiết lập và duy trì áp dụng chính sách Quyền riêng tư cho mọi khách hàng tham gia chơi cá cược trực tuyến.'
      />
      <div className={styles.contentOverlay}>
        <h2>Chính sách Quyền riêng tư khi chơi game cá cược tại GA6789</h2>
        
        <p>Chính sách mà GA6789 đang thiết lập cho Quyền riêng tư hội viên được nghiên cứu kỹ lưỡng, xây dựng chặt chẽ. Điều đó sẽ giúp chúng tôi tránh khỏi các vấn đề tranh chấp, kiện tụng 
          tác tiếc. Dưới đây, người chơi hãy đi tìm hiểu kỹ hơn về quy định mà nhà cái áp dụng với toàn bộ khách hàng của mình.
        </p>

        <h3>Lưu trữ Cookie</h3>
        <p>Trong quá trình quý khách chơi cá cược tại đây, bản thân phải cung cấp thông tin quan trọng như Họ tên email,... Những dữ liệu này sẽ được chúng tôi lưu trữ trên hệ thống có thời 
          gian mặc định là 12 tháng.
        </p>
        <ImageSection image={Privacy1} caption='Nhà cái lưu trữ Cookies khi người chơi đăng nhập'/>

        <p>Cũng ở chính sách <b>Quyền riêng tư</b> có nêu rằng, nếu ai đang sở hữu tài khoản đầy đủ thông tin thì Cookies sẽ được tự động sao lưu. Nhờ đây, quá trình đăng nhập của khách hàng 
          từ lần sau trở đi cũng trở nên thuận tiện hơn.
        </p>
        <p>Ngoài ra, thông tin sẽ hiển thị thêm thời gian lưu trữ rõ ràng, thuận tiện cho hội viên theo dõi và kiểm tra, xem lại thông tin đã cung cấp cho <b>GA6789.</b> Nếu người chơi đắt 
          xuất thì Cookies cũng tự động bị xoá bỏ khỏi hệ thống máy chủ.
        </p>

        <h3>Quyền riêng tư bình luận trên trang và thông tin cá nhân</h3>
        <p>Để hạn chế spam bình luận, chúng tôi sẽ tự động thu thập dữ liệu, xác định tài khoản hội viên cũng như IP truy cập. Theo chính sách <b>Quyền riêng tư GA6789</b> đang áp dụng, bao 
          gồm ảnh và hồ sơ khách đều hiển thị trên nội dung khung chat. 
        </p>
        <p>Quý khách hoàn toàn có thể yên tâm bởi chỉ duy nhất nhà cái mới có quyền theo dõi toàn bộ dữ liệu đó. Mọi bình luận hoặc phản hồi của thành viên tại đây đều được chúng tôi giữ kín 
          tuyệt đối, tránh làm rò rỉ ra bên ngoài.
        </p>
        
        <h3>Quyền can thiệp và dùng thông tin riêng tư tại GA6789</h3>
        <p>Mọi khách hàng khi mở tài khoản tại GA6789 đều có thể yêu cầu hệ thống xuất dữ liệu. Để hoàn thành, quý khách hãy liên hệ với chúng tôi thông qua các kênh chăm sóc chính thức xuất 
          hiện trên trang chủ.
        </p>
        <p>Ngoài ra, hội viên được phép yêu cầu đội ngũ quản lý hệ thống xoá tài khoản và thông tin cá nhân trong lúc giải trí. Tuy nhiên, quý khách phải chịu toàn bộ trách nhiệm đối với những 
          dữ liệu đó của mình.
        </p> 
        <ImageSection image={Privacy2} caption='Quyền can thiệp và dùng thông tin riêng tư tại GA6789'/>

        <h3>Thông tin người chơi được chỉnh sửa, bổ sung</h3>
        <p>Nếu chúng tôi phát hiện thông tin cá nhân không chính xác hoặc còn thiếu, <b>GA6789</b> sẽ yêu cầu thành viên phải xoá bỏ, bổ sung, chỉnh sửa trong thời gian sớm nhất. Điều này 
          chắc chắn xảy ra nếu quý khách vẫn thường xuyên hoạt động cá cược bằng tài khoản đăng ký với nhà cái.
        </p>
        <p>Khi khách hàng bổ sung, chỉnh sửa bất kỳ dữ liệu nào cũng đều được hệ thống bảo mật tuyệt đối. Mọi quy trình lưu trữ tại đây luôn tuân theo chính sách <b>quyền riêng tư GA6789</b> 
          đề ra.
        </p>
        
        <h3>Chính sách Quyền riêng tư phòng chống gian lận</h3>
        <p>Để mở tài khoản cá cược tại đây thành công, quý khách cần dùng thông tin chính xác tuyệt đối. Người chơi phải đảm bảo dữ liệu trùng với các giấy tờ tùy thân như Căn cước, Hộ Chiếu, 
          Tài khoản ngân hàng,...
        </p>
        <p>Có một vài thành viên lo lắng sợ bị thông tin cá nhân nên có quyết định cung cấp sai sự thật. Thế nhưng một khi quý khách đã tham gia GA6789 thì hoàn toàn yên tâm về chính sách 
          <b> Quyền riêng tư.</b> Chúng tôi luôn chủ động, ý thức và trách nhiệm trong việc bảo mật dữ liệu khách hàng.
        </p>
        
        <h3>Thời gian để nhà cái lưu trữ thông tin người chơi</h3>
        <p>Nếu quý khách có thông tin bình luận, hình ảnh và dữ liệu cá nhân trên trang chủ <b>GA6789</b> thì nó sẽ được lưu trữ không thời hạn. Một vài nội dung khác chúng tôi sẽ để nó tồn 
          tại trong khoảng 1 đến 2 năm tùy theo chính sách.
        </p>
        <p>Khoảng thời gian này đủ để nhà cái tự động nhận dạng, đánh giá, xét duyệt yêu cầu của thành viên thay vì kéo dài hơn. Ngoài ra, nó cũng hỗ trợ chúng tôi trong việc tổng hợp đánh 
          giá phản hồi từ khách hàng.
        </p>
        
        <h3>Quyền hạn của hội viên với thông tin cá nhân tại GA6789</h3>
        <p>Nếu người chơi dùng chính tài khoản cá cược đã đăng ký với chúng tôi để nhận xét nhà cái thì sẽ có quyền yêu cầu hệ thống xuất dữ liệu cá nhân lưu trữ. Trong đó, đề xuất cũng đi kèm 
          đầy đủ mọi dữ liệu theo đúng mong muốn của khách hàng.
        </p>
        <p>Ngoài ra, người chơi cũng được phép yêu cầu GA6789 tiến hành xóa toàn bộ hoặc một phần thông tin cá nhân hệ thống đã thu thập từ trước đó. Thế nhưng quý khách cũng phải lưu ý đối 
          với quy định giới hạn phân quyền.
        </p>
        <ImageSection image={Privacy3} caption='Quyền riêng tư của hội viên với thông tin cá nhân tại GA6789'/>

        <p>Khách hàng có thể yêu cầu chúng tôi xóa dữ liệu cá nhân nhưng sẽ không kèm theo file nhà cái thu thập dưới dạng nghĩa vụ bắt buộc. Hiểu đơn giản thì đây là những thông tin được sân 
          chơi lưu trữ cho mục đích pháp lý, bảo mật hoặc hành chính.
        </p>

        <h3>Lời kết</h3>
        <p>Toàn bộ chính sách <b>Quyền riêng tư tại GA6789</b> đã được chúng tôi phổ biến phía trên. Qua đây, khách hàng sẽ cần đọc hiểu, nắm rõ để có thể yên tâm giải trí cùng nhà cái mỗi 
          ngày. Chắc chắn quyền lợi, sự riêng tư về thông tin cá nhân người chơi luôn được hệ thống ưu tiên bảo mật tuyệt đối. 
        </p>
      </div>
    </div>
  )
}

export default Privacy