import React from 'react';
import { Card, Row, Col } from 'antd';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Serv from '../../api'
@withRouter
@observer
class AnnouncementDetail extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {}
        };
    }

    async componentDidMount() {
        let path = this.props.location.search
        path = new URLSearchParams(path.substring(1, this.props.location.length))
        const id = path.get('id');
        const result = await Serv.reqAnnouncementDetails(id)
        console.log(result);
        if (result.status == 0) {
            let { data } = result
            this.setState({ data })
        }
    }

    render() {
        let { data } = this.state
        return (<div>
            <Card title={data.title} bordered={false} >
                <Row justify='center' style={{color:'#ADADAD'}}>
                    <Col>
                        时间：{data.createTime}
                    </Col>
                    <Col offset={1}>
                        作者：{data.author}
                    </Col>
                </Row>
                <Row style={{marginTop:20}}>
                <div dangerouslySetInnerHTML = {{ __html: data.content }} /> 
                </Row>
            </Card>
        </div>);
    }
}

export default AnnouncementDetail;