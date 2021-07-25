import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Space,
  Form,
  TimePicker,
  Select,
  Input,
} from 'antd';
import {
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';
import 'antd/dist/antd.css';

const { Option } = Select;

export default class MySearch extends PureComponent {

  formRef = React.createRef()

  constructor(props) {
    super(props);
    this.state = {
      startValue: null,
      endValue: null,
      endOpen: false,
      statisticalDurationState: 0,
      pointList: [], // 点位
    }
  }

  componentDidMount() {
    console.log("子组件加载完毕了")
  }

  onFinish = (value) => {

    console.log("onFinish-value:", value);
  }

  handleChange = (value) => {
    console.log("handleChange-value:", value);
    console.log("this.formRef.current.getFieldsValue():", this.formRef.current.getFieldsValue())
  }

  render() {
    console.log("子组件props:", this.props);

    return (
      <>
        <Form
          name="basic"
          ref={this.formRef}
          onFinish={this.onFinish}
          initialValues={{ mySearchForm: [-1] }}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Form.List
            name={'mySearchForm'}
          >
            {(fields, { add, remove }) => (
              <>
                {fields.map((field, index) => (
                  <div key={index} style={{ width: '100%', display: 'flex' }}>
                    {
                      index === 0
                        ?
                        <>
                          <div key={index} style={{ width: '100%', display: 'flex' }}>
                            <div style={{ width: '30%' }}>
                              <Form.Item
                                wrapperCol={{ span: 22 }}
                                name={[field.name, `mySearchForm${index}-0`]}
                                fieldKey={[field.fieldKey, `mySearchForm${index}`]}
                                rules={[{ required: true, message: '请输入内容' }]}
                              >
                                <Select onChange={this.handleChange} allowClear>
                                  <Option value="marketTime">投放时间</Option>
                                  <Option value="marketType">投放类型</Option>
                                  <Option value="messageType">消息类型</Option>
                                  <Option value="messageContent">消息内容</Option>
                                  <Option value="principal">负责人</Option>
                                </Select>
                              </Form.Item>
                            </div>
                            <div style={{ width: '30%' }}>
                              {
                                console.log('---:')
                              }
                              <Form.Item
                                wrapperCol={{ span: 22 }}
                                name={[field.name, `mySearchForm${index}-1`]}
                                fieldKey={[field.fieldKey, `mySearchForm${index}`]}
                                rules={[{ required: true, message: '请输入内容' }]}
                              >
                                <Input></Input>
                              </Form.Item>
                            </div>
                          </div>
                        </>
                        :
                        <>
                          <div key={index} style={{ width: '100%', display: 'flex' }}>
                            <div style={{ width: '30%' }}>
                              <Form.Item
                                wrapperCol={{ span: 22 }}
                                name={[field.name, `mySearchForm${index}`]}
                                fieldKey={[field.fieldKey, `mySearchForm${index}`]}
                                rules={[{ required: true, message: '请输入内容' }]}
                              >
                                <Select onChange={this.handleChange} allowClear>
                                  <Option value="marketTime">投放时间</Option>
                                  <Option value="marketType">投放类型</Option>
                                  <Option value="messageType">消息类型</Option>
                                  <Option value="messageContent">消息内容</Option>
                                  <Option value="principal">负责人</Option>
                                </Select>
                              </Form.Item>
                            </div>
                            <div style={{ width: '30%' }}>
                              <Form.Item
                                wrapperCol={{ span: 22 }}
                                name={[field.name, `mySearchForm${index}-1`]}
                                fieldKey={[field.fieldKey, `mySearchForm${index}`]}
                                rules={[{ required: true, message: '请输入内容' }]}
                              >
                                <Input></Input>
                              </Form.Item>
                            </div>
                            {
                              <div style={{ width: '10%' }}>
                                <Form.Item>
                                  <a
                                    href
                                    style={{ marginLeft: '10px' }}
                                    onClick={() => {
                                      remove(field.name)
                                    }}>
                                    <MinusCircleOutlined />
                                  </a>
                                </Form.Item>
                              </div>
                            }
                          </div>
                        </>
                    }
                  </div>
                ))}
                {fields.length < 5 ? (
                  <a
                    href
                    onClick={() => {
                      add()
                    }}
                  >
                    <PlusOutlined />
                    添加条件
                  </a>
                ) : null}
              </>
            )}
          </Form.List>
        </Form>
        <Row gutter={24}>
          <Col span={16}></Col>
          <Col span={8}>
            <Space>
              <Button onClick={this.props.onClose}>取消</Button>
              <Button>重置</Button>
              <Button>保存</Button>
              <Button onClick={() => {
                this.formRef.current.submit();
              }}>查询</Button>
            </Space>
          </Col>
        </Row>
      </>
    );
  }
}
