import React, {Component} from 'react';
import {Button,Icon} from 'antd';
import screenfull from 'screenfull';
import './index.less';

class HeaderMain extends Component {
    state={
        isScreenFull:false
    };
    screenFull=()=> {
        if (screenfull.isEnabled){
            screenfull.toggle();

        }
    };
    change=()=> {
        this.setState({
            isScreenFull:!this.state.isScreenFull
        })
    };
    componentDidMount() {
        //绑定事件
        screenfull.on('change',this.change);
    }
    componentWillUnmount() {
        //解绑事件
        screenfull.off('change',this.change);
    }

    render() {
        const {isScreenFull}=this.state;
        return (
            <div className="header-main">
                <div className="header-main-top">
                    <Button size='small' onClick={this.screenFull}><Icon type={isScreenFull ? 'fullscreen-exit':'fullscreen'}/></Button>
                    <Button size='small' className="header-main-btn">English</Button>
                    <span>欢迎，xxx</span>
                    <Button type="link">退出</Button>
                </div>
                <div className="header-main-bottom">
                    <h3>首页</h3>
                    <span>2019-09-16 15:31:16</span>
                </div>
            </div>
        )
    }

}
export default HeaderMain;