import React, { Component } from 'react';
import E from 'wangeditor';
// import request from 'utils/request';

export default class extends Component {
  constructor(props) {
    super(props);
    this.nodeRef = React.createRef();
    this.state = {
      value: '',
    };
  }

  componentDidMount() {
    const self = this;
    const { props, state } = this;
    const { editorConfig, onChange, fileUploadConf } = props;
    const editor = new E(this.nodeRef.current);
    Object.assign(editor.config, editorConfig);
    editor.config.onchange = function (newHtml) {
      self.setState({ value: newHtml });
      onChange && onChange(newHtml);
    };
    editor.config.uploadImgMaxLength = 1;
    const { uploadApi, ossTokenApi, ossServer } = fileUploadConf || {};
    editor.config.customUploadImg = async function (resultFiles, insertImgFn) {
    //   if (uploadApi) { // 上传到文件服务器
    //     const formData = new FormData();
    //     formData.append('file', resultFiles[0]);
    //     const { success, data } = await request({
    //       url: uploadApi,
    //       method: 'POST',
    //       data: formData,
    //     });
    //     success && insertImgFn(data);
    //   } else if (ossTokenApi) { // 上传到oss服务器

    //   }
    };
    editor.create();
    editor.txt.html(props.value || state.value);
  }

  render() {
    return <div ref={this.nodeRef} className={this.props.className} style={this.props.style || {}} />;
  }
}
