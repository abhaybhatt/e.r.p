import React, { useState, useEffect } from 'react'
import backebdEndpoint from '../../endpoint';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import './itemDetail.css';

function ItemDetail() {
    let { id } = useParams();
    const [itemData, setItemData] = useState({})

    const getItemData = async () => {
        await axios.get(`${backebdEndpoint}/inventory/get/${id}`).then((res) => {
            if (res?.data?.status === "pass") {
                setItemData(res?.data?.data)
            } else {
                toast.error(res?.data?.error)
            }
        }).catch(err => toast.fail(err?.response?.data?.error))
    }

    useEffect(() => {
        getItemData()

    }, [])
    const detailsArr = [
        { date: 'dd-mm-yy', count: "5", damaged: true },
        { date: 'dd-mm-yy', count: "5", damaged: true },
        { date: 'dd-mm-yy', count: "5", damaged: false },
        { date: 'dd-mm-yy', count: "5", damaged: true },
        { date: 'dd-mm-yy', count: "5", damaged: false },
        { date: 'dd-mm-yy', count: "5", damaged: true },
        { date: 'dd-mm-yy', count: "5", damaged: false }]


    return (
        <div className="itemdetail">
            <Toaster />
            <div className="itemdetailUpper">
                <div className="itemImage">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQnZD_AqaNeUpT8tgasfp2VlDFDXO5V4fE2o0eoLAk&s">
                    </img>
                </div>
                <div className='itemdetailsection'>
                    <p>Name: {itemData?.name}</p>
                    <p>Brand: {itemData?.brand}</p>
                    <p>Quantity: {itemData?.quantity}</p>
                    <p>Damaged: {itemData?.damaged || 0}</p>
                </div>
            </div>
            <div className="itemdetailLower">
                <div className="historyTable">
                    <div className="historyTableHeader">
                        <p className='tableLeft headerleft'>Date</p>
                        <p className='tableRight'>Activity</p>
                    </div>
                    <div className='historyTableContent'>
                        {detailsArr.map(item => (
                            <div className='detailsContent'>
                                <p className='tableLeft contentsleft'>{item.date}</p>
                                <p className='tableRight' style={{ color: item.damaged ? "red" : "green" }}>{item.count} {item.damaged ? "damaged" : "added"}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='graph'>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail