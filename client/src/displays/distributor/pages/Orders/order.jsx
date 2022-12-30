import React from "react";
import { useForm } from "react-hook-form";

import Sidebar from "../Sidebar/sidebar";
import NavBar from "../../../../components/navbar/navbar";
import Table from "../../../../components/table/table";
import { useState, useEffect } from "react";
import axios from "axios";

import "./order.css";

const Order = () => {
  const height = 600;
  const [showCreate, setShowCreate] = useState(false);
  const [rows, setRows] = useState([]);
  const { register, handleSubmit } = useForm();

  const toggleShowCreate = () => {
    setShowCreate(!showCreate);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    const getAllProductLine = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/toyProductLine/getAll"
        );
        setRows(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getAllProductLine();
  }, []);

  const columns = [
    { headerName: "Id", field: "_id", width: 250, editable: true },
    { headerName: "Name", field: "name", width: 120, editable: true },
    { headerName: "Size", field: "size", width: 200, editable: true },
    { headerName: "Price", field: "price", width: 120, editable: true },
    { headerName: "Seats", field: "seats", width: 120, editable: true },
    { headerName: "Engine", field: "engine", width: 120, editable: true },
    { headerName: "Xylanh", field: "xylanh", width: 120, editable: true },
    { headerName: "Hp", field: "hp", width: 120, editable: true },
  ];

  const [finalClickInfo, setFinalClickInfo] = useState(null);

  const handleOnCellClick = (params) => {
    setFinalClickInfo(params);
  };
  console.log(finalClickInfo);

  return (
    <div className="order">
      <Sidebar />
      <div className="wrapper">
        <NavBar />
        <div className="orderWrapper">
          <div className="listOrder">
            <h4>Danh sánh đơn đặt hàng</h4>
            <Table {...{ columns, rows, setRows, height, handleOnCellClick }} />
          </div>

          <div className="mainOrder">
            <h4>Chi tiết đơn hàng</h4>
            <div className="orderDetail">
              {!finalClickInfo && (
                <>
                  <div className="oderContent">Chọn đơn hàng muốn xem</div>
                </>
              )}
              {finalClickInfo && (
                <>
                  <div className="rowOrder firstRow">
                    <p className="fieldOrder">id : {finalClickInfo.id}</p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      name : {finalClickInfo.row.name}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      email : {finalClickInfo.row.email}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">
                      phone : {finalClickInfo.row.phone}
                    </p>
                  </div>
                  <div className="rowOrder">
                    <p className="fieldOrder">age : {finalClickInfo.row.age}</p>
                  </div>
                </>
              )}
            </div>
            {/* <button className="createOrder" onClick={toggleShowCreate}>
              Create order
            </button>
            {showCreate && (
              <div className="model">
                <div onClick={toggleShowCreate} className="overlay"></div>
                <form className="content" onSubmit={handleSubmit(onSubmit)}>
                  <label className="row">
                    Name
                    <input {...register("name")} placeholder="enter name" />
                  </label>
                  <label className="row">
                    Username
                    <input
                      {...register("username")}
                      placeholder="enter username"
                    />
                  </label>
                  <label className="row">
                    Email
                    <input {...register("email")} placeholder="enter email" />
                  </label>
                  <label className="row">
                    Type Account
                    <select {...register("gender")}>
                      <option value="female">female</option>
                      <option value="male">male</option>
                      <option value="other">other</option>
                    </select>
                  </label>
                  <input type="submit" />
                </form>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
