/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable react-hooks/exhaustive-deps */
import moment from "moment";
import _ from "lodash";

import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getInfoUserAction } from "../../redux/actions/ManageUserAction";

export default function CheckoutFinish(props) {
  const dispatch = useDispatch();

  const { infoUser } = useSelector((state) => state.ManageUserReducer);

  const [qrCode, setQrCode] = useState("");

  useEffect(() => {
    dispatch(getInfoUserAction());
  }, []);

  const renderTicketItem = function () {
    console.log("infoUser.infoBkooTicket", infoUser);
    const contentLink = parseInt(props.match.params.id.replace("!", ""));
    if (Object.keys(infoUser).length == 0) return <div>No information</div>;

    const ticket = infoUser.thongTinDatVe[contentLink];

    if (!ticket) return <div>No information</div>;
    const danhSachGhe = _.first(ticket.danhSachGhe);
    return (
      <div className="p-2 lg:w-1/3 md:w-1/2 w-full">
        <div className="h-full flex items-center border-gray-200 border p-4 rounded-lg">
          <img
            alt="team"
            className="w-16 h-16 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
            src="https://picsum.photos/200/200"
          />
          <div className="flex-grow">
            <h2 className="text-gray-900 title-font font-medium">
              {ticket.tenPhim}
            </h2>
            <p className="text-gray-500">
              {" "}
              Time Start: {moment(ticket.ngayDat).format("hh:mm")} - Day Start:{" "}
              {moment(ticket.ngayDat).format("DD-MM-YYYY")}
            </p>
            <p> Address: {danhSachGhe.tenHeThongRap} </p>
            <p>
              {" "}
              Cinema: {danhSachGhe.tenCumRap} - Seat:{" "}
              {ticket.danhSachGhe.map((seat, index) => {
                return <span key={index}>{seat.tenGhe}-</span>;
              })}{" "}
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-5">
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-pink-600">
              Confirm ticket
            </h1>

            <div className="flex justify-center"> {renderTicketItem()}</div>
            <hr className="mt-36" />
            <p className="font-extralight text-italic text-xs ">
              Please show this QR code to the ticket counter to receive your
              ticket.
            </p>
            <p className="font-extralight text-italic text-xs">
              <span className="font-semibold">Note:</span> The theater does not
              accept refunds or exchanges of tickets that have been successfully
              paid on the website.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
