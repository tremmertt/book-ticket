import React, { useEffect, memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { Table, Row, Col, Tag, Divider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { getInfoUserByUsernameAction } from "../../../../redux/actions/ManageUserAction";
import {
  displayLoadingAction,
  hideLoadingAction,
} from "../../../../redux/actions/LoadingAction";

export default function UserBooked(props) {
  // const { thongTinNguoiDungTheoTaiKhoan, isLoading } = useSelector(state => state.UserReducer);
  const { infoUserByUsername } = useSelector(
    (state) => state.ManageUserReducer
  );

  console.log("infoUserByUsername", infoUserByUsername);

  const { isLoading } = useSelector((state) => state.LoadingReducer);

  const taiKhoan = props.match.params.taiKhoan;

  const dispatch = useDispatch();
  useEffect(() => {
    // dispatch({ type: 'RESET_LOADING_USER' });
    dispatch(displayLoadingAction);
    dispatch(getInfoUserByUsernameAction(taiKhoan));
    dispatch(hideLoadingAction);
  }, []);

  // const numberWithCommas = (x) => {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  const listChar = [
    { number: 16, char: "A" },
    { number: 32, char: "B" },
    { number: 48, char: "C" },
    { number: 64, char: "D" },
    { number: 80, char: "E" },
    { number: 96, char: "F" },
    { number: 112, char: "G" },
    { number: 128, char: "H" },
    { number: 144, char: "I" },
    { number: 160, char: "J" },
  ];
  const setNameSeat = (index) => {
    let result;
    for (let i = 0; i < listChar.length; i++) {
      if (index <= listChar[i].number && index >= listChar[i].number - 15) {
        let h = 0;
        let indexSeat;
        for (let j = listChar[i].number - 16; j <= listChar[i].number; j++) {
          if (index === j) {
            indexSeat = h;
            break;
          }
          h++;
        }
        if (indexSeat < 10) {
          result = ` ${listChar[i].char}0${index}`;
        } else {
          result = ` ${listChar[i].char}${index}`;
        }
      }
    }
    return result;
  };
  const NestedTable = memo(() => {
    const expandedRowRender = (row) => {
      const columns = [
        {
          title: "SEAT",
          dataIndex: "tenGhe",
          key: "tenGhe",
          render: (text, index) => (
            <Tag color="blue" key={index}>
              {setNameSeat(text)}
            </Tag>
          ),
        },
        {
          title: "THEATER SYSTEM CODE",
          dataIndex: "maHeThongRap",
          key: "maHeThongRap",
        },
        {
          title: "THEATER SYSTEM NAME",
          dataIndex: "tenHeThongRap",
          key: "tenHeThongRap",
        },
        { title: "CINEMA", dataIndex: "tenCumRap", key: "tenCumRap" },
      ];

      const data = [];
      for (let i = 0; i < 3; ++i) {
        data.push({
          key: i,
          date: "2014-12-24 23:12:00",
          name: "This is production name",
          upgradeNum: "Upgraded: 56",
        });
      }
      const datas = [];
      for (let i = 0; i < infoUserByUsername.thongTinDatVe.length; i++) {
        let dataA = [];
        for (
          let j = 0;
          j < infoUserByUsername.thongTinDatVe[i].danhSachGhe.length;
          j++
        ) {
          dataA.push(infoUserByUsername.thongTinDatVe[i].danhSachGhe[j]);
        }
        datas[i] = dataA;
      }
      let dataEx;
      for (let i = 0; i < infoUserByUsername.thongTinDatVe.length; i++) {
        if (i == row.key) {
          dataEx = datas[i];
        }
      }
      console.log("datas", datas);

      return <Table columns={columns} dataSource={dataEx} pagination={false} />;
    };

    const columns = [
      {
        title: "MOVIE NAME",
        dataIndex: "movieName",
        key: "movieName",
        with: "350",
      },
      {
        title: "BOOKING DAY",
        dataIndex: "bookingDay",
        key: "bookingDay",
        with: "200",
      },
      {
        title: "PRICE",
        dataIndex: "price",
        key: "price",
        render: (text) => <span> {text?.toLocaleString()} Đ</span>,
        with: "150",
      },
      {
        title: "MOVIE DURATION",
        dataIndex: "movieDuration",
        key: "movieDuration",
        render: (text) => <span>{text} MINUTES</span>,
        with: "100",
      },
    ];

    const data = [];
    console.log("infoUserByUsername", infoUserByUsername);
    for (let i = 0; i < infoUserByUsername?.thongTinDatVe?.length; i++) {
      data.push({
        key: i,
        movieName: infoUserByUsername.thongTinDatVe[i].tenPhim,
        bookingDay: moment(infoUserByUsername.thongTinDatVe[i].ngayDat).format(
          "DD-MM-YYYY hh:mm:ss"
        ),
        price: infoUserByUsername.thongTinDatVe[i].giaVe,
        movieDuration: infoUserByUsername.thongTinDatVe[i].thoiLuongPhim,
      });
    }
    return (
      <Table
        loading={isLoading}
        bordered
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
        scroll={{ x: 400 }}
      />
    );
  });
  return (
    <>
      <Row>
        <Col span={24}>
          <Divider orientation="left">
            BOOKING INFORMATION OF {taiKhoan}
          </Divider>
        </Col>
        <Col span={24} style={{ marginRight: 10 }}>
          <NestedTable />
        </Col>
      </Row>
    </>
  );
}
