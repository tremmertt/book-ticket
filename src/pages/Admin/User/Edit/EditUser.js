import React, { useState, useEffect, memo } from "react";
import { Form, Input, Radio, Select, Button } from "antd";

import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Divider } from "antd";
import { GROUPID } from "../../../../util/settings/config";
import {
  getInfoUserByUsernameAction,
  updateUserAction,
} from "../../../../redux/actions/ManageUserAction";
const { Option } = Select;

const EditUser = memo((props) => {
  const [componentSize, setComponentSize] = useState("default");
  const dispatch = useDispatch();
  const { infoUserByUsername } = useSelector(
    (state) => state.ManageUserReducer
  );

  console.log("props", props);

  useEffect(() => {
    let username = props.match.params.taiKhoan;
    dispatch(getInfoUserByUsernameAction(username));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      userName: infoUserByUsername.taiKhoan,
      fullName: infoUserByUsername.hoTen,
      email: infoUserByUsername.email,
      phoneNumber: infoUserByUsername.soDT,
      password: infoUserByUsername.matKhau,
      codeTypeUser: infoUserByUsername.maLoaiNguoiDung,
    },
    onSubmit: (values) => {
      values.maNhom = GROUPID;

      dispatch(updateUserAction(values));
    },
  });

  const handleChangeTypeUser = async (values) => {
    formik.setFieldValue("codeTypeUser", values);
  };

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
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
            <Divider orientation="left">Update Information</Divider>
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
            <Form.Item label="Username">
              <Input
                name="userName"
                value={formik.values.userName}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Password">
              <Input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Full Name">
              <Input
                name="fullName"
                value={formik.values.fullName}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Telephone">
              <Input
                name="phoneNumber"
                value={formik.values.phoneNumber}
                onChange={formik.handleChange}
              />
            </Form.Item>
            <Form.Item label="Email" onChange={formik.handleChange}>
              <Input name="email" value={formik.values.email} />
            </Form.Item>
            <Form.Item label="Type User" onChange={formik.handleChange}>
              <Select
                onChange={handleChangeTypeUser}
                defaultValue={formik.values.codeTypeUser}
                value={formik.values.codeTypeUser}
              >
                <Option value="KhachHang">Customer</Option>
                <Option value="QuanTri">Admin</Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <button
                type="submit"
                className="bg-blue-400 text-white p-5 mx-36 rounded-lg h-2/5 w-2/5 text-xl"
              >
                {" "}
                Update{" "}
              </button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
});

export default EditUser;
