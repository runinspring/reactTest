import React, { Component, PropTypes } from 'react';
import { Upload, Button, Icon, Steps, Radio } from 'antd';
const Step = Steps.Step;
const RadioGroup = Radio.Group;
class UploadArea extends Component {
	state = {
		output: '',
		autoBuild: 0,//0：上传后自动打包，1：不自动打包
		upLoadEnd: false,//是否上传成功
		startPackage: false,//是否开始打包
	}
	startBuild(click,fileName) {
		console.log('开始打包')
		// console.log(this.)
		// console.log('fileName:',fileName)
		if (this.props.projectType === 3) {//assets
			console.log('this.props.supportVersion:',this.props.supportVersion)
			if (!this.props.supportVersion) {
				this.setState({ output: "请输入版本号", autoBuild: 1 })
			} else {
				if (this.state.autoBuild === 0 || click === true) {
					this.setState({ startPackage: true,output:'开始打包' });
					startAndroidNativeAutoPackage(this.props.projectType,fileName,this.props.projectName,this.props.supportVersion)
				} else {
					this.setState({ startPackage: false });
				}
			}
		} else {//工程版本
			if (this.state.autoBuild === 0 || click === true) {
				this.setState({ startPackage: true,output:'开始打包'});
				startAndroidNativeAutoPackage(this.props.projectType,fileName,this.props.projectName,this.props.supportVersion)
			} else {
				this.setState({ startPackage: false });
			}
		}
	}
	stopBuild() {
		this.setState({startPackage:false})
		stopAndroidNativeAutoPackage();
	}
	beforeUpload(type, file) {
		var fileName = type.name;
		var fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
		this.setState({ upLoadEnd: false })
		if (fileExtension !== 'zip') {
			this.setState({ output: '请上传zip文件' })
			return false;
		} else {
			return true;
		}
	}
	render() {
		var self = this;
		//上传的所有参数  https://ant.design/components/upload-cn/
		let uploadProps = {
			// action: 'http://10.0.12.5:8081/upload',//上传的地址
			// action: 'http://10.0.7.156:8081/upload',
			action: '/upload',
			// name: 'user_file',
			method: 'post',
			onChange(info) {
				// console.log('info.file.status :',info.file.status)
				if (info.file.status !== 'uploading') {
					var fileName = info.file.name;
					// console.log('info:',info.file.name)
					// console.log(info.file, info.fileList);
				}

				if (info.file.status === 'done') {
					// console.log('info:', info)
					self.setState({ output: `${fileName}上传成功`, upLoadEnd: true })
					self.startBuild(false,fileName);
					// console.log(`${info.file.name} file uploaded successfully`)
					// message.success(`${info.file.name} file uploaded successfully`);
				} else if (info.file.status === 'error') {
					// self.setState({output:'zip包上传失败'})
					
					self.setState({ output: `${fileName}上传失败`, upLoadEnd: false })
					
				}
			}
		}
		// console.log('project type:', this.props.projectType)
		// console.log('autoBuild:', this.state.autoBuild)
		// console.log('upload:',this.state.upLoadEnd)

		if (this.state.upLoadEnd) {
			var buildButton = false;//可以点击打包按钮
			if (this.state.autoBuild === 0) {
				buildButton = true;//自动打包时，禁用
			}
		} else {
			buildButton = true;//不可以点击打包按钮
		}
		if (this.state.startPackage) {
			buildButton = true;
		}
		var stepNum = 1;//默认步骤
		if (this.state.upLoadEnd) {
			stepNum = 2;
			if (this.state.startPackage) {
				stepNum = 3;//开始打包了
			}
		}
		// console.log('this.state.startPackage:',this.state.startPackage)
		// console.log('打包步骤:',stepNum)


		// var disableType
		return (
			<div>
				<RadioGroup style={{ marginBottom: '10px' }} onChange={(e) => { this.setState({ autoBuild: e.target.value }) } } value={this.state.autoBuild}>
					<Radio value={0}>上传后自动打包</Radio>
					<Radio value={1}>上传后手动打包</Radio>
				</RadioGroup>
				<div style={{ marginBottom: '4px' }} >
					<Upload {...uploadProps} beforeUpload={this.beforeUpload.bind(this)}>
						<Button disabled={this.state.startPackage} >
							<Icon type="upload" /> 点击上传zip文件
    						</Button>
					</Upload>
				</div>
				<Button disabled={buildButton} onClick={this.startBuild.bind(this, true)}>
					开始打包
				</Button>
				<Button onClick={this.stopBuild.bind(this)}>
					终止打包
    			</Button>
				<Steps size="small" style={{ marginTop: "10px" }} current={stepNum}>
					<Step title='基本设置' />
					<Step title="上传zip包" description="" />
					<Step title={this.state.autoBuild === 0 ? "自动打包" : "手动打包"} description="" />
					<Step title="打包中" description="" />
					<Step title="完成" description="" />
				</Steps>
				<div style={{ textAlign: 'left', fontWeight: "bold", fontSize: '16px', color: 'red' }} >
					{this.state.output}
				</div>
			</div>
		);
	}
}
export default UploadArea;
UploadArea.PropTypes = {
	projectType: PropTypes.number.isRequired,//1:Eclipse 工程 2:Android Studio 工程 3:单纯的assets资源包
	supportVersion: PropTypes.string.isRequired,//版本号
	projectName:PropTypes.string.isRequired,
}
