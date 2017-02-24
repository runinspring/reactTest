import React, { Component } from 'react';

import UploadArea from './UploadArea';
import { Input } from 'antd';
class AddAssets extends Component {
	state = {
		
	}
	callback(key) {
		console.log(key,this);
	}
	onInput(e){
		console.log(e.target.value)
	}
	checkVersion(){

	}
	render() {
		return (
			<div>
				<Input placeholder="请输入版本号，如4.0.2" onChange={this.onInput.bind(this)}/>
				<UploadArea type={2} disable={false}/>
			</div>
		);
	}
}
export default AddAssets;
