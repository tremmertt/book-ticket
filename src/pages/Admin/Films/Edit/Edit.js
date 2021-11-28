import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
} from "antd";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import {
  addFilmUploadImgAction,
  getInfoFilmAction,
  updateFilmUploadAction,
} from "../../../../redux/actions/ManageFilmAction";
import { GROUPID } from "../../../../util/settings/config";

const Edit = (props) => {
  const [componentSize, setComponentSize] = useState("default");
  const [imgSrc, setImgSrc] = useState("");
  const { infoFilm } = useSelector((state) => state.ManageFilmReducer);
  console.log("info", infoFilm);
  const dispatch = useDispatch();

  useEffect(() => {
    let { id } = props.match.params;

    dispatch(getInfoFilmAction(id));
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: infoFilm.maPhim,
      tenPhim: infoFilm?.tenPhim,
      trailer: infoFilm?.trailer,
      moTa: infoFilm?.moTa,
      ngayKhoiChieu: infoFilm?.ngayKhoiChieu,
      dangChieu: infoFilm?.dangChieu,
      sapChieu: infoFilm?.sapChieu,
      hot: infoFilm?.hot,
      danhGia: infoFilm?.danhGia,
      hinhAnh: null,
      maNhom: GROUPID,
    },
    onSubmit: (values) => {
      console.log("values", values);
      values.maNhom = GROUPID;

      //New obj formData
      let formData = new FormData();
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            console.log("formik ", values.hinhAnh);
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }
      //Call api from values formData to backend
      dispatch(updateFilmUploadAction(formData));
    },
  });

  const handleChangeSwitch = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const { handleChangDatePicker } = (value) => {
    //console.log('datepickerchange')

    let dayStart = moment(value).format("DD-MM-YYYY");
    formik.setFieldValue("dayStart", dayStart);
  };

  const handleChangeInputNumber = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = async (e) => {
    let file = e.target.files[0];
    if (
      file.type === " image/png" ||
      file.type === "image/jpg" ||
      file.type === "image/jpeg"
    ) {
      await formik.setFieldValue("hinhAnh", file);

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        setImgSrc(e.target.result); //picture base 64
      };

      //formik.setErrors()
    }

    //console.log('file', file)
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
        <h3 className="text-2xl mb-5 ml-10"> Update Film </h3>
        <Form.Item label="Form Size" name="size">
          <Radio.Group>
            <Radio.Button value="small">Small</Radio.Button>
            <Radio.Button value="default">Default</Radio.Button>
            <Radio.Button value="large">Large</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="Movie Name">
          <Input
            name="tenPhim"
            onChange={formik.handleChange}
            value={formik.values.tenPhim}
          />
        </Form.Item>
        <Form.Item label="Trailer">
          <Input
            name="trailer"
            onChange={formik.handleChange}
            value={formik.values.trailer}
          />
        </Form.Item>
        <Form.Item label="Description">
          <Input
            name="moTa"
            onChange={formik.handleChange}
            value={formik.values.moTa}
          />
        </Form.Item>
        <Form.Item label="Day Start">
          <DatePicker
            format={"DD-MM-YYYY"}
            onChange={handleChangDatePicker}
            value={moment(formik.values.ngayKhoiChieu, "DD-MM-YYYY")}
          />
        </Form.Item>
        <Form.Item label="Now Playing">
          <Switch
            onChange={handleChangeSwitch("dangChieu")}
            checked={formik.values.dangChieu}
          />
        </Form.Item>
        <Form.Item label="Comming Soon">
          <Switch
            onChange={handleChangeSwitch("sapChieu")}
            checked={formik.values.sapChieu}
          />
        </Form.Item>
        <Form.Item label="Hot">
          <Switch
            onChange={handleChangeSwitch("hot")}
            checked={formik.values.hot}
          />
        </Form.Item>

        <Form.Item label="Rating">
          <InputNumber
            onChange={handleChangeInputNumber("danhGia")}
            value={formik.values.danhGia}
            min={1}
            max={10}
          />
        </Form.Item>
        <Form.Item label="Image">
          <input
            type="file"
            onChange={handleChangeFile}
            accept="image/png,image/jpeg,image/jpg"
          />
          <br />
          <img
            width={100}
            height={100}
            src={imgSrc === "" ? infoFilm.hinhAnh : imgSrc}
            alt="..."
          />
        </Form.Item>
        <Form.Item>
          <button
            type="submit"
            className="bg-blue-400 text-white p-5 mx-64 rounded-lg h-1/5 w-1/5 text-xl"
          >
            {" "}
            Update{" "}
          </button>
        </Form.Item>
      </Form>
    </>
  );
};
export default Edit;
