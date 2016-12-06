import React, { Component } from 'react';
import ReactDOM from 'react-dom';
class Choose extends Component {
    render() {
        return (<div>
            <div onClick={this.clickMenu.bind(this)}>
                choose
            </div>
        </div>)
    }
}
export default Choose;