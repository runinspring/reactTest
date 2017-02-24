import React, { Component,PropTypes } from 'react';
import { Upload, Button, Icon } from 'antd';
class UploadArea extends Component {
	imgUploadCallback(response) {
		let res = JSON.parse(response);
        console.log('res:',res);
		// this.setState({
		// 	pic: res.data.file_path
		// });
	}
    stopUpload(){
        console.log('stop',this.props.type)
    }
	render() {
        //上传的所有参数  https://ant.design/components/upload-cn/
		let uploadProps = {
			action: '/file/upload',//上传的地址
			name: 'user_file',
			method: 'post',
			uploadCallback: this.imgUploadCallback.bind(this)
		}
        // var disableType
		return (
			<div>
				<div >
					<div style={{ float: 'left',marginRight:'10px'}}>
						<Upload {...uploadProps} >
                            <Button disabled={this.props.disable}>
								<Icon type="upload" /> 点击上传打包
    					</Button>
						</Upload>
					</div>
                    <Button style={{ float: 'left' }} onClick={this.stopUpload.bind(this)}>
						终止打包
    				</Button>
				</div>
				<div style={{ clear: 'both' }} />
				<div style={{ textAlign: 'left' }} >
					输出结果:
				</div>
			</div>
		);
	}
}
export default UploadArea;
UploadArea.PropTypes = {
    type:PropTypes.number.isRequired,
    disable:PropTypes.bool,//是否禁用
}
