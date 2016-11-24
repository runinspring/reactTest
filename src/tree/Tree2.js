import './tree2.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
class Tree2 extends Component {
    state = {
        trees: [
            'sec_item11', 'sec_item2', 'sec_item213', 'sec_ite44m4', 'sec_item5', 'sec_item6'
        ],
        itemStylesBG: [],
        itemStylesBGOut: [],

        itemStylesWord: [],
        title: 'TreeView12334',
        close: true//默认为关闭状态
    }
    showItem = false;
    idxAniEnd = 1;

    // componentWillMount() {
    //     for (var i = 0, len = this.state.lbs.length; i < len; i++) {
    //         this.state.styleItemShow.push({animation: `treeItemShow 0.5s ease ${i * 0.1}s`, animationFillMode: 'both'});
    //         this.state.styleItemClose.push({animation: `treeItemClose 0.5s ease ${i * 0.1}s`, animationFillMode: 'forwards'});
    //     }
    //     console.log('componentWillMount');
    // }

    componentDidMount() {
        // console.log('componentDidMount');
        let self = this;
        this.showItem = true;
        var tree = ReactDOM.findDOMNode(this.refs['tree']);
        tree.addEventListener('webkitAnimationEnd', function (e) {
            self.idxAniEnd += 1;
            if (e.animationName == "treeItemClick") {
                //点击闪动的效果结束，再赋值一个新的style，否则不能重复点击
                var idx = e.target.id.split("treeOut")[1];
                self.state.itemStylesBGOut[idx] = {
                    animation: `treeItemClickEnd 0.1s`,
                    animationFillMode: 'both'
                }
                self.forceUpdate();
            }
            if (self.idxAniEnd === self.state.trees.length) {
                self.idxAniEnd = 1;
                if (self.state.close) {
                    self.showItem = false;
                    self.forceUpdate();
                }
            }
        })
    }

    getTest(e) {
        console.log(e)
    }

    getItems() {
        if (!this.showItem) {
            return <div/>;
        }
        var self = this;
        // console.log('getItems');
        return this.state.trees.map(function (item, index) {

            return (
                <div key={'lb' + index} style={{margin: "4px"}}>
                    <div id={'treeOut' + index} className="treeItemBGOut" style={self.state.itemStylesBGOut[index]}>
                        <div className="treeItemBG hand" style={self.state.itemStylesBG[index]} onMouseOver={() => {
                            self.state.itemStylesBGOut[index] = {
                                animation: `treeItemOver 0.3s ease`,
                                animationFillMode: 'both'
                            }
                            self.forceUpdate();
                        }} onMouseOut={() => {
                            self.state.itemStylesBGOut[index] = {
                                animation: `treeItemOut 0.3s ease`,
                                animationFillMode: 'forwards'
                            }
                            self.forceUpdate();
                        }} onClick={() => {
                            self.state.itemStylesBGOut[index] = {
                                animation: `treeItemClick 0.3s ease`,
                                animationFillMode: 'forwards'
                            }
                            self.forceUpdate();
                        }}
                        >
                            <div style={{padding: "0 8px 0 8px"}}>
                                <div className="treeItem unselectable"
                                     style={self.state.itemStylesWord[index]}>{item}</div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }

    clickMenu() {
        this.showItem = true;
        for (var i = 0, len = this.state.trees.length; i < len; i++) {
            if (this.state.close) {
                var style = {
                    animation: `treeItemShow 0.5s ease ${i * 0.1}s`,
                    animationFillMode: 'both'
                };
            } else {
                style = {
                    // animation: `treeItemClose 0.5s ease ${0.1*len-i * 0.1}s`,
                    animation: `treeItemClose ${0.5+0.1*i}s ease`,
                    animationFillMode: 'forwards'
                }
            }
            this.state.itemStylesBG[i] = style;
            this.state.itemStylesWord[i] = style;

        }
        this.state.itemStylesBGOut = [];
        this.idxAniEnd = 1;
        this.setState({close: !this.state.close});
    }

    render() {
        // console.log('render');
        return (<div >
            <div className="hand unselectable" onClick={this.clickMenu.bind(this)}>
                {this.state.title}
            </div>
            <div ref="tree" style={{margin: "4px 0 0 20px"}}>
                {this.getItems()}
            </div>
        </div>)
    }
}
export default Tree2;