import React, { Component } from 'react';

import UploadArea from './UploadArea';
import { Input } from 'antd';
class AddAssets extends Component {
	state = {
		value: '4.0.2',
		projectName: 'HelloEgret'
	}
	onInput(e) {
		// console.log(e.target.value)
		this.setState({ value: e.target.value })
	}
	onChangeName(e) {
		this.setState({ projectName: e.target.value })
	}
	render() {
		return (
			<div style={{ textAlign: 'left' }}>
				<div>
					需要的安卓support版本号：
				<Input style={{ width: '100px' }} value={this.state.value} onChange={this.onInput.bind(this)} />
				</div>
				<div>
					项目名称：
				<Input style={{ width: '300px' }} value={this.state.projectName} onChange={this.onChangeName.bind(this)} />
				</div>
				<UploadArea projectType={3} supportVersion={this.state.value} projectName={this.state.projectName} />
			</div>
		);
	}
}
export default AddAssets;
