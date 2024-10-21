import { useEffect, useState } from "react"
import { getCookie } from "../../helpers/cookies";
import skillimg from "../../image/hocvan.png";
import hocvan from "../../image/skill.png"
import { Button, Card, Col, Form, Input, Modal, Row, Spin, message, DatePicker } from "antd";


import {
    getDetailUser, editUser, getSkill, getEducation, deleteEducation, editEducation, deleteSkill, createSkill, createEducation, editSkill, getExperience, editExperience, deleteExperience, createExperience, getCourse, createCourse, deleteCourse, editCourse, createCertificate, deleteCertificate, editCertificate, getCertificate, createPrize, deletePrize, editPrize, getPrize, createProject, deleteProject, editProject, getProject, createProduct, deleteProduct, editProduct, getProduct, createActivity, deleteActivity, editActivity, getActivity
} from "../../services/userService";
import "./InforUser.scss";
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import EditInfor from "./editInfor";
import EditEducation from "./editEducation";
import EditExperience from "./editExperience";
import EditCourse from "./editCourse";
import EditCertificate from "./editCertificate";
import EditPrize from "./editPrize";
import EditProject from "./editProject";
import EditProduct from "./editProduct";
import EditActivity from "./editActivity";
import Goback from "../../Components/Goback";
const { TextArea } = Input;


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
                setInfo(response)
            }

        };
        fetchApi();
    }, [])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getSkill(idUser);
            if (response) {
                setSkill(response)
            }

        };
        fetchApi();
    }, [reload])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getExperience(idUser);
            if (response) {
                setExperience(response)
            }

        };
        fetchApi();
    }, [reload])
    console.log(skill);
    console.log(education);



    useEffect(() => {
        const fetchApi = async () => {
            const response = await getEducation(idUser);
            if (response) {
                setEducation(response)
            }

        };
        fetchApi();
    }, [reload])

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

        setReload(!reload)
    }



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
            idUser: idUser
        }
        console.log(newValue);

        const response = await createEducation(newValue)
        if (response) {
            messageApi.open({
                type: 'success',
                content: 'Thêm job thành công',
                duration: 3
            });
            const updatedEducation = await getEducation(idUser);
            setEducation(updatedEducation);

            // Đóng modal và reset form
            setIsModalOpenEducation(false);
            form.resetFields()




        } else {
            messageApi.open({
                type: 'error',
                content: 'Thêm job thất bại',
                duration: 3
            });

        }



    }

    const handleFinishSkill = async (value) => {
        const newValue = {
            ...value,
            idUser: idUser
        }
        console.log(newValue);

        const response = await createSkill(newValue)
        if (response) {
            messageApi.open({
                type: 'success',
                content: 'Thêm job thành công',
                duration: 3
            });
            form.resetFields();
            formSkill.resetFields()
            const updatedSkill = await getSkill(idUser);
            setSkill(updatedSkill);

            setIsModalOpenSkill(false);






        } else {
            messageApi.open({
                type: 'error',
                content: 'Thêm job thất bại',
                duration: 3
            });

        }



    }


    const handleFinish = async (values) => {
        setXoay(true)
        const response = await editUser(idUser, values)
        if (response) {
            setTimeout(() => {
                if (response) {
                    messageApi.open({
                        type: 'success',
                        content: 'Cập nhật công ty thành công',
                        duration: 3
                    });





                } else {
                    messageApi.open({
                        type: 'error',
                        content: 'Cập nhật công ty thất bại',
                        duration: 3
                    });

                }
            }, 1000)

            setXoay(false)
            setIsEdit(false)
            // alert("ok")
            console.log(values);
        } else {
            alert("ko")
        }

    }

    const handleCancle = () => {
        setIsEdit(false)
        form.resetFields()

    }
    const handleEdit = () => {
        setIsEdit(true)

    };


    const handleDeleteSkill = async (id) => {
        const response = await deleteSkill(id)
        if (response) {

            messageApi.open({
                type: 'success',
                content: 'Xoá thành công',
                duration: 3
            });
            const updatedSkill = await getSkill(idUser);
            setSkill(updatedSkill);








        } else {
            messageApi.open({
                type: 'error',
                content: 'Xóa thất bại',
                duration: 3
            });

        }


    };
    const handleDeleteEducation = async (id) => {
        const response = await deleteEducation(id)
        if (response) {

            messageApi.open({
                type: 'success',
                content: 'Xoá thành công',
                duration: 3
            });
            const updatedEducation = await getEducation(idUser);
            setEducation(updatedEducation);








        } else {
            messageApi.open({
                type: 'error',
                content: 'Xóa thất bại',
                duration: 3
            });

        }


    }



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
            completionDate: value.completionDate ? value.completionDate.format("MM/YYYY") : null,
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
            <Goback/>
            <div className="container">
                {info && (
                    <Spin spinning={xoay} tip="vui lòng chờ...">
                        {/* Card thông tin công ty */}
                        <Row gutter={[0, 20]}>
                            <Col span={24}>
                                <Card style={{marginTop:"20px"}} title="Thông tin ứng viên" extra={
                                    !isEdit ? (
                                        <Button  style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} onClick={handleEdit}>Chỉnh sửa</Button>
                                    ) : (
                                        <Button onClick={handleCancle}>Hủy</Button>
                                    )
                                }>
                                    <Form layout="vertical" onFinish={handleFinish} initialValues={info} form={form} disabled={!isEdit}>
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
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} className="mr-10" type="primary" htmlType="submit">Cập nhật</Button>
                                                        <Button onClick={handleCancle}>Hủy</Button>
                                                    </Form.Item>
                                                </Col>
                                            )}
                                        </Row>
                                    </Form>
                                </Card>

                            </Col>


                            <Col span={24}>
                                {/* Card Kỹ năng */}
                                <Card extra={<Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} onClick={showModalSkill} type="primary" >Thêm kỹ năng</Button>} title="Kỹ năng">
                                    {/* Hiển thị danh sách kỹ năng */}
                                    {skill && skill.length > 0 ? (
                                        skill.map((item, index) => (
                                            <Card
                                                key={item.id}
                                                type="inner"
                                                title={item.skillName}
                                                style={{ marginBottom: '10px' }}
                                                extra={
                                                    <>
                                                        <EditInfor onReload={handleReload} item={item} />
                                                        <Button onClick={() => handleDeleteSkill(item.id)} type="link" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }}>Xóa</Button>
                                                    </>
                                                }
                                            >
                                                <p>Mô tả: {item.description}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                             <p>Không có kỹ năng nào.</p>
                                             <div style={{alignItems:"top"}}><img width={"90px"} src="https://www.topcv.vn/v3/profile/profile-png/profile-skills.png"/></div>
                                        </div>
                                       
                                    )}

                                    <Modal title="Kỹ năng" footer={null} onCancel={handleCancelSkill} open={isModalOpenSkill}>
                                        <Form layout="vertical" onFinish={handleFinishSkill} form={formSkill}>  {/* Đảm bảo truyền đúng form */}
                                            <Row gutter={20}>
                                                <Col span={24}>
                                                    <Form.Item label="Tên kỹ năng" name="skillName">
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Mô tả kỹ năng" name="description">
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} type="primary" htmlType="submit">Thêm</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>
                                </Card>

                            </Col>

                            <Col span={24}>
                                {/* Card Học vấn */}
                                <Card extra={<Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} onClick={showModalEducation} type="primary" >Thêm học vấn</Button>} title="Học vấn">
                                    {/* Hiển thị danh sách học vấn */}
                                    {education && education.length > 0 ? (
                                        education.map((item, index) => (
                                            <Card
                                                key={index}
                                                type="inner"
                                                title={item.school}
                                                style={{ marginBottom: '10px' }}
                                                extra={
                                                    <>
                                                        <EditEducation item={item} onReload={handleReload} />
                                                        <Button onClick={() => handleDeleteEducation(item.id)} type="link" icon={<DeleteOutlined />} style={{ color: '#ff4d4f' }}>Xóa</Button>
                                                    </>
                                                }
                                            >
                                                <p>Chuyên ngành: {item.major}</p>
                                                <p>Mô tả: {item.description}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                        <p>Không có học vấn nào.</p>
                                        <div style={{alignItems:"top"}}><img width={"90px"} src="https://www.topcv.vn/v3/profile/profile-png/profile-education.png"/></div>
                                   </div>
                                    )}

                                    <Modal title="Học vấn" footer={null} onCancel={handleCancelEducation} open={isModalOpenEducation}>
                                        <Form layout="vertical" onFinish={handleFinishEducation} form={formEducation}>  {/* Đảm bảo truyền đúng form */}
                                            <Row gutter={20}>
                                                <Col span={24}>
                                                    <Form.Item label="Trường học" name="school">
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Chuyên ngành" name="major">
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Mô tả" name="description">
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} type="primary" htmlType="submit">Thêm</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>
                                </Card>

                            </Col>

                            <Col span={24}>
                                <Card extra={<Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} onClick={showModalExperience} type="primary">Thêm kinh nghiệm</Button>} title="Kinh nghiệm">
                                    {/* Hiển thị danh sách kinh nghiệm */}
                                    {experience && experience.length > 0 ? (
                                        experience.map((item, index) => (
                                            <Card
                                                key={index}
                                                type="inner"
                                                title={item.companyName}
                                                style={{ marginBottom: "10px" }}
                                                extra={
                                                    <>
                                                        <EditExperience item={item} onReload={handleReload} />
                                                        <Button onClick={() => handleDeleteExperience(item.id)} type="link" icon={<DeleteOutlined />} style={{ color: "#ff4d4f" }}>Xóa</Button>
                                                    </>
                                                }
                                            >
                                                <p>Chức vụ: {item.position}</p>
                                                <p>Thời gian: {item.startYear} - {item.endYear}</p>
                                                <p>Mô tả: {item.description}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                        <p>Không có kinh nghiệm nào.</p>
                                        <div style={{alignItems:"top"}}><img width={"90px"} src="https://www.topcv.vn/v3/profile/profile-png/profile-experience.png"/></div>
                                   </div>
                                    )}

                                    <Modal title="Kinh nghiệm" footer={null} onCancel={handleCancelExperience} open={isModalOpenExperience}>
                                        <Form layout="vertical" onFinish={handleFinishExperience} form={formExperience}>
                                            <Row gutter={20}>
                                                <Col span={24}>
                                                    <Form.Item label="Tên công ty" name="companyName" rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Chức vụ" name="position" rules={[{ required: true, message: "Vui lòng nhập chức vụ" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Năm bắt đầu" name="startYear" rules={[{ required: true, message: "Vui lòng chọn năm bắt đầu" }]}>
                                                        <DatePicker picker="year" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Năm kết thúc" name="endYear" rules={[{ required: true, message: "Vui lòng chọn năm kết thúc" }]}>
                                                        <DatePicker picker="year" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Mô tả" name="description">
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} type="primary" htmlType="submit">Thêm</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>
                                </Card>
                            </Col>

                            <Col span={24}>
                                <Card extra={<Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} onClick={showModalCourse} type="primary">Thêm khóa học</Button>} title="Khóa học">
                                    {/* Hiển thị danh sách khóa học */}
                                    {courses && courses.length > 0 ? (
                                        courses.map((item, index) => (
                                            <Card
                                                key={index}
                                                type="inner"
                                                title={item.courseName}
                                                style={{ marginBottom: "10px" }}
                                                extra={
                                                    <>
                                                        <EditCourse item={item} onReload={handleReload}/>
                                                        <Button onClick={() => handleDeleteCourse(item.id)} type="link" icon={<DeleteOutlined />} style={{ color: "#ff4d4f" }}>Xóa</Button>
                                                    </>
                                                }
                                            >
                                                <p>Tổ chức: {item.organization}</p>
                                                <p>Thời gian: {item.startYear} - {item.endYear}</p>
                                                <p>Mô tả: {item.description}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                             <p>Không có khóa học nào.</p>
                                             <div style={{alignItems:"top"}}><img width={"90px"} src="https://www.topcv.vn/v3/profile/profile-png/profile-course.png"/></div>
                                        </div>
                                    )}

                                    <Modal title="Khóa học" footer={null} onCancel={handleCancelCourse} open={isModalOpenCourse}>
                                        <Form layout="vertical" onFinish={handleFinishCourse} form={formCourse}>
                                            <Row gutter={20}>
                                                <Col span={24}>
                                                    <Form.Item label="Tên khóa học" name="courseName" rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Tổ chức" name="organization" rules={[{ required: true, message: "Vui lòng nhập tên tổ chức" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Năm bắt đầu" name="startYear" rules={[{ required: true, message: "Vui lòng chọn năm bắt đầu" }]}>
                                                        <DatePicker picker="year" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Năm kết thúc" name="endYear" rules={[{ required: true, message: "Vui lòng chọn năm kết thúc" }]}>
                                                        <DatePicker picker="year" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Mô tả" name="description">
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} type="primary" htmlType="submit">Thêm</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>
                                </Card>
                            </Col>


                            <Col span={24}>
                                <Card extra={<Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} onClick={showModalCertificate} type="primary">Thêm chứng chỉ</Button>} title="Chứng chỉ">
                                    {/* Hiển thị danh sách chứng chỉ */}
                                    {certificates && certificates.length > 0 ? (
                                        certificates.map((item, index) => (
                                            <Card
                                                key={index}
                                                type="inner"
                                                title={item.certificateName}
                                                style={{ marginBottom: "10px" }}
                                                extra={
                                                    <>
                                                       <EditCertificate item={item} onReload={handleReload}/>
                                                        <Button onClick={() => handleDeleteCertificate(item.id)} type="link" icon={<DeleteOutlined />} style={{ color: "#ff4d4f" }}>Xóa</Button>
                                                    </>
                                                }
                                            >
                                                <p>Tổ chức: {item.organization}</p>
                                                <p>Thời gian: {item.date}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                        <p>Không có chứng chỉ.</p>
                                        <div style={{alignItems:"top"}}><img width={"90px"} src="https://www.topcv.vn/v3/profile/profile-png/profile-certificate.png"/></div>
                                   </div>
                                    )}

                                    <Modal title="Chứng chỉ" footer={null} onCancel={handleCancelCertificate} open={isModalOpenCertificate}>
                                        <Form layout="vertical" onFinish={handleFinishCertificate} form={formCertificate}>
                                            <Row gutter={20}>
                                                <Col span={24}>
                                                    <Form.Item label="Tên chứng chỉ" name="certificateName" rules={[{ required: true, message: "Vui lòng nhập tên chứng chỉ" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Tổ chức" name="organization" rules={[{ required: true, message: "Vui lòng nhập tên tổ chức" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Thời gian" name="date" rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}>
                                                        <DatePicker picker="month" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} type="primary" htmlType="submit">Thêm</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>
                                </Card>
                            </Col>

                            <Col span={24}>
                                <Card extra={<Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} onClick={showModalPrize} type="primary">Thêm giải thưởng</Button>} title="Giải thưởng">
                                    {/* Hiển thị danh sách giải thưởng */}
                                    {prizes && prizes.length > 0 ? (
                                        prizes.map((item, index) => (
                                            <Card
                                                key={index}
                                                type="inner"
                                                title={item.prizeName}
                                                style={{ marginBottom: "10px" }}
                                                extra={
                                                    <>
                                                        <EditPrize item={item} onReload={handleReload}/>
                                                        <Button onClick={() => handleDeletePrize(item.id)} type="link" icon={<DeleteOutlined />} style={{ color: "#ff4d4f" }}>Xóa</Button>
                                                    </>
                                                }
                                            >
                                                <p>Tổ chức: {item.organization}</p>
                                                <p>Thời gian: {item.date}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                        <p>Không có giải thưởng nào.</p>
                                        <div style={{alignItems:"top"}}><img width={"90px"} src="https://www.topcv.vn/v3/profile/profile-png/profile-prize.png"/></div>
                                   </div>
                                    )}

                                    <Modal title="Giải thưởng" footer={null} onCancel={handleCancelPrize} open={isModalOpenPrize}>
                                        <Form layout="vertical" onFinish={handleFinishPrize} form={formPrize}>
                                            <Row gutter={20}>
                                                <Col span={24}>
                                                    <Form.Item label="Tên giải thưởng" name="prizeName" rules={[{ required: true, message: "Vui lòng nhập tên giải thưởng" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Tổ chức" name="organization" rules={[{ required: true, message: "Vui lòng nhập tên tổ chức" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Thời gian" name="date" rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}>
                                                        <DatePicker picker="month" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} type="primary" htmlType="submit">Thêm</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>
                                </Card>
                            </Col>
                            <Col span={24}>
                                <Card extra={<Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} onClick={showModalProject} type="primary">Thêm dự án</Button>} title="Dự án">
                                    {/* Hiển thị danh sách dự án */}
                                    {projects && projects.length > 0 ? (
                                        projects.map((item, index) => (
                                            <Card
                                                key={index}
                                                type="inner"
                                                title={item.projectName}
                                                style={{ marginBottom: "10px" }}
                                                extra={
                                                    <>
                                                        <EditProject item={item} onReload={handleReload}/>
                                                        <Button onClick={() => handleDeleteProject(item.id)} type="link" icon={<DeleteOutlined />} style={{ color: "#ff4d4f" }}>Xóa</Button>
                                                    </>
                                                }
                                            >
                                                <p>Khách hàng: {item.client}</p>
                                                <p>Số thành viên: {item.teamSize}</p>
                                                <p>Vị trí: {item.position}</p>
                                                <p>Nhiệm vụ: {item.responsibility}</p>
                                                <p>Công nghệ sử dụng: {item.technology}</p>
                                                <p>Thời gian: {item.startDate} - {item.endDate}</p>
                                                <p>Mô tả: {item.description}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                        <p>Không có dự án nào.</p>
                                        <div style={{alignItems:"top"}}><img width={"90px"} src="https://www.topcv.vn/v3/profile/profile-png/profile-project.png"/></div>
                                   </div>
                                    )}

                                    <Modal title="Dự án" footer={null} onCancel={handleCancelProject} open={isModalOpenProject}>
                                        <Form layout="vertical" onFinish={handleFinishProject} form={formProject}>
                                            <Row gutter={20}>
                                                <Col span={24}>
                                                    <Form.Item label="Tên dự án" name="projectName" rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Khách hàng" name="client" rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Số thành viên" name="teamSize" rules={[{ required: true, message: "Vui lòng nhập số thành viên" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Vị trí" name="position" rules={[{ required: true, message: "Vui lòng nhập vị trí" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Nhiệm vụ" name="responsibility" rules={[{ required: true, message: "Vui lòng nhập nhiệm vụ" }]}>
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Công nghệ sử dụng" name="technology" rules={[{ required: true, message: "Vui lòng nhập công nghệ sử dụng" }]}>
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Thời gian bắt đầu" name="startDate" rules={[{ required: true, message: "Vui lòng chọn thời gian bắt đầu" }]}>
                                                        <DatePicker picker="month" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Thời gian kết thúc" name="endDate" rules={[{ required: true, message: "Vui lòng chọn thời gian kết thúc" }]}>
                                                        <DatePicker picker="month" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Mô tả" name="description">
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} type="primary" htmlType="submit">Thêm</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>
                                </Card>
                            </Col>


                            <Col span={24}>
                                <Card extra={<Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} onClick={showModalProduct} type="primary">Thêm sản phẩm</Button>} title="Sản phẩm">
                                    {/* Hiển thị danh sách sản phẩm */}
                                    {products && products.length > 0 ? (
                                        products.map((item, index) => (
                                            <Card
                                                key={index}
                                                type="inner"
                                                title={item.productName}
                                                style={{ marginBottom: "10px" }}
                                                extra={
                                                    <>
                                                        <EditProduct item={item} onReload={handleReload}/>
                                                        <Button onClick={() => handleDeleteProduct(item.id)} type="link" icon={<DeleteOutlined />} style={{ color: "#ff4d4f" }}>Xóa</Button>
                                                    </>
                                                }
                                            >
                                                <p>Thể loại: {item.category}</p>
                                                <p>Thời gian hoàn thành: {item.completionDate}</p>
                                                <p>Mô tả: {item.description}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                             <p>Không có sản phẩm nào.</p>
                                             <div style={{alignItems:"top"}}><img width={"90px"} src="https://www.topcv.vn/v3/profile/profile-png/profile-product.png"/></div>
                                        </div>
                                    )}

                                    <Modal title="Sản phẩm" footer={null} onCancel={handleCancelProduct} open={isModalOpenProduct}>
                                        <Form layout="vertical" onFinish={handleFinishProduct} form={formProduct}>
                                            <Row gutter={20}>
                                                <Col span={24}>
                                                    <Form.Item label="Tên sản phẩm" name="productName" rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Thể loại" name="category" rules={[{ required: true, message: "Vui lòng nhập thể loại" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Thời gian hoàn thành" name="completionDate" rules={[{ required: true, message: "Vui lòng chọn thời gian hoàn thành" }]}>
                                                        <DatePicker picker="month" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Mô tả" name="description">
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} type="primary" htmlType="submit">Thêm</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>
                                </Card>
                            </Col>

                            

                            <Col span={24}>
                                <Card extra={<Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }}onClick={showModalActivity} type="primary">Thêm hoạt động</Button>} title="Hoạt động">
                                    {/* Hiển thị danh sách hoạt động */}
                                    {activities && activities.length > 0 ? (
                                        activities.map((item, index) => (
                                            <Card
                                                key={index}
                                                type="inner"
                                                title={item.activityName}
                                                style={{ marginBottom: "10px" }}
                                                extra={
                                                    <>
                                                    <EditActivity item={item} onReload={handleReload}/>
                                                        <Button onClick={() => handleDeleteActivity(item.id)} type="link" icon={<DeleteOutlined />} style={{ color: "#ff4d4f" }}>Xóa</Button>
                                                    </>
                                                }
                                            >
                                                <p>Vị trí tham gia: {item.position}</p>
                                                <p>Thời gian: {item.startDate} - {item.endDate}</p>
                                                <p>Mô tả: {item.description}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <div style={{display:"flex", justifyContent:"space-around"}}>
                                        <p>Không có hoạt động nào.</p>
                                        <div style={{alignItems:"top"}}><img width={"90px"} src="https://www.topcv.vn/v3/profile/profile-png/profile-volunteer.png"/></div>
                                   </div>
                                    )}

                                    <Modal title="Hoạt động" footer={null} onCancel={handleCancelActivity} open={isModalOpenActivity}>
                                        <Form layout="vertical" onFinish={handleFinishActivity} form={formActivity}>
                                            <Row gutter={20}>
                                                <Col span={24}>
                                                    <Form.Item label="Tên hoạt động" name="activityName" rules={[{ required: true, message: "Vui lòng nhập tên hoạt động" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Vị trí tham gia" name="position" rules={[{ required: true, message: "Vui lòng nhập vị trí tham gia" }]}>
                                                        <Input />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Thời gian bắt đầu" name="startDate" rules={[{ required: true, message: "Vui lòng chọn thời gian bắt đầu" }]}>
                                                        <DatePicker picker="month" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={12}>
                                                    <Form.Item label="Thời gian kết thúc" name="endDate" rules={[{ required: true, message: "Vui lòng chọn thời gian kết thúc" }]}>
                                                        <DatePicker picker="month" style={{ width: "100%" }} />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item label="Mô tả" name="description">
                                                        <TextArea />
                                                    </Form.Item>
                                                </Col>
                                                <Col span={24}>
                                                    <Form.Item>
                                                        <Button style={{ backgroundColor: 'green', borderColor: 'green', color:"white" }} type="primary" htmlType="submit">Thêm</Button>
                                                    </Form.Item>
                                                </Col>
                                            </Row>
                                        </Form>
                                    </Modal>
                                </Card>
                            </Col>
                        </Row>





                    </Spin>

                )}
            </div>




        </>
    )
}
export default InforUser