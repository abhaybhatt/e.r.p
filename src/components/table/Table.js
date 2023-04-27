import axios from 'axios';
import backebdEndpoint from '../../endpoint';
import { useState, useEffect } from 'react';
import { Space, Table, Tag } from 'antd';
import toast, { Toaster } from 'react-hot-toast';
import './Table.css'


const InventoryTable = () => {
    const [data, setData] = useState([])
    const deleteItem = async (element) => {
        await axios.delete(`${backebdEndpoint}/inventory/delete`, {
            data: { name: element?.name, brand: element?.brand }
        }).then(res => {
            if (res?.data?.status === "pass") {
                let rawData = []
                data?.forEach((e, idx) => {
                    if (element?.name !== e?.name && element?.brand !== e?.brand) {
                        rawData.push({
                            key: idx + 1,
                            name: e?.name,
                            brand: e?.brand,
                            quantity: e?.quantity,
                            category: e?.category,
                            damaged: 0
                        })
                    }

                });
                // console.log(rawData)
                setData(rawData)
            } else {
                toast.error(res?.data?.error)
            }
        }).catch(err => toast.fail(err?.response?.data?.error))
    }
    const columns = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Quantity',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Damaged',
            dataIndex: 'damaged',
            key: 'damaged',
        },
        {
            title: 'Category',
            key: 'category',
            dataIndex: 'category',
            render: (_, { category }) => (
                <>
                    {category.map((tag) => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <div onClick={() => console.log(record)}>Update</div>
                    <a onClick={() => deleteItem(record)}>Delete</a>
                </Space>
            ),
        },
    ];

    const getTableData = async () => {
        await axios.get(`${backebdEndpoint}/inventory/getAll`).then(res => {
            // console.log(res)
            if (res?.data?.status === "pass") {
                let rawData = []
                console.log(res?.data?.data)
                res?.data?.data?.forEach((element, idx) => {
                    rawData.push({
                        key: idx + 1,
                        name: element?.name,
                        brand: element?.brand,
                        quantity: element?.quantity,
                        category: [element?.category],
                        damaged: 0
                    })
                });
                // console.log(rawData)
                setData(rawData)
            } else {
                toast.error(res?.data?.error)
            }
        }).catch(err => toast.fail(err?.response?.data?.error))
    }
    useEffect(() => {
        getTableData()
    }, [])
    return (
        <div className='main-table'>
            <Toaster />
            <Table columns={columns} dataSource={data} />
        </div>
    )
};
export default InventoryTable

// export default App;