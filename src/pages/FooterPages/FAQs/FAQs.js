import styles from './FAQs.module.css';
import ImageSection from '../ImageSection/ImageSection';
import FAQs1 from '../../../assets/FooterPagesImages/FAQs1.webp';
import FAQs2 from '../../../assets/FooterPagesImages/FAQs2.webp';
import FAQs3 from '../../../assets/FooterPagesImages/FAQs3.webp';
import HelmetComponent from '../../../components/HelmetComponent/HelmetComponent';

const FAQs = () => {
  return (
    <div>
      <HelmetComponent
        title = 'Tổng hợp các câu hỏi thường gặp khi trải nghiệm tại GA6789'  
        description = 'Quý khách khi tham gia đặt cược tại nhà cái chắc hẳn có nhiều thắc mắc cần được giải đáp, dưới đây là tổng hợp câu hỏi thường gặp để hội viên tham khảo.'
      />
      <div className={styles.contentOverlay}>
        <h2>Tổng hợp các câu hỏi thường gặp khi trải nghiệm tại GA6789</h2>
        
        <p>Để hiểu hơn về nhà cái, quý khách có thể tham khảo thêm câu hỏi thường gặp được cập nhật trong bài viết dưới đây cùng giải đáp chi tiết. Đây đều là vấn đề có thể gặp phải trong quá 
          trình đặt cược giúp quá trình đặt cược dễ dàng, an toàn hơn tại sân chơi uy tín hàng đầu.
        </p>

        <h3>Nhà cái Ga6789 có nguồn gốc từ đâu?</h3>
        <p>Nhà cái có nhiều năm hoạt động trên thị trường cá cược Việt Nam, được công nhận hợp pháp bởi chính phủ Philippines, tất cả hoạt động, sản phẩm đều được giám sát kỹ càng từ First 
          Cagayan và FAGOR đảm bảo an toàn, công bằng và minh bạch cho tất cả thành viên.
        </p>
        <p>Trong tương lai gần sẽ mở rộng quy mô ra các quốc gia khác, cho thấy sự phát triển vượt bậc của sân chơi này. Kho game nâng cấp thường xuyên mang đến cho thành viên trải nghiệm 
          thú vị nhất.
        </p>
        <ImageSection image={FAQs1} caption='Câu hỏi thường gặp về nguồn gốc của nhà cái GA6789'/>

        <h3>Tiêu chí nào đánh giá mức độ uy tín của nhà cái</h3>
        <p>Để có được phát triển như hiện tại, nhà cái phải đáp ứng đầy đủ các tiêu chí của sân chơi uy tín, gồm có:</p>
        <ul>
          <li>Sở hữu giấy phép kinh doanh từ tổ chức quản lý uy tín.</li>
          <li>Kho game hiện đại được nâng cấp liên tục.</li>
          <li>Đa dạng kênh thanh toán nạp rút để lựa chọn.</li>
          <li>Khuyến mãi hấp dẫn kèm điều kiện nhận thưởng hợp lý.</li>
          <li>Hỗ trợ thành viên hết mình với nhiều kênh khác nhau.</li>
        </ul>

        <h3>Các sảnh cược Ga6789 đang cung cấp</h3>
        <p>Nhà cái hiện cung cấp kho game cực chất để thành viên lựa chọn, các sản phẩm hấp dẫn như:</p>
        <ul>
          <li>Cá độ thể thao</li>
          <li>Bắn cá</li>
          <li>Casino</li>
          <li>Trò chơi điện tử</li>
          <li>Thể thao điện tử</li>
          <li>Đá gà</li>
        </ul>
        
        <p>Mỗi sảnh cược đều được thiết kế tỉ mỉ, chỉn chu mang đến cho hội viên trải nghiệm thú vị nhất. Đặc biệt là tỷ lệ ăn thưởng cực kỳ hấp dẫn, nhiều quý khách có cơ hội đổi đời khi 
          chơi.
        </p> 
        <ImageSection image={FAQs2} caption='Đa dạng sảnh cược hấp dẫn'/>

        <h3>Câu hỏi thường gặp - Khách hàng cần đáp ứng điều kiện gì khi đặt cược tại nhà cái</h3>
        <p>Quý khách khi tạo tài khoản tại nhà cái cần phải đáp ứng đầy đủ các điều kiện, đồng thời tuân thủ quy định. Gồm có:</p>
        <ul>
          <li>Đủ 18 tuổi trở lên.</li>
          <li>Chỉ được tạo một tài khoản.</li>
          <li>Không được có hành vi gian lận làm ảnh hưởng đến quyền và lợi ích của nhà cái.</li>
        </ul>
        
        <h3>Hệ thống bảo mật Ga6789 có an toàn không?</h3>
        <p>Mong muốn mang đến cho hội viên  ván cược kịch tính, an toàn nhất, nhà cái đã nâng cấp, thiết lập hệ thống bảo mật với nhiều lớp mã hóa. Ứng dụng công nghệ hiện đại được kiểm tra, 
          bảo dưỡng an toàn bởi đội ngũ nhân viên nhiều kinh nghiệm.
        </p>
        <p>Thành viên cần phải tuân thủ điều khoản chính sách nghiêm ngặt từ hệ thống. Đây là cơ sở quan trọng giúp nhà cái vận hành tốt, khách hàng không cần lo lắng về việc bị rò rỉ thông 
          tin hay xâm nhập từ hacker.
        </p>
        
        <h3>Tốc độ trả thưởng GA6789 có xanh chín không?</h3>
        <p>Nhà cái cam kết trả thưởng cho thành viên nhanh nhất trong khoảng 24 giờ sau khi tạo lệnh thanh toán thành công. Áp dụng cho tất cả các phương thức đang áp dụng nên quý khách có 
          thể hoàn toàn yên tâm.
        </p>
        <p>Chỉ cần điền thông tin chính xác theo yêu cầu tư hệ thống, không trùng lặp với tài khoản khác hoặc giả mạo thông tin là tiền thưởng sẽ gửi ngay. Lưu ý, không giao dịch vào các 
          ngày lễ tết sẽ mất thời gian.
        </p>
        
        <h3>Các phương thức nạp rút đang áp dụng</h3>
        <p>Hiện tại <b>Ga6789</b> đang áp dụng phương thức giao dịch nạp rút qua ngân hàng, liên kết với hầu hết các ngân hàng lớn tại Việt Nam để hội viên lựa chọn. Chỉ cần thông tin tài 
          khoản chính xác và thực hiện theo hướng dẫn từ hệ thống là dễ dàng thành công.
        </p>
        <ImageSection image={FAQs3} caption='GA6789 đang cung cấp phương thức nạp rút nào?'/>

        <h3>Cách nhận khuyến mãi từ nhà cái có khó không?</h3>
        <p>Ngoài việc nâng cấp kho game với nhiều sản phẩm hấp dẫn, sân chơi này còn liên tục cập nhật khuyến mãi với giá trị hấp dẫn. Đây là nguồn vốn giúp hội viên trải nghiệm thêm nhiều 
          sảnh cược tại nhà cái.
        </p>
        <p>Sau khi đăng nhập vào tài khoản, tại màn hình chính chọn vào ô “Khuyến mãi”, có nhiều sự kiện đang áp dụng, nhấn chọn vào chương trình muốn tham gia. Quý khách cũng có thể liên 
          hệ với nhân viên chăm sóc khách hàng để được tư vấn và hỗ trợ tốt nhất.
        </p>

        <h3>Cách lấy lại mật khẩu?</h3>
        <p>Trong trường hợp quên mật khẩu quý khách chỉ cần liên hệ với nhân viên chăm sóc khách hàng của nhà cái là sẽ được hỗ trợ kịp thời. Cung cấp lại mật khẩu đăng nhập vào tài khoản.</p>

        <h3>Câu hỏi thường gặp - Có được tạo nhiều tài khoản không?</h3>
        <p>Theo quy định, mỗi thành viên khi tham gia đặt cược tại nhà cái chỉ được phép tạo duy nhất một tài khoản. Nếu vi phạm hệ thống sẽ khóa tài khoản, không được tiếp tục đặt cược, 
          trải nghiệm sản phẩm tại đây.
        </p>
        <p>Tổng hợp câu hỏi thường gặp và giải đáp chi tiết giúp quý khách hiểu hơn về sân chơi này. Khách hàng có thể thoải mái tham gia đặt cược mà không cần lo lắng bởi <b>GA6789</b> 
          có đầy đủ tính chất pháp lý, kho game đa dạng. Để tham gia trải nghiệm hãy đăng nhập ngay vào tài khoản thử thách vận may ngay nhé.
        </p>
      </div>
    </div>
  )
}

export default FAQs