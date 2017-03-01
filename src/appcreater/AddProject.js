import React, { Component } from 'react';

import UploadArea from './UploadArea';
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
class AddProject extends Component {
	state = {
		value: 1
	}
	callback(key) {
		console.log(key, this);
	}
	onInput(e) {
		console.log(e.target.value)

	}
	checkVersion() {

	}
	onChange(e) {
		this.setState({ value: e.target.value })
	}
	render() {
		console.log('value:',this.state.value)
		return (
			<div  style={{ textAlign: 'left' }}>
				
				<RadioGroup style={{marginBottom:'10px'}} onChange={this.onChange.bind(this)} value={this.state.value}>
					<Radio value={1}>Eclipse 工程</Radio>
					<Radio value={2}>Android Studio 工程</Radio>
				</RadioGroup>
				<UploadArea projectType={this.state.value} supportVersion="4.0.2" projectName="HelloEgret"/>
			</div>
		);
	}
}
export default AddProject;
