import React, { Component } from "react";

export default class Hider extends Component {
    state = {
        show: this.props.show 
    }
    toggle = () => {
        this.setState({ show: !this.state.show });
    }
    render() {
        return (
            <div>
                <button onClick={this.toggle}>{this.state.show ? 'hide' : 'show'}</button>
                <div>
                    {this.state.show
                        && this.props.children}
                </div>
            </div>
        );
    }
}
