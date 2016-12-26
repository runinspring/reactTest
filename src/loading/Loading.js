import React, { Component } from 'react';
import './Loading.css';
class Loading extends Component {
	render() {
		//console.log(this.state)
		//console.log(this.state.show)
		// var self = this;
		return (
			<div>
				<div style={{ position: "absolute" }}>
					<div style={{ position: "absolute", left: "100px", top: "50px" }}>
						<div className="LoadingWordEff2" >
							<div className="LoadingWordEff" >
								<div className="LoadingWord">
									EGRET
								</div>
							</div>
						</div>
					</div>


				</div>
			</div>
		);
	}
}
// 
// <img src='./assets/word_load.png' className='LoadingWord'/>
export default Loading;
