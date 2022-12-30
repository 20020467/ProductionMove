import React from "react";
import "./statistical.css";
import Sidebar from "../Sidebar/sidebar";
import NavBar from "../../../../components/navbar/navbar";
import BarChart from "../../../../components/charts/barChart/barChart";

import { useEffect, useState } from "react";

const Statistical = () => {
  return (
    <div className="statistical">
      <Sidebar />
      <div className="wrapper">
        <NavBar />
        <div className="mainStatistical">statistical</div>
      </div>
    </div>
  );
};

export default Statistical;
