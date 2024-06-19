import { Input, Modal } from "antd";
import LoginButton from "./LoginButton";
const PinModal = ({ open, setOpen }) => {
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
        <Input.OTP style={{ width: 250 }} length={4} />
        <LoginButton />
      </div>
    </Modal>
  );
};
export default PinModal;
