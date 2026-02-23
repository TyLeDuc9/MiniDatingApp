# MiniDatingApp
📩 Liên hệ
Gmail: ducty9963@gmail.com
Facebook: https://www.facebook.com/eucyldt/
### 🔹 Hệ thống Mini Dating App
🚀 Công nghệ sử dụng

### 🔹 Frontend
- ReactJs
- Typescript
- Redux
- Axios
- React Router
- TailwindCSS
- Frontend (React + TypeScript) chịu trách nhiệm giao diện, tương tác người dùng, gọi API và hiển thị kết quả.
Logic hiển thị được tách bằng component, custom hook và Redux để dễ bảo trì.

### 🔹 Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT – xác thực người dùng
- bcryptjs – mã hóa mật khẩu
- Backend-Database (Node.js + Express, MongoDB)
Xử lý toàn bộ logic nghiệp vụ như đăng nhập, like, match, lưu lịch rảnh và tìm slot trùng.
Lưu trữ dữ liệu như profile, like, match và availability.

### 🔹 Lưu trữ data
- Local Storage (Frontend)
- Lưu: token, thông tin user đang đăng nhập   
- Mục đích: giữ trạng thái đăng nhập khi reload trang
- Database (MongoDB)
- User
- Profile
- Match
- Availability

### 🔹 Cách hoạt động của logic match
1. User A like B lưu lại
2. Kiểm tra User B chưa like User A thì không tạo match
3. Nếu User B đã like User A thì tạo match
4. Match sẽ được lưu lại và cho phép cả hai chọn lịch hẹn

### 🔹 Cách hoạt động của logic tìm slot
1. Kiểm tra User đã match hay chưa
2. Nếu match thì cho phép hai user chọn lịch hẹn
3. Mỗi user có thể chọn nhiều giờ trong ngày và giới hạn trong 3 tuần tới, user không được phép chọn ngày hay khoảng thời gian thực đã trôi qua, mỗi cuộc hẹn có tối đa là 1 tiếng.
4. Nếu thời gian chọn của User A và User B cùng ngày cùng khoảng thời gian sẽ thông báo: Hai bạn có date hẹn vào: ngày-giờ.
5. Nếu không cùng ngày hoặc thời gian hoặc User A đã chọn và User B chưa chọn và ngược lại thì thông báo: Chưa tìm được thời gian trùng. Vui lòng chọn lại.

### 🔹 Đề xuất Cải thiện
1. Thêm trạng thái lịch hẹn có thể hủy.
2. Cập nhật lại thông tin profile.
3. Bảo mật nâng cao.

### 🔹 Đề xuất thêm tính năng mới
1. Thông báo: khi có match mới và lịch hẹn được xác nhận giúp cho người dùng dễ dàng nhận biết hơn không phải xem lịch.
2. Chat: có thể trao đổi, trò chuyện với nhau để làm tăng khả năng thành công khi gặp và xác thực hơn.

### 🔹 Hướng dẫn trải nghiệm
1. Đăng ký nhập đầy đủ thông tin
2. Đăng nhập
3. Thích profile và chờ người khác thích lại profile của bạn
4. Trang match sẽ hiển thị đã match với ai ấn hẹn để chọn thời gian phù hợp với bạn và chờ đối phương chọn thời gian hẹn với bạn
5. Nếu cả hai cùng thời gian thì sẽ thông báo ngày và thời gian đã hẹn còn chưa thì vui lòng chờ đợi hoặc chọn thời gian khác hoặc duyên phận
6. Tài khoản demo có thể trải nghiệm
- le@gmail.com
- oanh@gmail.com
- trinh@gmail.com
- tung@gmail.com
- password cho tất cả: 123456
