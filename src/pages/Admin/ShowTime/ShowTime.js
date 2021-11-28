/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Form, InputNumber, Select, DatePicker } from "antd";
import { manageCineService } from "../../../service/ManageCineService";
import { useFormik } from "formik";
import moment from "moment";
import { manageBookTicketService } from "../../../service/ManageBookTicketService";

export default function ShowTime(props) {
  const formik = useFormik({
    initialValues: {
      maPhim: props.match.params.id,
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: "",
    },
    onSubmit: async (values) => {
      console.log("values", values);
      try {
        const result = await manageBookTicketService.createShowTime(values);
        alert(result.data.content);
      } catch (error) {
        console.log("error", error.respone.data);
      }
    },
  });

  const [state, setState] = useState({
    cineSystem: [],
    cinema: [],
  });
  console.log(state.cineSystem);

  useEffect(async () => {
    try {
      let result = await manageCineService.getListCinema();
      setState({
        ...state,
        cineSystem: result.data.content,
      });
    } catch (errors) {}
  }, []);

  const handleChangeTheaterSystem = async (values) => {
    try {
      let result = await manageCineService.getListTheaterCluster(values);
      setState({
        ...state,
        cinema: result.data.content,
      });
    } catch (error) {
      console.log("error", error.response.data);
    }
  };

  const handleChangeCinema = (values) => {
    formik.setFieldValue("maRap", values);
  };

  const onOk = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD-MM-YYYY hh:mm:ss")
    );
    console.log("values", values);
  };

  const onChangeDate = (values) => {
    formik.setFieldValue(
      "ngayChieuGioChieu",
      moment(values).format("DD-MM-YYYY hh:mm:ss")
    );
    console.log("values", values);
  };

  const onChangeInputNumber = (values) => {
    formik.setFieldValue("giaVe", values);
  };

  const convertSelectCineSystem = () => {
    // state.cineSystem?.map((cn,index) => ({label: cn.tenHeThongRap, value:  cn.tenHeThongRap}))
    return state.cineSystem?.map((cn, index) => {
      return { label: cn.tenHeThongRap, value: cn.maHeThongRap };
    });
  };

  // console.log(props.match.params);
  let film = {};
  if (localStorage.getItem("filmParams")) {
    film = JSON.parse(localStorage.getItem("filmParams"));
  }

  return (
    <Form
      name="basic"
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      // onFinish={onFinish}
      // onFinishFailed={onFinishFailed}
      onSubmitCapture={formik.handleSubmit}
    >
      <h3 className="text-2xl">
        {" "}
        Create Showtime - {props.match.params.tenPhim}{" "}
      </h3>
      <img src={film.hinhAnh} alt="..." width={200} height={100} />
      <Form.Item label="Theater System">
        <Select
          options={convertSelectCineSystem()}
          onChange={handleChangeTheaterSystem}
          placeholder="Choose Theater"
        />
      </Form.Item>

      <Form.Item label="Cinema">
        <Select
          options={state.cinema?.map((cine, index) => ({
            label: cine.tenCumRap,
            value: cine.maCumRap,
          }))}
          onChange={handleChangeCinema}
          placeholder="Choose Cinema"
        />
      </Form.Item>

      <Form.Item label="Show date - Show time">
        <DatePicker
          format="DD-MM-YYYY hh:mm:ss"
          showTime
          onChange={onChangeDate}
          onOk={onOk}
        />
      </Form.Item>

      <Form.Item label="Price">
        <InputNumber min={75000} max={150000} onChange={onChangeInputNumber} />
      </Form.Item>

      <Form.Item>
        <button
          type="submit"
          className="bg-blue-400 text-white p-4 ml-72 rounded-lg h-1/5 w-1/5 text-xl"
        >
          {" "}
          Create{" "}
        </button>
      </Form.Item>
    </Form>
  );
}
