import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Space,
} from 'antd';
import 'antd/dist/antd.css'

export default class MySearch extends PureComponent {

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

  render() {
    console.log("子组件props:", this.props)
    return (
      <>
        <Row style={{ marginBottom: '20px' }}>
          123
        </Row>
        <Row gutter={24}>
          <Col span={16}></Col>
          <Col span={8}>
            <Space>
              <Button onClick={this.props.onClose}>取消</Button>
              <Button>重置</Button>
              <Button>保存</Button>
              <Button>查询</Button>
            </Space>
          </Col>
        </Row>
      </>
    );
  }
}
