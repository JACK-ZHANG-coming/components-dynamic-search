import React, { PureComponent } from 'react';
import {
  Row,
  Col,
  Button,
  Card,
  Modal,
} from 'antd';
import moment from 'moment';
import MySearch from './components/MySearch.js'
import 'antd/dist/antd.css'

export default class App extends PureComponent {

  state = {
    visible: false,
    searchValue: [
      {
        selectType: "投放时间", launchTime: [
          moment(moment((moment(moment().format('YYYY-MM-DD HH:mm:ss')).unix() - 172800) * 1000).format(), 'YYYY-MM-DD HH:mm:ss'),
          moment(moment((moment(moment().format('YYYY-MM-DD HH:mm:ss')).unix()) * 1000).format(), 'YYYY-MM-DD HH:mm:ss')
        ]
      }
    ]
  };

  onCloseOrOpen = (flag) => {
    console.log(flag)
    this.setState({
      visible: flag,
    });
  };

  onClose = () => {
    console.log("onClose")
    this.setState({
      visible: false,
    });
  }

  onOpen = () => {
    console.log("open")
    this.setState({
      visible: true,
    });
  }

  areSetSearchValue = (value) => {
    this.setState({
      searchValue: value,
    })
  }


  render() {
    return (
      <>
        <Card>
          <Row>
            <Col span={16}></Col>
            <Col span={8}>
              <Button
                type="primary"
                onClick={() => {
                  console.log("点击了高级搜索");
                  this.onOpen();
                }}
              >
                高级搜索
              </Button>
            </Col>
          </Row>
          <Row>
            {
              this.state.visible
                ?
                <MySearch onClose={this.onClose} areSetSearchValue={this.areSetSearchValue} searchValue={this.state.searchValue}></MySearch>
                :
                null
            }
            {/* <MySearch onClose={this.onClose}></MySearch> */}
          </Row>
        </Card>

      </>
    );
  }
}
