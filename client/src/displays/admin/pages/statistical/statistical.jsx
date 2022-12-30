import "./statistical.css";
import Sidebar from "../sidebar/sidebar";
import Navbar from "../../../../components/navbar/navbar";
import BarChart from "../../../../components/charts/barChart/barChart";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Statistical() {
  const ManufactureFactory = "Cơ sở sản xuất";
  const ServiceCenter = "Trung tâm bảo hành";
  const Distributor = "Đại lý";
  const productStatis = "Thống kê theo trạng thái của tất cả sản phẩm";

  const dataKeyProduct = "grossProduct";
  const dataKeyProductLine = "grossProductLine";

  const [dataProduct, setDataProduct] = useState([]);
  const [dataManufacture, setDataManufacture] = useState([]);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/toyProduct/getStatus"
        );
        setDataProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatus();
  }, []);

  useEffect(() => {
    const getStatus = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/toyProduct/countQuantification/",
          { _id: "63ac4caf27620028d068306b" }
        );
        setDataManufacture(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getStatus();
  }, []);
  //63ac4caf27620028d068306b
  console.log(dataManufacture);

  const dataStatisManufacture = [
    { name: "Vios", grossProductLine: 50 },
    { name: "Fortuner", grossProductLine: 20 },
    { name: "Raize", grossProductLine: 5 },
    { name: "Altis", grossProductLine: 10 },
    { name: "Camry", grossProductLine: 10 },
    { name: "Yaris", grossProductLine: 10 },
  ];
  const dataDistributor = [];
  const dataServiceCenter = [];

  const data = [
    {
      name: "Page A",
      uv: 4000,
      grossProduct: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 7400,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="statistical">
      <Sidebar />
      <div className="wrapper">
        <Navbar />
        <div className="mainStatistical">
          <BarChart
            {...{
              title: productStatis,
              data: dataProduct,
              dataKey: dataKeyProduct,
            }}
          />
          <BarChart
            {...{
              title: Distributor,
              data: dataStatisManufacture,
              dataKey: dataKeyProductLine,
            }}
          />
          <BarChart
            {...{
              title: ManufactureFactory,
              data: dataStatisManufacture,
              dataKey: dataKeyProductLine,
            }}
          />
          <BarChart
            {...{
              title: ServiceCenter,
              data: dataStatisManufacture,
              dataKey: dataKeyProductLine,
            }}
          />
        </div>
      </div>
    </div>
  );
}
