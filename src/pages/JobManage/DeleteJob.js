import { Button, Popconfirm, Tooltip, message } from "antd";
import { deleteJob } from "../../services/jobService";
import { DeleteOutlined } from "@ant-design/icons";

function DeleteJob(props) {
  const { record, reload } = props;
  const [messageApi, contextHolder] = message.useMessage();

  const handleDelete = async () => {
    const response = await deleteJob(record.id);
    if (response) {
      reload();
      messageApi.open({
        type: "success",
        content: "Xoá thành công",
        duration: 3,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa thất bại",
        duration: 3,
      });
    }
  };
  return (
    <>
      {contextHolder}
      <Tooltip title="Xóa job">
        <Popconfirm
          title="Bạn có chắc muốn xóa không?"
          onConfirm={handleDelete}
        >
          <Button danger ghost>
            <DeleteOutlined />
          </Button>
        </Popconfirm>
      </Tooltip>
    </>
  );
}
export default DeleteJob;
