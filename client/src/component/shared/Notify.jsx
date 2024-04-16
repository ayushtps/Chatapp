import { notification } from "antd";
import {
  CheckCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
const Notify = (type, message, description) => {
  let icon;

  if (type === "success") {
    icon = <CheckCircleOutlined style={{ color: "#52c41a" }} />;
  } else if (type === "error") {
    icon = <ExclamationCircleOutlined style={{ color: "#f5222d" }} />;
  } else if (type === "warning") {
    icon = <ExclamationCircleOutlined style={{ color: "#faad14" }} />;
  } else {
    icon = <ExclamationCircleOutlined style={{ color: "#faad14" }} />;
  }

  notification.open({
    message: `${message}`,
    description: `${description}`,
    icon,
    duration: 3,
  });
};

export default Notify;
