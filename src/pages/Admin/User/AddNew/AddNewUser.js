import React, { useState } from "react";
import { Form, Input, Radio, Button, Select } from "antd";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Row, Col, Divider } from "antd";
import noImage from "../../../../assets/noImg.jpg";
import { addUserAction } from "../../../../redux/actions/ManageUserAction";
import { GROUPID } from "../../../../util/settings/config";

const AddNewUser = () => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      maNhom: GROUPID,
      maLoaiNguoiDung: "KhachHang",
      hoTen: "",
    },
    onSubmit: async (values, { resetForm }) => {
      console.log("values", values);
      values.maNhom = GROUPID;
      try {
        await dispatch(addUserAction(values));
        resetForm();
      } catch (err) {}
    },
  });

  const handleChangeTypeUser = async (values) => {
    console.log("handleChangeTypeUser", values);
    formik.setFieldValue("maLoaiNguoiDung", values);
  };
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const convertSelectUser = () => {
    return [
      { label: "Customer", value: "KhachHang" },
      { label: "Admin", value: "QuanTri" },
    ];
  };
  return (
    <>
      <Form
        onSubmitCapture={formik.handleSubmit}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
      >
        <Row>
          <Col xs={{ span: 24 }} xl={{ span: 24 }}>
            <Divider orientation="left">Add new user</Divider>
          </Col>
        </Row>
        <Row>
          <Col xs={{ span: 24 }} xl={{ span: 12 }}>
            <Form.Item label="Form Size" name="size">
              <Radio.Group>
                <Radio.Button value="small">Small</Radio.Button>
                <Radio.Button value="default">Default</Radio.Button>
                <Radio.Button value="large">Large</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label="Username"
              onChange={formik.handleChange}
              rules={[{ required: true, message: "Please enter account!" }]}
            >
              <Input name="taiKhoan" value={formik.values.taiKhoan} />
            </Form.Item>
            <Form.Item label="Password" onChange={formik.handleChange}>
              <Input.Password name="matKhau" value={formik.values.matKhau} />
            </Form.Item>
            <Form.Item label="Full Name" onChange={formik.handleChange}>
              <Input name="hoTen" value={formik.values.hoTen} />
            </Form.Item>
            <Form.Item label="Phone Number" onChange={formik.handleChange}>
              <Input name="soDt" value={formik.values.soDt} />
            </Form.Item>
            <Form.Item label="Email" onChange={formik.handleChange}>
              <Input name="email" value={formik.values.email} />
            </Form.Item>
            <Form.Item label="Type User" onChange={formik.handleChange}>
              <Select
                options={convertSelectUser()}
                onChange={handleChangeTypeUser}
                placeholder="Please choose type user"
              />
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="bg-blue-400 text-white p-4 mx-36 rounded-lg h-2/5 w-2/5 text-lg"
              >
                {" "}
                Add User{" "}
              </button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default AddNewUser;
