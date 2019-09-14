import React, {Component} from 'react'
import { Form, Icon, Input, Button ,message} from 'antd';
// import axios from 'axios';
// import instance from '../../api'
import {reqLogin} from '../../api';
import withCheckLogin from '@conts/with-check-login';


import {connect} from 'react-redux';
import {saveUser} from '@redux/action-creators';
// import {saveUserser} from "../../redux/action-creators";

import logo from '@assets/images/logo.png';
import './index.less'
@withCheckLogin
@connect(
    null,
    {saveUser}
)

@Form.create()
class Login extends Component {

    /*
   * 自定义表单校验的方法
  * rule 包含表单项字段
   *value  表单项的值
   *callback
    * */
    validator = (rule, value, callback) => {
        // console.log(rule, value);
        const name=rule.field==='username'? '用户名':'密码';
        if (!value){
            return callback(`请输入${name}`);
        }
        if (value.length<3){
            return callback(`${name}密码长度必须得大于3位`);
        }
        if (value.length>13){
            return callback(`${name}密码长度必须得小于13位`);
        }
        const reg= /^[a-zA-Z0-9_]{3,13}$/;
        if (!reg.test(value)){
            return callback(`${name}密码只能包含英文，数字和下划线`);
        }
        //callback必须调用
        callback();
    };
/**
 * 登录的函数
 * */
    login=(e)=> {
        //禁止默认行为
        e.preventDefault();
        //校验表单
        this.props.form.validateFields((error,values)=> {
            /**
             * error 校验失败错误
             * 校验失败就是{}
             * 校验通过就是null
             * values所有表单项的值
             */
        if (!error){
            //校验通过
            // console.log(values);
            //获取表单项的值
            const {username,password} =values;
            //发送请求，请求登录

            // axios.post('/login',{username,password})
            //     .then(({data})=> {
            //         //请求成功
            //         //判断status的值，来决定是否登录成功
            //         if (data.status===0){
            //             //登录成功
            //             message.success('恭喜你登录成功');
            //             //保存用户数据 redux localStorage/sessionStorage
            //             this.props.saveUser(data.data);
            //
            //             //跳转/路由
            //             // return <Redirect to="/"/>
            //             this.props.history.replace('/')
            //         }else {
            //             //登录失败
            //             message.error(data.msg);
            //             //清空密码
            //             // this.props.form.resetFields(['password']);
            //         }
            //     })
            //     .catch((error)=> {
            //         //请求失败----登录失败
            //         message.error('未知的错误 请联系管理员····')
            //         //清空密码
            //         // this.props.form.resetFields(['password']);
            //     })
            //     .finally(()=> {
            //        //不管成功/还是都会失败
            //        //清空密码
            //         this.props.form.resetFields(['password']);
            //
            //     })

           reqLogin(username,password)
                .then((result)=> {
                    //登录成功
                    message.success('登录成功');
                    //保存用户数据
                    this.props.saveUser(result);
                    //跳转数据 / 路由
                    this.props.history.replace('/');
                })
                .catch(()=> {
                    //不管成功/还是失败都会触发
                    //清空密码
                    this.props.form.resetFields(['password'])
                })
        }
        })

    };

    render() {
        //getFieldDecorator 专门表单效验的方法
        const {getFieldDecorator} = this.props.form;
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo"/>
                    <h1>React项目：后台管理系统</h1>
                </header>
                <section className="login-section">
                    <h3>用户登录</h3>
                    <Form onSubmit={this.login}>
                        <Form.Item>{
                            getFieldDecorator(
                                'username',
                                {
                                    rules: [
                                        //只使用于简单的检验场景
                                        // {required: true, message: '请输入用户名'},
                                        // {min: 3, message: '用户名长度必须大于3位'},
                                        // {max: 13, message: '用户名长度必须小于13位'},
                                        // {pattern: /^[a-zA-Z0-9_]{3,13}$/, message: '用户只能包含英文，数字和下划线'},
                                        {validator: this.validator},
                                    ]
                                }
                            )(
                                <Input prefix={<Icon type="user"/>} placeholder="用户名"/>
                            )
                        }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator(
                                    'password',
                                    {
                                        rules: [
                                            {validator: this.validator},

                                        ]
                                    }
                                )(
                                    <Input prefix={<Icon type="lock"/>} placeholder="密码" type="password"/>
                                )
                            }

                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-btn">登录</Button>
                        </Form.Item>
                    </Form>
                </section>
            </div>
        )
    }

}

//Form.create是一个高阶组件
//目的：给login组件传递form属性
export default Login