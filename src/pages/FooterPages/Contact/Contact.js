import styles from './Contact.module.css';
import ImageSection from '../ImageSection/ImageSection';
import Contact1 from '../../../assets/FooterPagesImages/Contact1.webp';
import Contact2 from '../../../assets/FooterPagesImages/Contact2.webp';
import Contact3 from '../../../assets/FooterPagesImages/Contact3.webp';
import HelmetComponent from '../../../components/HelmetComponent/HelmetComponent';

const Contact = () => {
  return (
    <div>
      <HelmetComponent
        title = 'Liên hệ GA6789 - Đội ngũ chuyên viên nhiệt tình hỗ trợ 24/7'  
        description = 'Trong quá trình đặt cược tại nhà cái chắc hẳn quý khách sẽ gặp các vấn đề cần hỗ trợ, dưới đây là tổng hợp các phương thức liên hệ GA6789 đang áp dụng.'
      />
      <div className={styles.contentOverlay}>
        <h2>Liên hệ GA6789 - Đội ngũ chuyên viên nhiệt tình hỗ trợ 24/7</h2>
        
        <p>Sở hữu kho game đổi thưởng cực chất với đa dạng chuyên mục khác nhau, quý khách khi tham gia đặt cược sẽ có trải nghiệm cá cược thú vị nhất, tuy nhiên đôi lúc sẽ gặp khó khăn, 
          vấn đề không thể tự giải quyết được. Trong trường hợp này nên liên hệ với nhân viên chăm sóc khách hàng để được tư vấn, hỗ trợ tốt nhất.
        </p>

        <h3>Đánh giá dịch vụ hỗ trợ khách hàng Ga6789</h3>
        <p>Được xem là sân chơi uy tín nhất trên thị trường, nhà cái thiết lập đa dạng kênh hỗ trợ khác nhau giúp người chơi có thể hoàn toàn yên tâm khi đặt cược. Dưới đây là đánh giá 
          từ trải nghiệm thực tế từ hội viên.
        </p>

        <h3>Giải đáp đầy đủ và chính xác</h3>
        <p>Đội ngũ chuyên viên được đào tạo bài bản, có kiến thức về cá cược trực tuyến, am hiểu cách vận hành của nhà cái. Những vấn đề thành viên gặp phải sẽ được giải đáp một cách đầy 
          đủ và chính xác. Đảm bảo khắc phục nhanh nhất, không làm ảnh hưởng đến trải nghiệm của thành viên.
        </p>

        <h3>Đội ngũ chuyên viên đông đảo</h3>
        <p>Để phục vụ số lượng thành viên đông đảo tại nhà cái, GA6789 sở hữu lượng chuyên viên đông đảo túc trục nhiều kênh khác nhau. Người chơi ít gặp phải tình trạng không kết nối 
          hoặc không có ai phản hồi. Điều này giúp cược thủ yên tâm hơn khi tham gia đặt cược tại sân chơi uy tín hàng đầu.
        </p>
        <p>Đặc biệt là nhân viên thành thạo đa ngôn ngữ bởi các chuyên viên sẵn sàng giải đáp các vấn đề gặp phải một cách nhanh chóng. Không làm ảnh hưởng, gián đoán đến quá trình cá cược.</p>
        <ImageSection image={Contact1} caption='Đội ngũ chuyên viên đông đảo'/>

        <h3>Đa dạng kênh hỗ trợ để lựa chọn</h3>
        <p>Hiện tại nhà cái đang áp dụng đa dạng kênh hỗ trợ để người chơi lựa chọn, có thể kể đến như:</p>
        <ul>
          <li>Telegram: <a href='https://t.me/CSGATHOMO' target='_blank'>@CSGATHOMO</a></li>
          <li>Email: <a href='mailto:ADMIN@GA6789.NET' target='_blank'>ADMIN@GA6789.NET</a></li>
          <li>Live chat: <a href='https://direct.lc.chat/16494300/' target='_blank'>https://direct.lc.chat/16494300/</a></li>
        </ul>

        <h3>Liên hệ hoạt động 24/7</h3>      
        <p>Các kênh chăm sóc khách hàng của nhà cái hoạt động liên tục 24/7 nên bất cứ khi nào người chơi gặp vấn đề cũng có thể liên hệ hỗ trợ. Mọi vấn đề sẽ được giải đáp ngay lập tức, 
          điểm đặc biệt là lịch làm việc phân bổ khoa học trong 365 ngày trong năm, dù ngày lễ tết cũng đều có nhân viên hỗ trợ nên Quý khách không cần lo lắng.
        </p>

        <h3>Cập nhật các phương thức liên hệ GA6789 nhanh nhất</h3>      
        <p>Quý khách có thể nhờ sự hỗ trợ từ nhà cái qua các phương thức sau:</p>

        <h3>Gọi điện đến telegram</h3>      
        <p>Đây là cách nhanh nhất giúp người chơi liên hệ với nhân viên nhà cái, nhân viên túc trực liên tục 24/7 nên bất cứ lúc nào hội viên cũng có thể nhờ giải đáp. Chỉ cần làm theo 
          hướng dẫn là có khắc phục sự cố nhanh nhất.
        </p> 
        <ImageSection image={Contact2} caption='Liên hệ qua hotline'/>

        <h3>Liên hệ qua live chat</h3>
        <p>Nhà cái có mục live chat, mục này sẽ nằm ngay ở góc phải màn hình nên bất cứ khi nào cần hỗ trợ khách hàng cũng có thể liên hệ. Đây là cách nhanh nhất, không mất phí, tiết kiệm 
          thời gian.
        </p>
        <p>Hãy soạn tin nhắn gửi tới hệ thống, sẽ có nhân viên hỗ trợ tiếp nhận yêu cầu và phản hồi trong giây phát.Nếu không thấy phản hồi hãy xem lại mạng, đôi khi kết nối chậm nên không 
          thể nhận được tin nhắn.
        </p>
        
        <h3>Gửi thông tin qua email</h3>
        <p>Đây cũng là cách thức được nhà cái áp dụng, mặc dù không được nhiều người sử dụng do thời gian chờ đợi lâu nhưng lại giải quyết nhiều vấn đề cùng lúc. người chơi sẽ phải sử dụng 
          email cá nhân, soạn nội dung cần giải đáp và chờ phản hồi.
        </p>
        <p>Trong trường hợp có nhiều thắc mắc và không cần giải quyết ngay thì quý khách có thể áp dụng cách này. Tiết kiệm chi phí và khắc phục nhanh chóng các vấn đề gặp phải chỉ trong 
          ít phút.
        </p>
        
        <h3>Liên hệ qua mạng xã hội Zalo, Whatsapp</h3>
        <p>Ngoài các phương thức kể trên, các bạn cũng có thể liên hệ với nhà cái qua Zalo, Whatsapp. Ứng dụng này được cài đặt trên điện thoại, máy tính nên việc thao tác thực hiện cũng 
          dễ dàng hơn. Quý khách cần phải đảm bảo đường truyền internet ổn định, điều này giúp quá trình hỗ trợ diễn ra nhanh chóng, không gặp bất cứ vấn đề nào, an toàn và không mất phí 
          giao dịch.
        </p>
        <ImageSection image={Contact3} caption='Hỗ trợ qua mạng xã hội Zalo'/>

        <h3>Vấn đề gặp phải cần đến sự hỗ trợ từ nhân viên Ga6789</h3>
        <p>Trong quá trình giao dịch, thành viên có thể sẽ gặp phải các vấn đề cần khắc phục, gồm có:</p>
        <ul>
          <li>Gặp khó khăn khi tạo tài khoản, đăng nhập hoặc khóa tài khoản.</li>
          <li>Liên quan đến nạp rút.</li>
          <li>Câu hỏi về việc đổi thưởng tại nhà cái.</li>
          <li>Ngoài ra việc mất tài khoản, hack tài khoản rất nghiêm trọng. Quý khách cần phải liên hệ ngay với nhân viên để giải quyết ngay, không làm ảnh hưởng đến quá trình đặt cược.</li>
        </ul>

        <p>Mỗi phương thức liên hệ đều có ưu nhược điểm riêng, hội viên khi gặp phải vấn đề có thể nhờ hỗ trợ qua các kênh sau để không làm ảnh hưởng đến quá trình trải nghiệm tại nhà 
          cái, mang về phần thưởng giá trị khi đặt cược. Chúc các bạn may mắn!
        </p>
      </div>
    </div>
  )
}

export default Contact