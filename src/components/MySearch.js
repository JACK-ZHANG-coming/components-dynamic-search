import {
  Button, Form, Select, Modal, Input, DatePicker, Row, Col
} from 'antd';
import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'antd/dist/antd.css'
const { Option } = Select;

export default class App extends React.Component {
  formRef = React.createRef();
  state = {
    TypeValue: '',
    typeOption: [
      {
        label: '投放时间', value: '投放时间'
      },
      {
        label: '投放类型', value: '投放类型'
      },
      {
        label: '消息类型', value: '消息类型'
      },
      {
        label: '消息内容', value: '消息内容'
      },
      {
        label: '负责人', value: '负责人'
      }
    ],
    lanuchTypeOption: [
      {
        label: 'a', value: 'a'
      },
      {
        label: 'b', value: 'b'
      }
    ],
    messageTypeOption: [
      {
        label: 'c', value: 'c'
      },
      {
        label: 'd', value: 'd'
      }
    ],
    onleaderOption: [
      {
        label: '张三', value: '80307224'
      },
      {
        label: '李四', value: '80307225'
      },
    ]
  }

  onselectTypeChange = (value, index) => {
    console.log("value-index---", value, index);
    this.formRef.current.setFieldsValue({
      selectType: value
    })
  }
  onlaunchTimeChange = (date, dateString) => {
    console.log(date)
    console.log(dateString)
    this.formRef.current.setFieldsValue({
      lanuchTime: dateString
    })
  }
  onlaunchTypeChange = (value) => {
    this.formRef.current.setFieldsValue({
      lanuchType: value
    })
  }
  onmessageChange = (e) => {
    console.log(e.currentTarget.value)
    this.formRef.current.setFieldsValue({
      message: e.currentTarget.value
    })
  }
  onleaderChange = (value) => {
    this.formRef.current.setFieldsValue({
      leader: value
    })
  }

  onFinish = (value) => {
    let temp = [];
    temp = value?.type;
    let obj = {}
    for (let i = 0; i < temp.length; i++) {
      if (Object.keys(temp[i])[1] === 'launchTime') {
        obj[`${Object.keys(temp[i])[1]}`] = moment(temp[i][`${Object.keys(temp[i])[1]}`][0]).format('YYYYMMDDHHmmss') + ',' + moment(temp[i][`${Object.keys(temp[i])[1]}`][1]).format('YYYYMMDDHHmmss')
      }
      else {
        obj[`${Object.keys(temp[i])[1]}`] = temp[i][`${Object.keys(temp[i])[1]}`];
      }
    }
    console.log("onFinish-value:", value, obj);
  }

