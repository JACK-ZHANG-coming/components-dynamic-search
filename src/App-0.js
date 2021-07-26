import {
  Button, Form, Select, Modal, Input, DatePicker,
} from 'antd';
import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'
import moment from 'moment';
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

  // onselectTypeChange = (value) => {
  //   this.formRef.current.setFieldsValue({
  //     selectType: value
  //   })
  // }
  // onlaunchTimeChange = (date, dateString) => {
  //   console.log(date)
  //   console.log(dateString)
  //   this.formRef.current.setFieldsValue({
  //     lanuchTime: dateString
  //   })
  // }
  // onlaunchTypeChange = (value) => {
  //   this.formRef.current.setFieldsValue({
  //     lanuchType: value
  //   })
  // }
  // onmessageChange = (e) => {
  //   console.log(e.currentTarget.value)
  //   this.formRef.current.setFieldsValue({
  //     message: e.currentTarget.value
  //   })
  // }
  // onleaderChange = (value) => {
  //   this.formRef.current.setFieldsValue({
  //     leader: value
  //   })
  // }
  render() {
    return (
      <div>
        <Button type="primary">高级搜索</Button>
        <Modal
          centered
          visible
          width={800}
          footer={[
            <Button>取消</Button>,
            <Button>重置</Button>,
            <Button type='primary'>保存</Button>,
            <Button type='primary'>查询</Button>
          ]}
        >
          <Form ref={this.formRef}
            layout='inline'
          >
            <Form.List
              name='type'
              rules={[{ required: true, message: '字段不能为空' }]}
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }, index) => (
                    <div style={{ display: 'flex' }} key={key}>
                      <Form.Item
                        name={[name, 'selectType']}
                        rules={[{ required: true }]}
                        shouldUpdate={true}
                      >
                        <Select
                          placeholder='请选择搜索类型'
                        // onChange={this.onselectTypeChange}
                        >
                          {
                            this.state.typeOption.map((item) =>
                              <Option key={item.value} value={item.value}
                                disabled={this.formRef.current.getFieldsValue(true).type.find(
                                  x => {
                                    return x && x.selectType === item.value
                                  }
                                )}
                              >{item.label}</Option>
                            )
                          }
                        </Select>
                      </Form.Item>
                      <Form.Item
                        fieldKey={fieldKey}
                        shouldUpdate
                        preserve={true}
                      >
                        {
                          ({ getFieldValue }) => {
                            switch (getFieldValue(['type', index, 'selectType'])) {
                              case '投放时间': return (
                                <Form.Item
                                  name={[name, 'launchTime']}
                                >
                                  <DatePicker
                                    showTime
                                  // onChange={this.onlaunchTimeChange}
                                  />
                                </Form.Item>
                              )
                              case '投放类型': return (
                                <Form.Item
                                  name={[name, 'launchType']}
                                >
                                  <Select
                                    placeholder='请选择投放类型'
                                  // onChange={this.onlaunchTypeChange}
                                  >
                                    {
                                      this.state.lanuchTypeOption.map((item) =>
                                        <Option key={item.value} value={item.value}>{item.label}</Option>
                                      )
                                    }
                                  </Select>
                                </Form.Item>
                              )
                              case '消息类型': return (
                                <Form.Item
                                  name={[name, 'messageType']}
                                >
                                  <Select
                                    placeholder='请选择消息类型'
                                  // onChange={this.onmessageTypeChange}
                                  >
                                    {
                                      this.state.messageTypeOption.map((item) =>
                                        <Option key={item.value} value={item.value}>{item.label}</Option>
                                      )
                                    }
                                  </Select>
                                </Form.Item>
                              )
                              case '消息内容': return (
                                <Form.Item
                                  name={[name, 'message']}
                                >
                                  <Input
                                    placeholder='请输入要查询的消息内容'
                                  // onChange={this.onmessageChange}
                                  />
                                </Form.Item>
                              )
                              case '负责人': return (
                                <Form.Item
                                  name={[name, 'leader']}
                                >
                                  <Select
                                    placeholder='请选择负责人'
                                  // onChange={this.onleaderChange}
                                  >
                                    {
                                      this.state.onleaderOption.map((item, index) =>
                                        <Option key={item.value} value={item.value}>{item.label}</Option>
                                      )
                                    }
                                  </Select>
                                </Form.Item>
                              )
                            }
                          }

                        }
                      </Form.Item>
                      <Form.Item>
                        <Button onClick={() => remove(name)}>删除</Button>
                      </Form.Item>
                    </div>

                  ))}
                  <Form.Item
                    shouldUpdate
                  >
                    {({ getFieldValue }) =>
                      <Button disabled={fields.length !== 0 && !getFieldValue(['type', fields.length - 1, 'selectType'])} onClick={() => add()} icon={<PlusOutlined />}>添加条件</Button>
                    }

                  </Form.Item>
                </>

              )}

            </Form.List>

          </Form>


        </Modal>
      </div>
    );
  }

}

