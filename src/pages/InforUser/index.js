import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookies";
import { Button, Card, Col, Form, Input, Row, Spin, message } from "antd";

import {
  getDetailUser,
  editUser,
  getSkill,
  getEducation,
  deleteEducation,
  deleteSkill,
  createSkill,
  createEducation,
  getExperience,
  deleteExperience,
  createExperience,
  getCourse,
  createCourse,
  deleteCourse,
  createCertificate,
  deleteCertificate,
  getCertificate,
  createPrize,
  deletePrize,
  getPrize,
  createProject,
  deleteProject,
  getProject,
  createProduct,
  deleteProduct,
  getProduct,
  createActivity,
  deleteActivity,
  getActivity,
} from "../../services/userService";
import "./InforUser.scss";

import SkillSection from "./sections/SkillSection";
import EducationSection from "./sections/EducationSection";
import ExperienceSection from "./sections/ExperienceSection";
import CourseSection from "./sections/CourseSection";
import CertificateSection from "./sections/CertificateSection";
import PrizeSection from "./sections/PrizeSection";
import ProjectSection from "./sections/ProjectSection";
import ProductSection from "./sections/ProductSection";
import ActivitySection from "./sections/ActivitySection";

function InforUser() {
  const [xoay, setXoay] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const idUser = getCookie("id");
  const [info, setInfo] = useState();
  const [skill, setSkill] = useState();
  const [education, setEducation] = useState();
  const [experience, setExperience] = useState();
  const [courses, setCourses] = useState();
  const [certificates, setCertificates] = useState();
  const [prizes, setPrizes] = useState();
  const [projects, setProjects] = useState();
  const [products, setProducts] = useState();
  const [activities, setActivities] = useState();
  const [reload, setReload] = useState(false);
  const [isModalOpenSkill, setIsModalOpenSkill] = useState(false);
  const [isModalOpenEducation, setIsModalOpenEducation] = useState(false);
  const [isModalOpenExperience, setIsModalOpenExperience] = useState(false);
  const [isModalOpenCourse, setIsModalOpenCourse] = useState(false);
  const [isModalOpenCertificate, setIsModalOpenCertificate] = useState(false);
  const [isModalOpenPrize, setIsModalOpenPrize] = useState(false);
  const [isModalOpenProject, setIsModalOpenProject] = useState(false);
  const [isModalOpenProduct, setIsModalOpenProduct] = useState(false);
  const [isModalOpenActivity, setIsModalOpenActivity] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();
  const [formSkill] = Form.useForm();
  const [formEducation] = Form.useForm();
  const [formExperience] = Form.useForm();
  const [formCourse] = Form.useForm();
  const [formCertificate] = Form.useForm();
  const [formPrize] = Form.useForm();
  const [formProject] = Form.useForm();
  const [formProduct] = Form.useForm();
  const [formActivity] = Form.useForm();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailUser(idUser);
      if (response) {
        setInfo(response);
      }
    };
    fetchApi();
  }, []);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getSkill(idUser);
      if (response) {
        setSkill(response);
      }
    };
    fetchApi();
  }, [reload]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getExperience(idUser);
      if (response) {
        setExperience(response);
      }
    };
    fetchApi();
  }, [reload]);
  // console.log(skill);
  // console.log(education);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getEducation(idUser);
      if (response) {
        setEducation(response);
      }
    };
    fetchApi();
  }, [reload]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCourse(idUser);
      if (response) {
        setCourses(response);
      }
    };
    fetchApi();
  }, [reload]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getCertificate(idUser);
      if (response) {
        setCertificates(response);
      }
    };
    fetchApi();
  }, [reload]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getPrize(idUser);
      if (response) {
        setPrizes(response);
      }
    };
    fetchApi();
  }, [reload]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProject(idUser);
      if (response) {
        setProjects(response);
      }
    };
    fetchApi();
  }, [reload]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getProduct(idUser);
      if (response) {
        setProducts(response);
      }
    };
    fetchApi();
  }, [reload]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getActivity(idUser);
      if (response) {
        setActivities(response);
      }
    };
    fetchApi();
  }, [reload]);

  const handleReload = () => {
    setReload(!reload);
  };

  const showModalSkill = () => {
    setIsModalOpenSkill(true);
  };

  const showModalEducation = () => {
    setIsModalOpenEducation(true);
  };

  const showModalCourse = () => {
    setIsModalOpenCourse(true);
  };
  const showModalExperience = () => {
    setIsModalOpenExperience(true);
  };

  const showModalCertificate = () => {
    setIsModalOpenCertificate(true);
  };
  const showModalPrize = () => {
    setIsModalOpenPrize(true);
  };

  const showModalProject = () => {
    setIsModalOpenProject(true);
  };

  const showModalProduct = () => {
    setIsModalOpenProduct(true);
  };

  const showModalActivity = () => {
    setIsModalOpenActivity(true);
  };

  const handleCancelSkill = () => {
    setIsModalOpenSkill(false);
  };

  const handleCancelEducation = () => {
    setIsModalOpenEducation(false);
  };

  const handleCancelCourse = () => {
    setIsModalOpenCourse(false);
  };

  const handleCancelExperience = () => {
    setIsModalOpenExperience(false);
  };
  const handleCancelCertificate = () => {
    setIsModalOpenCertificate(false);
  };
  const handleCancelPrize = () => {
    setIsModalOpenPrize(false);
  };
  const handleCancelProject = () => {
    setIsModalOpenProject(false);
  };

  const handleCancelProduct = () => {
    setIsModalOpenProduct(false);
  };
  const handleCancelActivity = () => {
    setIsModalOpenActivity(false);
  };

  const handleFinishEducation = async (value) => {
    const newValue = {
      ...value,
      idUser: idUser,
    };
    // console.log(newValue);

    const response = await createEducation(newValue);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm job thành công",
        duration: 3,
      });
      const updatedEducation = await getEducation(idUser);
      setEducation(updatedEducation);

      // Đóng modal và reset form
      setIsModalOpenEducation(false);
      form.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm job thất bại",
        duration: 3,
      });
    }
  };

  const handleFinishSkill = async (value) => {
    const newValue = {
      ...value,
      idUser: idUser,
    };
    // console.log(newValue);

    const response = await createSkill(newValue);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm job thành công",
        duration: 3,
      });
      form.resetFields();
      formSkill.resetFields();
      const updatedSkill = await getSkill(idUser);
      setSkill(updatedSkill);

      setIsModalOpenSkill(false);
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm job thất bại",
        duration: 3,
      });
    }
  };

  const handleFinish = async (values) => {
    setXoay(true);
    const response = await editUser(idUser, values);
    if (response) {
      setTimeout(() => {
        if (response) {
          messageApi.open({
            type: "success",
            content: "Cập nhật công ty thành công",
            duration: 3,
          });
        } else {
          messageApi.open({
            type: "error",
            content: "Cập nhật công ty thất bại",
            duration: 3,
          });
        }
      }, 1000);

      setXoay(false);
      setIsEdit(false);
      // alert("ok")
      // console.log(values);
    } else {
      alert("ko");
    }
  };

  const handleCancle = () => {
    setIsEdit(false);
    form.resetFields();
  };
  const handleEdit = () => {
    setIsEdit(true);
  };

  const handleDeleteSkill = async (id) => {
    const response = await deleteSkill(id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xoá thành công",
        duration: 3,
      });
      const updatedSkill = await getSkill(idUser);
      setSkill(updatedSkill);
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa thất bại",
        duration: 3,
      });
    }
  };
  const handleDeleteEducation = async (id) => {
    const response = await deleteEducation(id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xoá thành công",
        duration: 3,
      });
      const updatedEducation = await getEducation(idUser);
      setEducation(updatedEducation);
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa thất bại",
        duration: 3,
      });
    }
  };

  const handleFinishExperience = async (value) => {
    const newValue = {
      ...value,
      idUser: idUser,
      startYear: value.startYear ? value.startYear.format("YYYY") : null,
      endYear: value.endYear ? value.endYear.format("YYYY") : null,
    };

    const response = await createExperience(newValue);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm kinh nghiệm thành công",
        duration: 3,
      });
      const updatedExperience = await getExperience(idUser);
      setExperience(updatedExperience);

      // Đóng modal và reset form
      setIsModalOpenExperience(false);
      formExperience.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm kinh nghiệm thất bại",
        duration: 3,
      });
    }
  };

  const handleDeleteExperience = async (id) => {
    const response = await deleteExperience(id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xóa kinh nghiệm thành công",
        duration: 3,
      });
      const updatedExperience = await getExperience(idUser);
      setExperience(updatedExperience);
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa kinh nghiệm thất bại",
        duration: 3,
      });
    }
  };

  const handleFinishCourse = async (value) => {
    const newValue = {
      ...value,
      idUser: idUser,
      startYear: value.startYear ? value.startYear.format("YYYY") : null,
      endYear: value.endYear ? value.endYear.format("YYYY") : null,
    };

    const response = await createCourse(newValue);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm khóa học thành công",
        duration: 3,
      });
      const updatedCourses = await getCourse(idUser);
      setCourses(updatedCourses);

      // Đóng modal và reset form
      setIsModalOpenCourse(false);
      formCourse.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm khóa học thất bại",
        duration: 3,
      });
    }
  };

  const handleDeleteCourse = async (id) => {
    const response = await deleteCourse(id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xóa khóa học thành công",
        duration: 3,
      });
      const updatedCourses = await getCourse(idUser);
      setCourses(updatedCourses);
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa khóa học thất bại",
        duration: 3,
      });
    }
  };

  const handleDeleteCertificate = async (id) => {
    const response = await deleteCertificate(id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xóa chứng chỉ thành công",
        duration: 3,
      });
      const updatedCertificates = await getCertificate(idUser);
      setCertificates(updatedCertificates);
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa chứng chỉ thất bại",
        duration: 3,
      });
    }
  };

  const handleFinishCertificate = async (value) => {
    const newValue = {
      ...value,
      idUser: idUser,
      date: value.date ? value.date.format("MM/YYYY") : null,
    };

    const response = await createCertificate(newValue);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm chứng chỉ thành công",
        duration: 3,
      });
      const updatedCertificates = await getCertificate(idUser);
      setCertificates(updatedCertificates);

      // Đóng modal và reset form
      setIsModalOpenCertificate(false);
      formCertificate.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm chứng chỉ thất bại",
        duration: 3,
      });
    }
  };

  const handleFinishPrize = async (value) => {
    const newValue = {
      ...value,
      idUser: idUser,
      date: value.date ? value.date.format("MM/YYYY") : null,
    };

    const response = await createPrize(newValue);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm giải thưởng thành công",
        duration: 3,
      });
      const updatedPrizes = await getPrize(idUser);
      setPrizes(updatedPrizes);

      // Đóng modal và reset form
      setIsModalOpenPrize(false);
      formPrize.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm giải thưởng thất bại",
        duration: 3,
      });
    }
  };

  const handleDeletePrize = async (id) => {
    const response = await deletePrize(id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xóa giải thưởng thành công",
        duration: 3,
      });
      const updatedPrizes = await getPrize(idUser);
      setPrizes(updatedPrizes);
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa giải thưởng thất bại",
        duration: 3,
      });
    }
  };

  const handleFinishProject = async (value) => {
    const newValue = {
      ...value,
      idUser: idUser,
      startDate: value.startDate ? value.startDate.format("MM/YYYY") : null,
      endDate: value.endDate ? value.endDate.format("MM/YYYY") : null,
    };

    const response = await createProject(newValue);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm dự án thành công",
        duration: 3,
      });
      const updatedProjects = await getProject(idUser);
      setProjects(updatedProjects);

      // Đóng modal và reset form
      setIsModalOpenProject(false);
      formProject.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm dự án thất bại",
        duration: 3,
      });
    }
  };

  const handleDeleteProject = async (id) => {
    const response = await deleteProject(id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xóa dự án thành công",
        duration: 3,
      });
      const updatedProjects = await getProject(idUser);
      setProjects(updatedProjects);
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa dự án thất bại",
        duration: 3,
      });
    }
  };

  const handleFinishProduct = async (value) => {
    const newValue = {
      ...value,
      idUser: idUser,
      completionDate: value.completionDate
        ? value.completionDate.format("MM/YYYY")
        : null,
    };

    const response = await createProduct(newValue);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm sản phẩm thành công",
        duration: 3,
      });
      const updatedProducts = await getProduct(idUser);
      setProducts(updatedProducts);

      // Đóng modal và reset form
      setIsModalOpenProduct(false);
      formProduct.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm sản phẩm thất bại",
        duration: 3,
      });
    }
  };

  // Function to handle delete product
  const handleDeleteProduct = async (id) => {
    const response = await deleteProduct(id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xóa sản phẩm thành công",
        duration: 3,
      });
      const updatedProducts = await getProduct(idUser);
      setProducts(updatedProducts);
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa sản phẩm thất bại",
        duration: 3,
      });
    }
  };

  const handleFinishActivity = async (value) => {
    const newValue = {
      ...value,
      idUser: idUser,
      startDate: value.startDate ? value.startDate.format("MM/YYYY") : null,
      endDate: value.endDate ? value.endDate.format("MM/YYYY") : null,
    };

    const response = await createActivity(newValue);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm hoạt động thành công",
        duration: 3,
      });
      const updatedActivities = await getActivity(idUser);
      setActivities(updatedActivities);

      // Đóng modal và reset form
      setIsModalOpenActivity(false);
      formActivity.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm hoạt động thất bại",
        duration: 3,
      });
    }
  };

  const handleDeleteActivity = async (id) => {
    const response = await deleteActivity(id);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Xóa hoạt động thành công",
        duration: 3,
      });
      const updatedActivities = await getActivity(idUser);
      setActivities(updatedActivities);
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa hoạt động thất bại",
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}

      <div className="container">
        {info && (
          <Spin spinning={xoay} tip="vui lòng chờ...">
            {/* Card thông tin công ty */}
            <Row gutter={[0, 20]}>
              <Col span={24}>
                <Card
                  style={{ marginTop: "20px" }}
                  title="Thông tin ứng viên"
                  extra={
                    !isEdit ? (
                      <Button
                        style={{
                          backgroundColor: "green",
                          borderColor: "green",
                          color: "white",
                        }}
                        onClick={handleEdit}
                      >
                        Chỉnh sửa
                      </Button>
                    ) : (
                      <Button onClick={handleCancle}>Hủy</Button>
                    )
                  }
                >
                  <Form
                    layout="vertical"
                    onFinish={handleFinish}
                    initialValues={info}
                    form={form}
                    disabled={!isEdit}
                  >
                    <Row gutter={20}>
                      <Col span={24}>
                        <Form.Item label="Họ tên" name="nameUser">
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item label="Email" name="email">
                          <Input />
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        <Form.Item label="Số điện thoại" name="phone">
                          <Input />
                        </Form.Item>
                      </Col>

                      {isEdit && (
                        <Col>
                          <Form.Item>
                            <Button
                              style={{
                                backgroundColor: "green",
                                borderColor: "green",
                                color: "white",
                              }}
                              className="mr-10"
                              type="primary"
                              htmlType="submit"
                            >
                              Cập nhật
                            </Button>
                            <Button onClick={handleCancle}>Hủy</Button>
                          </Form.Item>
                        </Col>
                      )}
                    </Row>
                  </Form>
                </Card>
              </Col>

              <Col span={24}>
                <SkillSection
                  skill={skill}
                  onShowModal={showModalSkill}
                  isModalOpen={isModalOpenSkill}
                  onCancel={handleCancelSkill}
                  onDelete={handleDeleteSkill}
                  onFinish={handleFinishSkill}
                  form={formSkill}
                  onReload={handleReload}
                />
              </Col>

              <Col span={24}>
                <EducationSection
                  education={education}
                  onShowModal={showModalEducation}
                  isModalOpen={isModalOpenEducation}
                  onCancel={handleCancelEducation}
                  onDelete={handleDeleteEducation}
                  onFinish={handleFinishEducation}
                  form={formEducation}
                  onReload={handleReload}
                />
              </Col>

              <Col span={24}>
                <ExperienceSection
                  experience={experience}
                  onShowModal={showModalExperience}
                  isModalOpen={isModalOpenExperience}
                  onCancel={handleCancelExperience}
                  onDelete={handleDeleteExperience}
                  onFinish={handleFinishExperience}
                  form={formExperience}
                  onReload={handleReload}
                />
              </Col>

              <Col span={24}>
                <CourseSection
                  courses={courses}
                  onShowModal={showModalCourse}
                  isModalOpen={isModalOpenCourse}
                  onCancel={handleCancelCourse}
                  onDelete={handleDeleteCourse}
                  onFinish={handleFinishCourse}
                  form={formCourse}
                  onReload={handleReload}
                />
              </Col>

              <Col span={24}>
                <CertificateSection
                  certificates={certificates}
                  onShowModal={showModalCertificate}
                  isModalOpen={isModalOpenCertificate}
                  onCancel={handleCancelCertificate}
                  onDelete={handleDeleteCertificate}
                  onFinish={handleFinishCertificate}
                  form={formCertificate}
                  onReload={handleReload}
                />
              </Col>

              <Col span={24}>
                <PrizeSection
                  prizes={prizes}
                  onShowModal={showModalPrize}
                  isModalOpen={isModalOpenPrize}
                  onCancel={handleCancelPrize}
                  onDelete={handleDeletePrize}
                  onFinish={handleFinishPrize}
                  form={formPrize}
                  onReload={handleReload}
                />
              </Col>
              <Col span={24}>
                <ProjectSection
                  projects={projects}
                  onShowModal={showModalProject}
                  isModalOpen={isModalOpenProject}
                  onCancel={handleCancelProject}
                  onDelete={handleDeleteProject}
                  onFinish={handleFinishProject}
                  form={formProject}
                  onReload={handleReload}
                />
              </Col>

              <Col span={24}>
                <ProductSection
                  products={products}
                  onShowModal={showModalProduct}
                  isModalOpen={isModalOpenProduct}
                  onCancel={handleCancelProduct}
                  onDelete={handleDeleteProduct}
                  onFinish={handleFinishProduct}
                  form={formProduct}
                  onReload={handleReload}
                />
              </Col>

              <Col span={24}>
                <ActivitySection
                  activities={activities}
                  onShowModal={showModalActivity}
                  isModalOpen={isModalOpenActivity}
                  onCancel={handleCancelActivity}
                  onDelete={handleDeleteActivity}
                  onFinish={handleFinishActivity}
                  form={formActivity}
                  onReload={handleReload}
                />
              </Col>
            </Row>
          </Spin>
        )}
      </div>
    </>
  );
}
export default InforUser;
