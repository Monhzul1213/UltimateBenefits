import { useEffect, useRef, useState } from "react";
import { Input, Row, Col } from "antd";

export const OTPInput = ({ length, onChange, register, pin, handleLogin }) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const otpRef = useRef();
  const noRef = useRef();
  const focusOtp = () => {
    otpRef.current.focus({
      cursor: "start",
    });
  };
  useEffect(() => {
    focusOtp();
  }, []);
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    if (/^[0-9]$/.test(value)) {
      newOtp[index] = value;
      setOtp(newOtp);
      onChange(newOtp.join(""));
      if (index < length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    } else {
      newOtp[index] = "";
      setOtp(newOtp);
      onChange(newOtp.join(""));
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      document.getElementById(`otp-input-${index - 1}`).focus();
    }
    if (e.key === "Enter") {
      handleLogin(register, pin);
    }
  };

  return (
    <Row gutter={8} justify="center">
      {otp.map((value, index) => (
        <Col key={index}>
          <Input
            ref={index === 0 ? otpRef : noRef}
            id={`otp-input-${index}`}
            maxLength={1}
            value={value}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            style={{ width: 55, textAlign: "center", fontSize: 40 }}
          />
        </Col>
      ))}
    </Row>
  );
};
