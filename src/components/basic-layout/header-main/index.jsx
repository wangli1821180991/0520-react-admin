import React, {Component} from 'react';
import {Button,Icon,Modal} from 'antd';
import screenfull from 'screenfull';
import {withTranslation,getI18n} from 'react-i18next';
import {connect} from 'react-redux';
import {removeUser} from '@redux/action-creators';
import './index.less';

@connect(
    (state)=> ({username:state.user.user.username}),
    {removeUser}
)
@withTranslation()
class HeaderMain extends Component {
    state={
        isScreenFull:false,
        isEnglish:getI18n().language==='en'
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
    changeLanguage=()=> {
        const isEnglish=!this.state.isEnglish;
        this.props.i18n.changeLanguage(isEnglish? 'en':'zh-CN');
        this.setState({
            isEnglish
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

    logout=()=> {
 //显示对话框
        Modal.confirm({
            title:'您确认要退出登录吗？',
            onOk:()=> {
                //点击确认按钮的回调函数

                this.props.removeUser();
            },
            // onCancel:()=> {}
            okText:'确认',
            cancelText:'取消'
        })

    };
    render() {
        const {isScreenFull,isEnglish}=this.state;
        const {username}=this.props;
        return (

            <div className="header-main">
                <div className="header-main-top">
                    <Button size='small' onClick={this.screenFull}><Icon type={isScreenFull ? 'fullscreen-exit':'fullscreen'}/></Button>
                    <Button size='small' className="header-main-btn" onClick={this.changeLanguage}>{ isEnglish ? '中文':'English'}</Button>
                    <span>欢迎，{username}</span>
                    <Button type="link" onClick={this.logout}>退出</Button>
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