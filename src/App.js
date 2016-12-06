import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Tree from './tree/Tree3.js';

class App extends Component {
	state = {
		lbs: [
			'item1', 'item2', 'item3', 'item4', 'item5', 'item6'
		],
		show: true
	}
	render() {
		//console.log(this.state)
		//console.log(this.state.show)
		var self = this;
		var getItems = function () {
			if (self.state.show) {
				console.log('yes');
				//console.log(self.state.lbs)
				return self.state.lbs.map(function (item, index) {
					//console.log(123123)
					return <div key={"lb"+index}>{item}</div>
				})
			} else {
				console.log('no');
				return (<div/>)
			}
		}
		return (
			<div>
				{/*<iframe className="backGroundIframe" width="750" height="530" src="./pages/loading/index.html"></iframe>*/}
				<div style={{position:"absolute"}}>
					11234567889
					<Tree/>
					{getItems()}
				</div>
			</div>
		);
	}


	render3() {
		return (
			<div>
				<p>员工编号<input style={{ width: 50 }}/></p>
				<p>员工姓名<input style={{ width: 50 }}/></p>
				<p>员工姓名<input style={{ width: 50 }}/></p>
				选择的晚餐？<br /><br />
				<label><input name="Fruit" type="radio" value=""/>海鲜粥 </label>
				<label><input name="Fruit" type="radio" value=""/>皮蛋瘦肉粥 </label>
				<br/><br/>
				<button>提交</button>
			</div>
		);
	}

	render2() {
		return (
			<div className="App">
				12122
				<div className="App-header">
					<img src={logo} className="App-logo" alt="logo"/>
					<h2>Welcome to React</h2>
				</div>
				<p className="App-intro">
					To get started, edit <code>src/App.js</code> and save to reload.
				</p>
			</div>
		);
	}
}

export default App;
