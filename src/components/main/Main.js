import "./Main.css";
import React, { useEffect, useState } from "react";
import { CChart } from '@coreui/react-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import axios from "axios";
import Select from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import backebdEndpoint from "../../endpoint";
ChartJS.register(ArcElement, Tooltip, Legend);

const Main = () => {
  const [data, setData] = useState([])
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const getTableData = async () => {
    setLoading(true)
    await axios.get(`${backebdEndpoint}/inventory/getAll`).then(res => {
      let op = []
      if (res?.data?.status === "pass") {
        let rawData = []
        res?.data?.data?.forEach((element, idx) => {
          op.push({ value: element?.name, label: element?.name })
          rawData.push({
            key: idx + 1,
            name: element?.name,
            brand: element?.brand,
            quantity: element?.quantity,
            category: [element?.category],
            damaged: element?.damaged || 0

          })
        });
        const uniqueOptions = [...new Set(op.map(item => item?.value))]
        console.info('up', uniqueOptions)
        setData(rawData)
        setOptions(uniqueOptions?.map((option) => { return { value: option, label: option } }))
      } else {
        toast.error(res?.data?.error)
      }
      setLoading(false)
    }).catch(err => toast.fail(err?.response?.data?.error))
  }

  useEffect(() => {
    getTableData()
  }, [])

  const pieData = {
    labels: ['Furniture', 'Electronics', 'Stationary', 'Other'],
    datasets: [
      {
        label: 'number of',
        data: [40, 20, 80, 10],
        backgroundColor: [
          '#41B883', '#E46651', '#00D8FF', '#DD1B16'
        ],
        borderWidth: 1,
      },
    ],
  }
  const pieData2 = {
    labels: ['Damaged', 'Fixed'],
    datasets: [
      {
        label: 'number of',
        data: [20, 80],
        backgroundColor: ['#DD1B16', '#41B883'],
        borderWidth: 1,
      },
    ],
  }

  console.log(selectedItem);
  return (
    <main>
      <div className="main__container">
        <div>
          <div className="heading">Inventory Statistics</div>
          <Select
            className="basic-single"
            classNamePrefix="select"
            placeholder="Select Item"
            isLoading={loading}
            name="color"
            options={options}
            onChange={(val) => setSelectedItem(val?.value)}
          />
        </div>

        <div className="charts">
          <div className="charts__left">
            <div className="charts__left__title">
              <div>
                <h1 style={{ marginBottom: '40px' }}>Category Distribution</h1>
              </div>
            </div>
            <div style={{ width: '280px', width: '280px' }}>
              <Pie data={pieData} options={{
                maintainAspectRatio: true,

              }} />
            </div>

          </div>

          <div className="charts__right">
            <div className="charts__left__title">
              <div>
                <h1 style={{ marginBottom: '40px' }}>Damage Distribution</h1>
                {/* <p>Raipur, Dehradun, India</p> */}
              </div>
            </div>
            <div style={{ width: '280px', width: '280px' }}>
              <Pie data={pieData2} options={{
                // responsive: true,
                maintainAspectRatio: true,

              }} />
            </div>
          </div>
        </div>
        <div style={{ width: "90%" }}>
          <CChart
            type="bar"
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'GitHub Commits',
                  backgroundColor: '#f87979',
                  data: [40, 20, 12, 39, 10, 40, 39, 80, 40],
                },
              ],
            }}
            labels="months"
          />
        </div>

        {/* <!-- CHARTS ENDS HERE --> */}
      </div>
    </main>
  );
};

export default Main;