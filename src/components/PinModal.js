import { Modal } from "antd";
import LoginButton from "./LoginButton";
import OTPInput from "./OtpInput";
const PinModal = ({ open, setOpen }) => {
  const handleOtp = (e) => {
    console.log("OTP WORKING", e);
  };
  return (
    <Modal
      title="Enter your PIN"
      centered
      open={open}
      footer={null}
      onOk={() => setOpen(false)}
      onCancel={() => setOpen(false)}
      width={300}
    >
      <div>
        <OTPInput length={4} onChange={handleOtp} />
        <LoginButton />
      </div>
    </Modal>
  );
};
export default PinModal;
