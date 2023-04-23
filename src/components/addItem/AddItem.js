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
import { useState } from 'react';
import "./AddItem.css"
const { RangePicker } = DatePicker;
const { TextArea } = Input;
const AddItem = () => {
    const [componentDisabled, setComponentDisabled] = useState(true);
    return (
        <div className='addItem'>
            <div className='addItem_heading1'>Add New Item Here</div>
            {/* <Checkbox
                checked={componentDisabled}
                onChange={(e) => setComponentDisabled(e.target.checked)}
            >
                Form disabled
            </Checkbox> */}
            <Form
                labelCol={{
                    span: 5,
                }}
                wrapperCol={{
                    span: 10,
                }}
                layout="horizontal"
            >
                <Form.Item required label="Name">
                    <Input />
                </Form.Item>
                <Form.Item required label="Brand">
                    <Input />
                </Form.Item>
                <Form.Item label="Category" required >
                    <Select>
                        <Select.Option value="demo">Furniture</Select.Option>
                        <Select.Option value="demo">Electronic</Select.Option>
                        <Select.Option value="demo">Stationary</Select.Option>
                        <Select.Option value="demo">Utencil</Select.Option>
                        <Select.Option value="demo">Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item required label="Date of purchase">
                    <DatePicker />
                </Form.Item>
                <Form.Item label="Number of items">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Cost of one item">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Total Amount(without GST)">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Total Amount(with GST)">
                    <InputNumber />
                </Form.Item>
                <Form.Item label="Invoice Number">
                    <Input />
                </Form.Item>

                <Form.Item label="Remark">
                    <TextArea rows={4} />
                </Form.Item>
                {/* <Form.Item label="Switch" valuePropName="checked">
                    <Switch />
                </Form.Item> */}
                <Form.Item label="Image" valuePropName="fileList">
                    <Upload action="/upload.do" listType="picture-card">
                        <div>
                            <PlusOutlined />
                            <div
                                style={{
                                    marginTop: 8,
                                }}
                            >
                                Upload
                            </div>
                        </div>
                    </Upload>
                </Form.Item>
                <Form.Item label="Button">
                    <Button>Button</Button>
                </Form.Item>
            </Form>
        </div>
    );
};
export default () => <AddItem />;