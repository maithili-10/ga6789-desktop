import styles from './HomeContent.module.css';
import sectionOneImg from '../../../assets/HomeContent/sectionOneImg.jpg';
import sectionTwoImg from '../../../assets/HomeContent/sectionTwoImg.jpg';
import sectionThreeImg from '../../../assets/HomeContent/sectionThreeImg.jpg';
import sectionFourthImg from '../../../assets/HomeContent/sectionFourthImg.jpg';
import sectionFifthImg from '../../../assets/HomeContent/sectionFifthImg.jpg';
import sectionSixthImg from '../../../assets/HomeContent/sectionSixthImg.jpg';
import sectionSevenImg from '../../../assets/HomeContent/sectionSevenImg.jpg';
import sectionEightImg from '../../../assets/HomeContent/sectionEightImg.jpg';
import sectionNineImg from '../../../assets/HomeContent/sectionNineImg.jpg';

const HomeContent = () => {

  const links = [{label:'Link Ga6789 chính thức', clickLink:'https://ga6789.net/'}, {label:'Link Ga6789 trên Android', clickLink:'/android'}
  , {label:'Link Ga6789 trên iOS', clickLink:'/ios-download'}]

  return (
    <div className={styles.homeContentWrapper}>
      <div className={styles.homeContent}>
        <p><a href="https://ga6789.net/">Ga6789</a> được đánh giá là một trong những địa chỉ cung cấp link đăng ký đá gà an toàn, chất lượng nhất trên thị trường. Cùng tìm hiểu thêm về sân chơi này nhé!</p>
        <div className={styles.mainHeading}>
          <h2>Ga6789 - Địa chỉ cung cấp đá gà trực tiếp full HD, uy tín</h2>
        </div>
        <p><strong>Ga6789</strong> được nhiều tay chơi trong ngành đánh giá là một trong những sân chơi cung cấp link đá gà chất lượng, uy tín trên thị trường. Trong bài viết ngày hôm nay 
          dưới đây cùng chúng tôi tìm hiểu kỹ hơn về <strong>Ga6789</strong> xem có gì nổi bật nhé!
        </p>

        <div className={styles.sectionOne}>
          <h3>Tổng quan về Ga6789</h3>
          <p><strong>Ga6789</strong> là một trong những thương hiệu cung cấp link đá gà hàng đầu tại Việt Nam và khu vực Châu Á nói chung. Địa chỉ cung cung cấp các dịch vụ cá cược trực tuyến với những trận
            đấu giữa các chiến kê, mang lại cảm giác hồi hộp và kịch tính cho người chơi.</p>
          <p>Với nhiều năm kinh nghiệm trong lĩnh vực cá cược, <strong>Ga6789</strong> đã trở thành một trong những địa chỉ uy tín và được yêu thích nhất tại thị trường Việt Nam. Giao diện 
            đơn giản, thông minh và dễ sử dụng cùng với nhiều chương trình khuyến mãi hấp dẫn và tính năng đặt cược linh hoạt thu hút đã được sự quan tâm của đông đảo tín đồ cá cược tại Việt Nam.</p>
          <div className={styles.imageContentOverlay}>
            <div className={styles.imageWrapper}>
              <img src={sectionOneImg} alt="ga6789"/>
            </div>
            <p><i>Tổng quan về sân chơi Ga6789
            </i></p>
          </div>
          <p>Đến đây, người chơi có thể yên tâm về tính bảo mật và toàn bộ thông tin cá nhân của mình. Sân chơi đảm bảo mọi giao dịch được thực hiện nhanh chóng, chính xác và có tính minh 
            bạch cao.</p>
          <p>Tóm chung, đây là một trong những địa chỉ cung cấp link đá gà hàng đầu cho những anh em yêu thích bộ môn này. Với đội ngũ chuyên nghiệp, hệ thống an toàn và tính năng đa dạng, 
            trang web sẽ là nơi đáng tin cậy để thỏa sức đam mê cá cược của kê thủ.</p>

          <h3>Tổng hợp link truy cập vào sân chơi Ga6789 chính chủ</h3>
          <p>Để tránh rơi vào tình trạng bị lừa đảo bởi những nhà cái kém chất lượng hoặc kẻ giả mạo, thành viên<strong> Ga6789 </strong>nên sử dụng đường dẫn chính chủ khi tham gia chơi.
              Đường dẫn này đã được cập nhật với công nghệ mang đến tốc độ truyền tải rất nhanh, không giật, lag.</p>
          <p>Một số link Ga6789 không bị chặn:</p>
          <div className={styles.myLinksWrapper}>
            {links.map((myLink) => (
              <span key={myLink.label}>✅ <a className={styles.myLinks} href={myLink.clickLink} target='_blank' rel='noreferrer'>{myLink.label}</a></span>
            ))}
          </div>

          <h3>Những điểm hấp dẫn chỉ có tại địa chỉ Ga6789</h3>
          <p>Trên thị trường cá cược hiện nay có rất nhiều sân chơi cung cấp link đá gà chất lượng, để có thể vượt qua những đối thủ mạnh như vậy, <strong> Ga6789 </strong> cũng đã không
            ngừng nâng cấp hệ thống, cải thiện dịch vụ trải nghiệm của khách hàng. Dưới đâ</p>
          
          <h4><i>Giao diện web thiết kế chuyên nghiệp và bắt mắt</i></h4>
          <p>Giao diện web của sân chơi được thiết kế theo một cách rất chuyên nghiệp. Với sự kết hợp hoàn hảo giữa màu sắc và bố cục, trang web này chắc chắn sẽ thu hút được nhiều người 
            dùng. Hơn nữa, các danh mục cũng được sắp xếp theo cách khoa học và dễ sử dụng, giúp người dùng có thể thao tác một cách nhanh chóng và hiệu quả.</p>
          <p>Điều này cho thấy tâm huyết và đầu tư của nhóm ngũ quản trị viên. Nếu trang web này là một nhà cái lừa đảo, chắc chắn rằng họ sẽ không đầu tư nhiều vào giao diện và thiết kế 
            của trang web, mà thay vào đó sẽ tập trung vào việc lừa đảo người dùng.</p>
          <div className={styles.imageContentOverlay}>
            <div className={styles.imageWrapper}>
              <img src={sectionTwoImg} alt="ga6789"/>
            </div>
            <p><i>Giao diện web thiết kế chuyên nghiệp và bắt mắt</i></p>
          </div>
          <h4><i>Tự hào là hệ thống giao dịch đáng tin cậy và siêu tốc</i></h4>
          <p><strong>Ga6789 </strong> tự hào là hệ thống giao dịch đáng tin cậy và đa dạng cho người chơi. Tốc độ và sự tiện lợi trong quá trình tải - rút tiền được đặt lên hàng đầu, vì
            vậy chúng tôi cam kết cung cấp cho người chơi những trải nghiệm tốt nhất có thể</p>
          <p>Với thời gian nạp tiền chỉ từ 3-5 phút và rút tiền từ 15-30 phút, người chơi sẽ không phải đợi lâu để thực hiện các giao dịch.  Để đảm bảo tính an toàn cho người chơi, sân 
            chơi đã kết nối với hầu hết các ngân hàng Việt Nam, cho phép người chơi thực hiện các giao dịch tài chính bằng nhiều hình thức khác nhau như chuyển khoản qua ATM, Internet 
            banking,.. </p>
          <div className={styles.imageContentOverlay}>
            <div className={styles.imageWrapper}>
              <img src={sectionThreeImg} alt="ga6789"/>
            </div>
            <p><i>Hệ thống giao dịch đáng tin cậy và siêu tốc</i></p>
          </div>
        
          <h4><i>Đa dạng chương trình khuyến mãi thú vị</i></h4>                
          <p><strong>Ga6789 </strong> cung mang đến nhiều chương trình khuyến mãi hấp dẫn cho người chơi, giúp tăng cơ hội chiến thắng lớn. Sau đây là những chương trình khuyến mãi
            đặc biệt có tại hệ thống:</p>
          <ul>
            <li>Chương trình khuyến mãi dành cho người chơi mới đăng ký tài khoản trên hệ thống. Người chơi sẽ được tặng một khoản tiền hoặc phần thưởng một số lượt quay miễn phí để
              thử sức với các cá cược</li>
            <li>Ngoài ra, chương trình hoàn trả tiền thua còn là một ưu đãi đặc biệt giúp người chơi nhận lại một phần tiền thua trong quá trình đặt cược. Ưu đãi này cung được áp dụng 
              ở một số trò chơi và có thể thay đổi</li>
            <li>Sân chơi cũng cung cấp chương trình quay thưởng hàng ngày cho người chơi đăng nhập vào hệ thống. Người chơi sẽ có cơ hội nhận được các phần thưởng hấp dẫn và các vật 
              phẩm có giá trị hoặc chơi miễn phí</li>
            <li><strong>Ga6789 </strong>còn có chương trình nạp tiền. Người chơi sẽ được nhận khoản tiền thưởng dựa trên % khuyến mãi khi nạp tiền vào tài khoản, và số tiền thưởng sẽ 
              được tính dựa trên tổng số tiền mà người chơi đã nạp, với giới hạn về số tiền tối đa nhận được.</li>
            <li>Chương trình khuyến mãi giới thiệu bạn bè, người chơi sẽ nhận được khoản tiền thưởng hoặc một số lượt quay miễn phí khi người được giới thiệu đăng ký và tham gia chơi tại 
              hệ thống</li>
          </ul>
          <div className={styles.imageContentOverlay}>
            <div className={styles.imageWrapper}>  
              <img src={sectionFourthImg} alt="ga6789"/>
            </div>
              <p><i>Đa dạng chương trình khuyến mãi thú vị</i></p>
          </div>
          <h4><i>Sở hữu đội ngũ chăm sóc bet thủ tận tình</i></h4>                
          <p><strong>Ga6789 </strong>cũng sở hữu một hệ thống hỗ trợ khách hàng chuyên nghiệp. Những nhân viên được đào tạo chuyên sâu và nhiệt tình sẵn sàng giải đáp mọi thắc mắc, xử lý
            mọi khó khăn của người chơi.</p>
          <h4><i>Hệ thống cung cấp link đá gà hợp pháp</i></h4>                
          <p>Hệ thống là địa chỉ cung cấp link đá gà hoạt động hợp pháp với sự cho phép của chính phủ Philippines và có tổ chức quản lý riêng biệt. Điều này đảm bảo rằng người chơi không
            cần phải lo lắng về các vấn đề vi phạm luật hay lừa đảo.</p>

          <h3>Điểm qua những dịch vụ nổi bật chỉ có tại Ga6789</h3>
          <p>Bên cạnh cung cấp những link đá gà không bị chặn thì<strong> Ga6789 </strong>còn mang đến những sản phẩm, dịch vụ chất lượng:</p>
          <ul>
            <li>Đá gà cựa dao từ Philippines: Sân chơi cũng đã đầu tư mạnh vào hình thức đá gà cựa dao tại Philippines, liên kết với các đấu trường lớn như PS1, TH7A, SP3 và SB2. Người 
              chơi không chỉ được cá cược mà còn có cơ hội theo dõi những trận đấu đỉnh cao của các chú gà chiến từ đấu trường đá gà lớn nhất khu vực.</li>
            <li>Đá gà trực tiếp Thomo: Đặc biệt, hình thức đá gà Thomo trực tiếp tại<strong> Ga6789 </strong>đem đến nhiều tỉ lệ cược hấp dẫn, giúp người chơi có cơ hội chiến thắng cao 
              và kiếm được nhiều lợi nhuận</li>
          </ul>
          <div className={styles.imageContentOverlay}>
            <div className={styles.imageWrapper}>
              <img src={sectionFifthImg} alt="ga6789"/>
            </div>
            <p><i>Những dịch vụ nổi bật chỉ có tại Ga6789</i></p>
          </div>
          <ul>
            <li>Cá cược thể thao: Thể thao được xem là bộ môn giải trí đỉnh cao được vô vàn anh em cược thủ yêu thích, đến đây người chơi có thể bắt kèo tại nhiều trận và giải đấu khác.
              Bet thủ cũng có thể vừa theo dõi trận đấu vừa xem diễn biến kèo của hệ thống.</li>
            <li>Casino trực tuyến: Ngoài ra, sân chơi còn cung cấp các trò chơi casino trực tuyến phổ biến như Baccarat, Blackjack, Roulette và Sicbo. Người chơi có thể tham gia và thử 
              ận ​​may của mình trong trò chơi này, với cơ hội kiếm được những phần thưởng hấp dẫn.</li>
          </ul>

          <h3>Hướng chơi đá gà trực tiếp thông qua Ga6789</h3>
          <p>Nếu bạn muốn tham gia cá cược đá gà hoặc sử dụng các dịch vụ giải trí khác từ<strong> Ga6789 </strong>thì đừng quên tham khảo kỹ những thông tin hướng dẫn thao tác sau đây.</p>
          <h4><i>Cách đăng ký tài khoản Ga6789 để chơi</i></h4>
          <p>Nếu bạn muốn tham gia cá cược hoặc xem đá gà trực tiếp, trước tiên bạn cần phải trở thành thành viên của nhà cái. Để đăng ký tài khoản của <strong> Ga6789 </strong> người 
            dùng thực hiện theo các bước sau:</p>
          <ul>
            <li>Bước 1: Truy cập vào địa chỉ https://ga6789.net/</li>
            <li>Bước 2: Nhấn nút “Đăng ký” trên màn hình trang chủ, có hai vị trí xuất hiện và chọn nút nào cũng được.</li>
            <li>Bước 3: Nhập số điện thoại của bạn vào ô trống trên màn hình và nhập mã xác minh theo hình hiển thị bên cạnh.</li>
            <li>Bước 4: Nhấp vào ô “Đăng ký” để hoàn tất quá trình đăng ký tài khoản mới.</li>
          </ul>
          <div className={styles.imageContentOverlay}>
            <div className={styles.imageWrapper}>
              <img src={sectionSixthImg} alt="ga6789"/>
            </div>
            <p><i>Các bước đăng ký tài khoản mới của Ga6789</i></p>
          </div>

          <h4><i>Cách nạp tiền vào tài khoản đá gà trực tuyến</i></h4>
          <p>Khi tài khoản của bạn đã được tạo thành công, để kích hoạt tài khoản và bắt đầu tham gia các hoạt động, bạn cần thực hiện các bước sau:</p>
          <ul>
            <li>Bước 1: Nhập số tiền mà bạn muốn nạp vào tài khoản. Tuy nhiên, để duy trì tài khoản, số tiền tối thiểu cần phải là 150.000 đồng.</li>
            <li>Bước 2: Chuyển khoản số tiền tương ứng theo thông tin tài khoản nhận được trên màn hình. Trong nội dung chuyển khoản, bạn cần nhập số điện thoại mà bạn đã đăng ký.</li>
          </ul>
          <p>Sau khi bạn hoàn thành quá trình chuyển khoản thành công, hệ thống sẽ tự động kích hoạt và đăng nhập vào tài khoản của bạn. Cần lưu ý rằng đơn vị tiền tệ trong
            <strong> Ga6789 </strong>là điểm, với tỷ lệ chuyển đổi 1 điểm tương ứng với 30.000 đồng tiền thật.</p>
          <div className={styles.imageContentOverlay}>
            <div className={styles.imageWrapper}>
              <img src={sectionSevenImg} alt="ga6789"/>
            </div>
            <p><i>Cách nạp tiền vào Ga6789 để lấy tài khoản</i></p>
          </div>

          <h4><i>Các bước đăng nhập tài khoản cá cược đá gà nhanh</i></h4>
          <p>Nếu đã đăng ký tài khoản thành công và bạn đã có tài khoản chơi tại<strong> Ga6789. </strong>Để bắt đầu cược, hãy làm theo các bước đăng nhập sau đây:</p>
          <ul>
            <li>Bước 1: Truy cập vào trang chủ của<strong> Ga6789 </strong>theo đường link đã cung cấp</li>
            <li>Bước 2: Nhấn vào nút "Đăng nhập" trên giao diện chính của nhà cái.</li>
            <li>Bước 3: Nhập số điện thoại mà bạn đã đăng ký tài khoản.</li>
            <li>Bước 4: Nhập mật khẩu mà hệ thống cung cấp sau khi bạn đã nạp tiền thành công và kích hoạt tài khoản.</li>
            <li>Bước 5: Nhấn "Đăng nhập" sau khi xác nhận nội dung mật khẩu là chính xác.</li>
          </ul>
          <div className={styles.imageContentOverlay}>
            <div className={styles.imageWrapper}>
              <img src={sectionEightImg} alt="ga6789"/>
            </div>
            <p><i>Đăng nhập Ga6789 sau khi có tài khoản</i></p>
          </div>

          <h4><i>Cách rút tiền Ga6789 về</i></h4>
          <p>Để thực hiện việc rút tiền từ tài khoản<strong> Ga6789 </strong>về tài khoản ngân hàng cá nhân, bạn cần thực hiện các bước sau đây:</p>
          <ul>
            <li>Bước 1: Đăng nhập vào tài khoản<strong> Ga6789 </strong>và nhấn nút “Rút tiền” trên màn hình chính.</li>
            <li>Bước 2: Thêm tài khoản ngân hàng nhận tiền bằng cách nhấn nút (+) và điền thông tin tài khoản ngân hàng như: tên ngân hàng, tên chủ tài khoản và số tài khoản nhận tiền. 
              Lưu ý, tên chủ tài khoản phải viết in hoa không dấu.</li>
            <li>Bước 3:Nhập số tiền cần rút, số tiền tối thiểu là 150,000 VND và tối đa là 100,000,000 VND.</li>
            <li>Bước 4: Nhấn nút Xác nhận để gửi yêu cầu rút tiền cho hệ thống xử lý.</li>
          </ul>
          <p>Sau khi hoàn tất các bước trên, giao diện sẽ chuyển đổi về trang chủ và bạn chỉ cần đợi khoảng từ 3 - 5 phút để nhận được thông báo tiền đã được chuyển về tài khoản ngân 
            hàng của mình.</p>
          <div className={styles.imageContentOverlay}>
            <div className={styles.imageWrapper}>
              <img src={sectionNineImg} alt="ga6789"/>
            </div>
            <p><i>Thêm tài khoản ngân hàng để rút tiền Ga6789</i></p>
          </div>
          <h3>Kết luận</h3>
          <p>Trên đây là những thông tin cơ bản giới thiệu về sân chơi cung cấp link đá gà<strong> Ga6789 </strong>hàng đầu Việt Nam và Châu á. Với nhiều ưu điểm trên, hứa hẹn sẽ mang
            đến cho anh em bet thủ những trải nghiệm tuyệt vời.</p>
        </div>
      </div>
    </div>
  )
}

export default HomeContent