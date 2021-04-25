import React from 'react';
import { Row,Col,Table,Card } from 'antd';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Serv from "../../api/index";
import storageUtils from "../../utils/storageUtils";
@inject("HomeMod")
@withRouter
@observer
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.store = this.props.HomeMod;
    this.state = {
      user:{}
    };
  }

  componentDidMount() {
    const user = storageUtils.getUser()
    this.setState({user})
    this.getList()
  }
  getList = async () => {
    this.setState({ loading: true })
    const result = await Serv.reqAnnouncementList()
    this.setState({ loading: false })
    if (result.status == 0) {
      let { list } = result.data
      console.log(list, 'list');
      this.setState({ list })
    }
  }
  render() {
    let {user } = this.state
    return (<div>
      <Row>
        <Col span={10}>
        <Card title='公告' extra={<a href="#">更多</a>}>
          
          </Card>
        </Col>
      </Row>
    </div>);
  }
}

export default Home;