  render() {
    return (
      <div>
        <Modal
          title="查询条件"
          centered
          visible
          width={800}
          closable={false}
          footer={[
            <Button onClick={this.props.onClose}>取消</Button>,
            <Button onClick={() => {
              this.formRef.current.setFieldsValue({
                type: [-1]
              })
            }}>
              重置
            </Button>,
            <Button type='primary' onClick={() => { this.formRef.current.submit() }}>保存</Button>,
            <Button type='primary' onClick={() => { this.formRef.current.submit() }}>查询</Button>
          ]}
        >
          <Form
            name="basic"
            ref={this.formRef}
            layout='inline'
            initialValues={{ type: [-1] }}
            onFieldsChange={(v, m) => { console.log(v, m) }}
            onFinish={this.onFinish}
          >
            <Form.List
              name='type'
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey }) => (

                    <div style={{ display: 'flex', width: '100%', marginBottom: '10px' }} key={key}>

                      <div style={{ width: '40%' }}>
                        <Form.Item
                          // name='selectType'
                          name={[name, `selectType`]}
                          fieldKey={[fieldKey, `selectType`]}
                          rules={[{ required: true, message: '字段不能为空' }]}
                        >
                          <Select
                            placeholder='请选择搜索类型'
                            onChange={this.onselectTypeChange}
                          >
                            {
                              this.state.typeOption.map((item, index) => {
                                // let temp = this.areFormValues();
                                // console.log("temp-:", temp)
                                return (<Option key={item.value} value={item.value}>{item.label}</Option>)
                              }
                              )
                            }
                          </Select>
                        </Form.Item>
                      </div>
                      <div style={{ width: '40%' }}>
                        <Form.Item
                          shouldUpdate={(prevValue, currValue) =>
                            // prevValue.selectType[fieldKey] !== currValue.selectType[fieldKey]
                            console.log(this.formRef)
                          }
                        >
                          {
                            ({ getFieldValue }) => {
                              console.log(getFieldValue(['type', fieldKey, `selectType`]))
                              switch (getFieldValue(['type', fieldKey, `selectType`])) {
                                case '投放时间':
                                  return (
                                    <Form.Item
                                      // name='launchTime'
                                      name={[name, 'launchTime']}
                                      fieldKey={[fieldKey, 'launchTime']}
                                      rules={[{ required: true, message: '字段不能为空' }]}
                                      initialValue={[
                                        moment(moment((moment(moment().format('YYYY-MM-DD HH:mm:ss')).unix() - 172800) * 1000).format(), 'YYYY-MM-DD HH:mm:ss'),
                                        moment(moment((moment(moment().format('YYYY-MM-DD HH:mm:ss')).unix()) * 1000).format(), 'YYYY-MM-DD HH:mm:ss')
                                      ]}
                                    >
                                      <DatePicker.RangePicker

                                        showTime
                                        onChange={this.onlaunchTimeChange}
                                      />
                                    </Form.Item>
                                  )
                                case '投放类型': return (
                                  <Form.Item
                                    // name='launchType'
                                    name={[name, 'launchType']}
                                    fieldKey={[fieldKey, 'launchType']}
                                    rules={[{ required: true, message: '字段不能为空' }]}
                                  >
                                    <Select
                                      placeholder='请选择投放类型'
                                      onChange={this.onlaunchTypeChange}
                                    >
                                      {
                                        this.state.lanuchTypeOption.map((item, index) =>
                                          <Option key={item.value} value={item.value}>{item.label}</Option>
                                        )
                                      }
                                    </Select>
                                  </Form.Item>
                                )
                                case '消息类型': return (
                                  <Form.Item
                                    // name='messageType'
                                    name={[name, 'messageType']}
                                    fieldKey={[fieldKey, 'messageType']}
                                    rules={[{ required: true, message: '字段不能为空' }]}
                                  >
                                    <Select
                                      placeholder='请选择消息类型'
                                      onChange={this.onmessageTypeChange}
                                    >
                                      {
                                        this.state.messageTypeOption.map((item, index) =>
                                          <Option key={item.value} value={item.value}>{item.label}</Option>
                                        )
                                      }
                                    </Select>
                                  </Form.Item>
                                )
                                case '消息内容': return (
                                  <Form.Item
                                    // name='message'
                                    name={[name, 'message']}
                                    fieldKey={[fieldKey, 'message']}
                                    rules={[{ required: true, message: '字段不能为空' }]}
                                  >
                                    <Input
                                      placeholder='请输入要查询的消息内容'
                                      onChange={this.onmessageChange}
                                    />
                                  </Form.Item>
                                )
                                case '负责人': return (
                                  <Form.Item
                                    // name='leader'
                                    name={[name, 'leader']}
                                    fieldKey={[fieldKey, 'leader']}
                                    rules={[{ required: true, message: '字段不能为空' }]}
                                  >
                                    <Select
                                      placeholder='请选择负责人'
                                      onChange={this.onleaderChange}
                                    >
                                      {
                                        this.state.onleaderOption.map((item, index) =>
                                          <Option key={item.value} value={item.value}>{item.label}</Option>
                                        )
                                      }
                                    </Select>
                                  </Form.Item>
                                )
                                default: return (
                                  <Form.Item
                                    // name='leader'
                                    name={[name, 'other']}
                                    fieldKey={[fieldKey, 'other']}
                                    rules={[{ required: true, message: '字段不能为空' }]}
                                  >
                                    <Input
                                      placeholder='请输入'
                                    >
                                    </Input>
                                  </Form.Item>
                                );
                              }
                            }

                          }
                        </Form.Item>
                      </div>
                      {
                        <div style={{ width: '10%' }}>
                          <Form.Item>
                            <a
                              href
                              style={{ marginLeft: '10px' }}
                              onClick={() => {
                                remove(name)
                              }}>
                              <MinusCircleOutlined />
                            </a>
                          </Form.Item>
                        </div>
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
        </Modal>
      </div>
    );
  }

}

