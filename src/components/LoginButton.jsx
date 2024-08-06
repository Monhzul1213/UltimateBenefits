import { Button } from "antd";

export const LoginButton = ({ handleClick, loading, isForgot = false }) => {
  const style = {
    width: "100%",
    height: "60px",
    fontSize: "16px",
    backgroundColor: "#00c7f0",
    marginTop: "10px",
  };
  return (
    <Button
      onClick={!loading && handleClick}
      style={style}
      type="primary"
      loading={loading}
    >
      {isForgot ? "Сэргээх" : "Нэвтрэх"}
    </Button>
  );
};
