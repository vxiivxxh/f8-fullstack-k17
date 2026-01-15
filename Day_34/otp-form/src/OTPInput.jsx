import React, { useState, useRef, useEffect } from 'react';
import { Toaster, toast } from 'sonner';
import confetti from 'canvas-confetti';

const CORRECT_OTP = "123456";

const OTPInput = () => {
  // Khởi tạo mảng 6 ô trống
  const [otp, setOtp] = useState(new Array(6).fill(""));
  // Mảng chứa các refs để quản lý focus
  const inputRefs = useRef([]);

  // Hàm xử lý khi nhập số
  const handleChange = (element, index) => {
    const value = element.value;
    if (isNaN(value)) return; // Chỉ cho phép nhập số

    const newOtp = [...otp];
    // Chỉ lấy ký tự cuối cùng nếu người dùng nhập đè
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Tự động chuyển sang ô tiếp theo nếu có giá trị
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace') {
      // Nếu ô hiện tại trống và không phải ô đầu tiên, quay lại ô trước
      if (!otp[index] && index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  // Hàm xử lý paste
  const handlePaste = (e) => {
    e.preventDefault();
    const data = e.clipboardData.getData("text").trim();
    
    // Kiểm tra nếu dữ liệu dán vào là số và đủ độ dài
    if (!/^\d+$/.test(data)) return;

    const pasteData = data.split("").slice(0, 6); // Lấy tối đa 6 số
    const newOtp = [...otp];

    pasteData.forEach((char, index) => {
      newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus vào ô cuối cùng đã điền hoặc ô thứ 6
    const lastFocusedIndex = Math.min(pasteData.length - 1, 5);
    inputRefs.current[lastFocusedIndex].focus();
  };

  // Tự động kiểm tra khi đủ 6 số
  useEffect(() => {
    const fullOtp = otp.join("");
    if (fullOtp.length === 6) {
      verifyOtp(fullOtp);
    }
  }, [otp]);

  // Hàm xác thực OTP
  const verifyOtp = (code) => {
    if (code === CORRECT_OTP) {
      toast.success("Xác thực thành công!");
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#22c55e', '#3b82f6', '#ef4444', '#eab308']
      });
    } else {
      toast.error("OTP không chính xác", {
        description: "Vui lòng kiểm tra lại mã xác nhận."
      });
    }
  };

  const handleReset = () => {
    setOtp(new Array(6).fill(""));
    inputRefs.current[0].focus();
  };

  const renderInput = (index) => (
    <input
      key={index}
      type="text"
      inputMode="numeric"
      maxLength={1}
      ref={(el) => (inputRefs.current[index] = el)}
      value={otp[index]}
      onChange={(e) => handleChange(e.target, index)}
      onKeyDown={(e) => handleKeyDown(e, index)}
      className="w-14 h-16 border border-gray-600 rounded-lg bg-transparent text-center text-2xl font-bold text-white focus:border-white focus:ring-1 focus:ring-white outline-none transition-all placeholder-transparent"
    />
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <Toaster position="top-center" richColors theme="dark" />
      
      <div className="max-w-md text-center w-full">
        <h2 className="text-3xl font-bold mb-4 text-white">Xác thực OTP</h2>
        <p className="text-gray-400 mb-10">Nhập mã 6 chữ số được gửi đến thiết bị của bạn. <br/>(Thử: <span className="text-white font-bold">123456</span>)</p>
        
        <div className="flex items-center justify-center gap-4 mb-10" onPaste={handlePaste}>
          <div className="flex gap-2">
            {[0, 1, 2].map((index) => renderInput(index))}
          </div>
          
          <div className="w-4 h-1 bg-gray-600 rounded-full"></div>
          
          <div className="flex gap-2">
            {[3, 4, 5].map((index) => renderInput(index))}
          </div>
        </div>

        <button 
          onClick={handleReset}
          className="text-sm text-gray-400 hover:text-white transition-colors underline decoration-gray-600 hover:decoration-white underline-offset-4"
        >
          Xóa mã và nhập lại
        </button>
      </div>
    </div>
  );
};

export default OTPInput;
