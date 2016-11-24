import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Tree extends Component {
	state = {
		lbs: [
			'sec_item1', 'sec_item2', 'sec_item3', 'sec_item4', 'sec_item5', 'sec_item6'
		],
		title: 'TreeView',
		close: true//默认为关闭状态
	}
	showItem = false;
	idxAniEnd = 1;
	componentDidMount(){
		let self = this;
		this.showItem = true;
		var tree =  ReactDOM.findDOMNode(this.refs['tree']);
		tree.addEventListener('webkitAnimationEnd',function(){
			self.idxAniEnd+=1;
			if(self.idxAniEnd === self.state.lbs.length){
				self.idxAniEnd = 1;
				if(self.state.close){
					self.showItem = false;
					self.forceUpdate();
				}
			}
		})
	}
	getItems() {
		console.log('close:', this.state.close,'showItem:',this.showItem);
		if(!this.showItem){
			return <div/>;
		}
		if (this.state.close) {
			//console.log(881)
			return this.state.lbs.map(function (item, index) {
				var style = {animation:`moveOut 0.1s ease ${index*0.1}s`,animationFillMode:'forwards',marginLeft:20}
				return <div key={'lb'+index} style={style}>{item}</div>
			})
		}else{
			return this.state.lbs.map(function (item, index) {
				var style = {animation:`moveIn 0.4s ease ${index*0.1}s`,animationFillMode:'backwards',marginLeft:20}
				//var style = {animation:``}'moveIn 2s ease-in'+index*0.1+'s'
				return <div key={'lb'+index} style={style}>{item}</div>
			})
		}
	}

	clickMenu() {
		this.showItem = true;
		this.setState({close:!this.state.close})
	}

	render() {
		return (<div>
			<div onClick={this.clickMenu.bind(this)}>
				{this.state.title}
			</div>
			<div ref="tree">
				{this.getItems()}
			</div>
		</div>)
	}
}
export default Tree;