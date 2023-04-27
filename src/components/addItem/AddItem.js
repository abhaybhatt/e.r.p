import { PlusOutlined } from '@ant-design/icons';
import {
    Button,
    Cascader,
    Checkbox,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,
    Upload,
} from 'antd';
import axios from 'axios';
import { useState } from 'react';
import backebdEndpoint from '../../endpoint';
import toast, { Toaster } from 'react-hot-toast';
import "./AddItem.css"
const { RangePicker } = DatePicker;
const { TextArea } = Input;
// const AddItem = () => {
//     const onFinish = (values) => {
//         console.info(values)
//     };
//     const onFinishFailed = (errorInfo) => {
//         console.info('Failed:', errorInfo);
//     };
//     return (
//         <div className='addItem'>
//             <div className='addItem_heading1'>Add New Item Here</div>
//             <Form
//                 name="basic"
//                 labelCol={{
//                     span: 8,
//                 }}
//                 wrapperCol={{
//                     span: 16,
//                 }}
//                 style={{
//                     maxWidth: 600,
//                 }}
//                 initialValues={{
//                     remember: true,
//                 }}
//                 onFinish={onFinish}
//                 onFinishFailed={onFinishFailed}
//                 autoComplete="off"
//             >
//                 <Form.Item required
//                     label="Name" name="name"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please input item name!',
//                         },
//                     ]}>
//                     <Input />
//                 </Form.Item>
//                 <Form.Item required label="Brand" name="brand"
//                     rules={[
//                         {
//                             required: true,
//                             message: 'Please input item brand!',
//                         },
//                     ]}>
//                     <Input />
//                 </Form.Item>
//                 <Form.Item label="Category" name="category" required >
//                     <Select>
//                         <Select.Option value="demo">Furniture</Select.Option>
//                         <Select.Option value="demo">Electronic</Select.Option>
//                         <Select.Option value="demo">Stationary</Select.Option>
//                         <Select.Option value="demo">Utencil</Select.Option>
//                         <Select.Option value="demo">Other</Select.Option>
//                     </Select>
//                 </Form.Item>
//                 <Form.Item label="Number of items" name="items" required>
//                     <InputNumber />
//                 </Form.Item>
//                 <Form.Item label="Total Amount(with GST)" name="with gst" required>
//                     <InputNumber />
//                 </Form.Item>
//                 <Form.Item required label="Date of purchase" name="date">
//                     <DatePicker />
//                 </Form.Item>

//                 <Form.Item label="Cost of one item" name="cost">
//                     <InputNumber />
//                 </Form.Item>
//                 <Form.Item label="Total Amount(without GST)" name="without gst">
//                     <InputNumber />
//                 </Form.Item>

//                 <Form.Item label="Invoice Number" name="invoice">
//                     <Input />
//                 </Form.Item>
//                 <Form.Item label="Supplier" name="supplier">
//                     <Input />
//                 </Form.Item>

//                 <Form.Item label="Remark" name="remark">
//                     <TextArea rows={4} />
//                 </Form.Item>
//             </Form>
//             <Button type="primary" htmlType="submit">
//                 Submit
//             </Button>
//         </div>
//     );
// };
// export default () => <AddItem />;


const onFinish = async (values) => {

    const { brand, category, cost, items, name } = values
    await axios.post(`${backebdEndpoint}/inventory/add`, {
        name, brand, quantity: items, costPerItem: cost, category, damaged: 1
    }).then(res => {
        console.log(res)
        if (res?.data?.status === "pass") {
            toast.success("Item added in inventory")
        } else {
            toast.error(res?.data?.error)
        }
    }).catch(err => toast.fail(err?.response?.data?.error))
    console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};
const AddItem = () => (
    <div className='addItem'>
        <Toaster />
        <Form
            name="basic"
            labelCol={{
                span: 8,
            }}
            wrapperCol={{
                span: 16,
            }}
            style={{
                maxWidth: 600,
            }}
            initialValues={{
                remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
        >
            <Form.Item
                label="Name"
                name="name"
                rules={[
                    {
                        required: true,
                        message: 'Please input item name!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item
                label="Brand"
                name="brand"
                rules={[
                    {
                        required: true,
                        message: 'Please input item brand!',
                    },
                ]}
            >
                <Input />
            </Form.Item>

            <Form.Item label="Category" name="category" rules={[
                {
                    required: true,
                    message: 'Please select item category!',
                },
            ]} >
                <Select>
                    <Select.Option value="Furniture">Furniture</Select.Option>
                    <Select.Option value="Electronic">Electronic</Select.Option>
                    <Select.Option value="Stationary">Stationary</Select.Option>
                    <Select.Option value="Utencil">Utencil</Select.Option>
                    <Select.Option value="Other">Other</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Number of items" name="items" rules={[
                {
                    required: true,
                    message: 'Please input item quantity!',
                },
            ]}>
                <InputNumber />
            </Form.Item>
            <Form.Item label="Cost of one item" name="cost" rules={[
                {
                    required: true,
                    message: 'Please input item cost!',
                },
            ]}>
                <InputNumber />
            </Form.Item>

            <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
            >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    </div>

);
export default AddItem;