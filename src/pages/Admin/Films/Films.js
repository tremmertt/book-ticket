import React, { Fragment, useEffect, useState } from "react";
import { Button, Table } from "antd";

import { Input, Space } from "antd";
import {
  SearchOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFilmAction,
  getListFilmAction,
} from "../../../redux/actions/ManageFilmAction";
import { NavLink } from "react-router-dom";
import { history } from "../../../App";

const { Search } = Input;

export default function Films() {
  const { arrFilmDefault } = useSelector((state) => state.ManageFilmReducer);
  const dispatch = useDispatch();
  const [data, setData] = useState([
    ...arrFilmDefault.map((i, index) => {
      return {
        ...i,
        key: index + "-films",
        moTa: i.moTa.length > 100 ? i.moTa.slice(0, 100) + "..." : i.moTa,
      };
    }),
  ]);

  useEffect(() => {
    if (arrFilmDefault && arrFilmDefault.length == 0) {
      dispatch(getListFilmAction());
    }
    setData([
      ...arrFilmDefault.map((i, index) => {
        return {
          ...i,
          key: index + "-films",
          moTa: i.moTa.length > 100 ? i.moTa.slice(0, 100) + "..." : i.moTa,
        };
      }),
    ]);
  }, [arrFilmDefault]);

  const columns = [
    {
      title: "Movie Code",
      dataIndex: "maPhim",
      value: (text, object) => {
        return <span> {text} </span>;
      },
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ["descend", "ascend"],
      width: "15%",
    },
    {
      title: "Image",
      dataIndex: "hinhAnh",
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.hinhAnh}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: "15%",
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Movie Name",
      dataIndex: "tenPhim",
      sorter: (a, b) => {
        let nameFilmA = a.tenPhim.toLowerCase().trim();
        let nameFilmB = b.tenPhim.toLowerCase().trim();
        if (nameFilmA > nameFilmB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Description",
      dataIndex: "moTa",
      render: (text, film) => {
        return (
          <Fragment>
            {film.moTa.length > 50
              ? film.moTa.substr(0, 50) + "..."
              : film.moTa}
            {film.moTa?.replace("<p>", "").replace("</p>", "")}
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
    {
      title: "Action",
      dataIndex: "maPhim",
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink
              key={1}
              to={`/admin/films/edit/${film.maPhim}`}
              className=" mr-2 text-2xl"
            >
              <EditOutlined style={{ color: "blue" }} />
            </NavLink>
            <span
              style={{ cursor: "pointer" }}
              key={2}
              className="text-2xl mr-2 "
              onClick={() => {
                if (
                  window.confirm("Do you really want to delete " + film.tenPhim)
                ) {
                  dispatch(deleteFilmAction(film.maPhim));
                }
              }}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
            <NavLink
              key={3}
              to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                localStorage.setItem("filmParams", JSON.stringify(film));
              }}
              className=" mr-2 text-2xl"
            >
              <CalendarOutlined style={{ color: "green" }} />
            </NavLink>
          </Fragment>
        );
      },
      sortDirections: ["descend", "ascend"],
      width: "25%",
    },
  ];

  const onSearch = (value) => {
    //Call api
    if (value && value.trim()) {
      setData(
        arrFilmDefault
          .filter((i) =>
            i.tenPhim.toLowerCase().includes(value.trim().toLowerCase())
          )
          .map((i, index) => {
            return { ...i, key: index + "-films" };
          })
      );
    } else {
      setData(
        arrFilmDefault.map((i, index) => {
          return { ...i, key: index + "-films" };
        })
      );
    }
  };

  const onKeyUpSearch = (event) => {
    const value = event.target.value;
    //Call api
    if (value && value.trim()) {
      setData(
        arrFilmDefault
          .filter((i) =>
            i.tenPhim.toLowerCase().includes(value.trim().toLowerCase())
          )
          .map((i, index) => {
            return {
              ...i,
              key: index + "-films",
              moTa: i.moTa.length > 100 ? i.moTa.slice(0, 100) + "..." : i.moTa,
            };
          })
      );
    } else {
      setData(
        arrFilmDefault.map((i, index) => {
          return {
            ...i,
            key: index + "-films",
            moTa: i.moTa.length > 100 ? i.moTa.slice(0, 100) + "..." : i.moTa,
          };
        })
      );
    }
  };

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h3 className="text-4xl"> Manage User </h3>
      <Button
        className="mb-5"
        onClick={() => {
          history.push("/admin/films/addnew");
        }}
      >
        {" "}
        Add Film{" "}
      </Button>
      <Search
        className="mb-5"
        placeholder="Search..."
        allowClear
        size="large"
        enterButton={<SearchOutlined className="mb-3" />}
        onSearch={onSearch}
        onKeyUp={onKeyUpSearch}
      />
      <Table columns={columns} dataSource={data} onChange={onChange} />
    </div>
  );
}
