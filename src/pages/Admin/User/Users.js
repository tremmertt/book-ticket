import React, { Fragment, useEffect, useState } from "react";

import { Button, Table, Popover, Input } from "antd";

import {
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";
import Swal from "sweetalert2";
import { Row, Col, Divider } from "antd";
import {
  deleteUserAction,
  getUserListAction,
  getUserListPaginationAction,
} from "../../../redux/actions/ManageUserAction";
const { Search } = Input;

export default function Users() {
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize, setPageSize] = useState(200);
  const { userList } = useSelector((state) => state.ManageUserReducer);

  console.log("userList", userList);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUserListPaginationAction("", false, pageNumber, pageSize));
  }, [pageNumber]);

  const columns = [
    {
      title: "USERNAME",
      dataIndex: "taiKhoan",
      width: "10%",
      sorter: (a, b) => {
        let usernameA = a.taiKhoan.toLowerCase().trim();
        let usernameB = b.taiKhoan.toLowerCase().trim();

        if (usernameA > usernameB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      // sortOrder: ['descend']
    },
    {
      title: "Full Name",
      dataIndex: "hoTen",
      sorter: (a, b) => {
        let fullNameA = a.hoTen.toLowerCase().trim();
        let fullNameB = b.hoTen.toLowerCase().trim();

        if (fullNameA > fullNameB) {
          return 1;
        }
        return -1;
      },
      width: "10%",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
      width: "10%",
      sorter: (a, b) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();

        if (emailA > emailB) {
          return 1;
        }
        return -1;
      },

      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Phone Number",
      dataIndex: "soDt",
      sorter: (a, b) => a.soDt - b.soDt,
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Password",
      dataIndex: "matKhau",
    },
    {
      title: "Type User",
      dataIndex: "maLoaiNguoiDung",
      responsive: ["sm"],
    },
    {
      title: "Action",
      dataIndex: "hanhDong",
      responsive: ["sm"],
      render: (text, NguoiDung) => (
        <Fragment>
          <NavLink
            key={1}
            className="hover:text-gray-400 text-xl text-blue-400"
            to={`/admin/users/edit/${NguoiDung.taiKhoan}`}
          >
            <Popover content="Update">
              <EditOutlined />{" "}
            </Popover>
          </NavLink>
          <NavLink
            key={2}
            className="hover:text-gray-400 text-xl text-red-800"
            to={`/admin/users`}
            onClick={() => {
              // if(window.confirm('Are you sure'+ NguoiDung.hoTen)){
              //     dispatch(xoaNguoiDungAction(NguoiDung.taiKhoan))
              // }
              Swal.fire({
                title: `Are you sure you want to delete the user?`,
                text: NguoiDung.hoTen,
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#fb4226",
                cancelButtonColor: "rgb(167 167 167)",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  dispatch(deleteUserAction(NguoiDung.taiKhoan));
                }
              });
            }}
          >
            <Popover content="Delete">
              <DeleteOutlined />{" "}
            </Popover>
          </NavLink>
          <NavLink
            className="hover:text-gray-400 text-xl text-green-400"
            to={`/admin/users/booked/${NguoiDung.taiKhoan}`}
          >
            <Popover content="Movie list booked!!">
              <CalendarOutlined />{" "}
            </Popover>
          </NavLink>
          {/* <NavLink key={3} className="hover:text-green-400 text-xl text-black" to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`} onClick={()=>{
                    localStorage.setItem('filmParams', JSON.stringify(film))
                }}><CalendarOutlined /> </NavLink> */}
        </Fragment>
      ),

      sortDirections: ["descend", "ascend"],
    },
  ];

  const data = userList;

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  function search(value = "") {
    if (value !== "") {
      dispatch(getUserListPaginationAction(value, true, pageNumber, pageSize));
    } else {
      dispatch(getUserListPaginationAction("", false, pageNumber, pageSize));
    }
  }

  const onSearch = (value) => {
    search(value);
  };

  const onKeyUpSearch = (event) => {
    const value = event.target.value;
    search(value);
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Divider orientation="left">Manage Account </Divider>
        </Col>
        <Col span={24}>
          <Button
            className="mt-5 mb-5"
            onClick={() => {
              history.push("/admin/users/addnew");
            }}
          >
            Add Account
          </Button>
        </Col>
        <Col span={24}>
          <Search
            className="mb-5"
            placeholder="Search..."
            allowClear
            size="large"
            enterButton={<SearchOutlined className="mb-3" />}
            onSearch={onSearch}
            onKeyUp={onKeyUpSearch}
          />
        </Col>
        <Col span={24} style={{ marginRight: 10 }}>
          <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            rowKey={"taiKhoan"}
            scroll={{ x: 400 }}
          />
        </Col>
      </Row>
    </>
  );
}
