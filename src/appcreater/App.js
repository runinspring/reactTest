import './antd.min.css';  // or 'antd/dist/antd.less'
import React, { Component } from 'react';
import { Tabs } from 'antd';
import AddAssets from './AddAssets';
import AddProject from './AddProject';
import p1 from "./assets/p1.png";
import p2 from "./assets/p2.png";
const TabPane = Tabs.TabPane
class App extends Component {
	state = {
		type:1,//1上传整个工程  2上传资源包
		imgURLs:[p1,p2]
	}
	callback(key) {
		// console.log(key,this);
		this.setState({type:key});
	}
	render() {
		var type = this.state.type-1;
		var imgSrc = this.state.imgURLs[type];
		// console.log(AndroidNativeAutoPackage)
		// console.log(222,imgSrc,type)
		// console.log(333,this.state.imgURLs)
		return (
			<div style={{width:'100%', textAlign: 'center' }}>
				<div style={{width: '500px', textAlign: 'center',margin:'0 auto'}} >
					<h1 style={{margin:"4px 0 4px 0"}}>白鹭内部云端打包系统</h1>
					<Tabs defaultActiveKey={this.state.type.toString()} onChange={this.callback.bind(this)} type="card">
						<TabPane tab="上传整个安卓工程" key="1"><AddProject type={1}/></TabPane>
						<TabPane tab="上传assets资源包" key="2"><AddAssets/></TabPane>
					</Tabs>
					<img role="presentation" src={imgSrc} style={{marginTop:"20px"}}/>
				</div>
			</div>
		);
	}
}
export default App;
