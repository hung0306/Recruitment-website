import { DeleteOutlined } from "@ant-design/icons";
import { Button, Popconfirm, Tooltip } from "antd";
import { deleteCv } from "../../../services/cvService";

function DeleteCv(props) {
  const { record, reload } = props;

  const handleDelete = async () => {
    const response = await deleteCv(record.id);
    if (response) {
      reload();
    }
  };
  return (
    <>
      <Tooltip title="Xóa CV">
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
export default DeleteCv;
