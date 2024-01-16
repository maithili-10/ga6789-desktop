import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from "react-router-dom";
import UserProvider from './helpers/Context/UserProvider';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

const root = ReactDOM.createRoot(document.getElementById('root'));

// console.clear()
// console.log("%cDừng lại!", "color: rgb(187, 29, 29); font-size:x-large")
// console.log("Đây là một tính năng của trình duyệt dành cho các nhà phát triển. Nếu ai đó bảo bạn sap chép - dán nội dung nào đó vào đây để bật một tính năng của Facebook hoặc “hack” tài khoản của người khác, thì đó là hành vi lừa đảo và sẽ khiến họ có thể truy cập vào tài khoản Facebook của bạn.")
// console.log("Xem https://t.me/itech365 để biết thêm thông tin.")
const queryClient = new QueryClient();

root.render(
  // <React.StrictMode>
    <UserProvider>
      <Router>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools />
        </QueryClientProvider>
      </Router>
    </UserProvider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
