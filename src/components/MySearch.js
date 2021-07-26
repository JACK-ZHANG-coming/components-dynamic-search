import {
  Button, Form, Select, Modal, Input, DatePicker,
} from 'antd';
import React from 'react'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import moment from 'moment';
import 'antd/dist/antd.css'

const { Option } = Select;

let flagSubmit = 0;

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
    ],
  }

  onFinish = (value) => {
    let temp = [];
    temp = value?.type;
    let obj = {}
    for (let i = 0; i < temp.length; i++) {
      if (Object.keys(temp[i])[1] === 'launchTime') {
        obj[`${Object.keys(temp[i])[1]}`] = moment(temp[i][`${Object.keys(temp[i])[1]}`][0]).format('YYYYMMDDHHmmss') + ','
          + moment(temp[i][`${Object.keys(temp[i])[1]}`][1]).format('YYYYMMDDHHmmss');
      }
      else {
        obj[`${Object.keys(temp[i])[1]}`] = temp[i][`${Object.keys(temp[i])[1]}`];
      }
    }
    console.log("onFinish-value:", value, obj);
    this.props.areSetSearchValue(value.type);
    // 按钮为“查询”，关闭页面，进行查询操作
    if (flagSubmit === 1) {
      this.props.onClose();
    }
  }

  componentDidMount() {
    console.log("子组件加载完毕");
    console.log("this.props.searchValue:", this.props.searchValue)
    this.formRef.current.setFieldsValue({
      type: this.props.searchValue,
    })
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
              });
              this.props.areSetSearchValue([-1]);
            }}>
              重置
            </Button>,
            <Button type='primary' onClick={() => { flagSubmit = 0; this.formRef.current.submit() }}>保存</Button>,
            <Button type='primary' onClick={() => { flagSubmit = 1; this.formRef.current.submit() }}>查询</Button>
          ]}
        >
          <Form
            name="basic"
            ref={this.formRef}
            layout='inline'
            onFinish={this.onFinish}
          >
            <Form.List
              name='type'
            >
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey }, index) => (

                    <div style={{ display: 'flex', width: '100%', marginBottom: '10px' }} key={key}>
                      <div style={{ width: '40%' }}>
                        <Form.Item
                          name={[name, `selectType`]}
                          rules={[{ required: true, message: '字段不能为空' }]}
                          shouldUpdate={true}
                        >
                          <Select
                            placeholder='请选择搜索类型'
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
                      </div>
                      <div style={{ width: '40%' }}>
                        <Form.Item
                          fieldKey={fieldKey}
                          shouldUpdate
                          preserve={true}
                        >
                          {
                            ({ getFieldValue }) => {
                              switch (getFieldValue(['type', index, `selectType`])) {
                                case '投放时间':
                                  return (
                                    <Form.Item
                                      name={[name, 'launchTime']}
                                      rules={[{ required: true, message: '字段不能为空' }]}
                                      initialValue={[
                                        moment(moment((moment(moment().format('YYYY-MM-DD HH:mm:ss')).unix() - 172800) * 1000).format(), 'YYYY-MM-DD HH:mm:ss'),
                                        moment(moment((moment(moment().format('YYYY-MM-DD HH:mm:ss')).unix()) * 1000).format(), 'YYYY-MM-DD HH:mm:ss')
                                      ]}
                                    >
                                      <DatePicker.RangePicker
                                        showTime
                                      />
                                    </Form.Item>
                                  )
                                case '投放类型': return (
                                  <Form.Item
                                    name={[name, 'launchType']}
                                    rules={[{ required: true, message: '字段不能为空' }]}
                                  >
                                    <Select
                                      placeholder='请选择投放类型'
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
                                    name={[name, 'messageType']}
                                    rules={[{ required: true, message: '字段不能为空' }]}
                                  >
                                    <Select
                                      placeholder='请选择消息类型'
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
                                    name={[name, 'message']}
                                    rules={[{ required: true, message: '字段不能为空' }]}
                                  >
                                    <Input
                                      placeholder='请输入要查询的消息内容'
                                    />
                                  </Form.Item>
                                )
                                case '负责人': return (
                                  <Form.Item
                                    name={[name, 'leader']}
                                    rules={[{ required: true, message: '字段不能为空' }]}
                                  >
                                    <Select
                                      placeholder='请选择负责人'
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
                        <div div style={{ width: '10%' }}>
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
                    <Form.Item
                      shouldUpdate
                    >
                      {({ getFieldValue }) =>
                        <Button disabled={!(fields[0] === -1 || fields.length === 0 || getFieldValue(['type', fields.length - 1, 'selectType']))} onClick={() => add()} icon={<PlusOutlined />}>添加条件</Button>
                      }
                    </Form.Item>
                  ) : null}
                </>
              )}
            </Form.List>
          </Form>
        </Modal >
      </div >
    );
  }
}

