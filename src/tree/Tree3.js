import './tree3.css';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
class Tree3 extends Component {
    state = {
        trees: [
            'sec_item1', 'rap system info', 'sec_item213', 'sec_ite44m4', 'sec_item5', 'sec_item6'
        ],
        title: 'TreeView12334',
        close: true//默认为关闭状态
    }
    itemStylesBG = [];
    itemStylesBGOut = [];
    itemStylesWord = [];
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
        this.hideTip();
        tree.addEventListener('webkitAnimationEnd', function (e) {
            self.idxAniEnd += 1;
            if (self.idxAniEnd === self.state.trees.length) {
                self.idxAniEnd = 1;
                if (self.state.close) {
                    self.showItem = false;
                    self.forceUpdate();
                }
            }
        })
    }

    showTip(e) {
        clearInterval(this.idxInterval);
        document.getElementById('treeTipContentDetail').innerHTML = this.state.trees[e.currentTarget.id];
        var tip = document.getElementById('treeTip');
        var tipContent = document.getElementById('treeTipContent');
        var rect = e.target.getBoundingClientRect();
        tip.className = 'info info-show';
        tip.style.top = Math.ceil(rect.top - rect.height + 4) + 'px';
        tip.style.left = '149px';
        // tipContent.style.overflow = 'hidden';
        // tipContent.style.animation = `treeItemShow 0.5s ease`;
        // tipContent.style.animationFillMode = 'forwards';
        this.idxInterval = setInterval(() => {

        }, 200)

        // console.log('showtip')
        // console.log(e.currentTarget,e.target.id)
        // console.log('showtipEnd')

        // var id = e.target.id;
    }

    hideTip() {
        clearInterval(this.idxInterval);
        this.idxInterval = setInterval(()=> {
            var tip = document.getElementById('treeTip');
            if (tip) {
                tip.className = 'info info-hide';
            }
        
        }, 100);
        // var tipContent = document.getElementById('treeTipContent');
        // tipContent.style.animation = `treeItemClose 0.1s ease`;
        // tipContent.style.animationFillMode = 'forwards';
    }

    getItems() {
        if (!this.showItem) {
            return <div/>;
        }
        var self = this;
        // console.log('getItems');
        return this.state.trees.map(function (item, index) {
            return (
                <div key={'treeitem' + index} style={{margin: "4px"}}>
                    <div id={index} className="treeItemBG hand" style={self.itemStylesBG[index]}
                         onMouseOver={self.showTip.bind(self)}
                         onMouseOut={self.hideTip.bind(self)}
                    >
                        <div style={{padding: "0 8px 0 8px"}} className="treeItemBGOut">
                            <div className="treeItem unselectable"
                                 style={self.itemStylesWord[index]}>{item}</div>
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
                    animation: `treeItemClose ${0.5 + 0.1 * i}s ease`,
                    animationFillMode: 'forwards'
                }
            }
            this.itemStylesBG[i] = style;
            this.itemStylesWord[i] = style;

        }
        this.itemStylesBGOut = [];
        this.idxAniEnd = 1;
        this.setState({close: !this.state.close});
    }

    render() {
        // console.log('render');style={{height:'0px'}}
        return (<div >

            <div className="treeTitle hand unselectable" onClick={this.clickMenu.bind(this)}>
                {this.state.title}
            </div>
            <div ref="tree" style={{margin: "4px 0 0 10px"}}>
                {this.getItems()}
            </div>
            <div id="treeTip" className="info info-hide">
                <div id="treeTipContent">
                    <div className="tip1"></div>
                    <div id='treeTipContentDetail' className="tip2">dsaddf</div>
                </div>
            </div>
            <div className="treeTitle hand unselectable" >
                choose
            </div>
        </div>)
    }
}
export default Tree3;
// ,float:'left'