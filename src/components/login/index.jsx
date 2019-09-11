import React, {Component} from 'react'
import { Form, Icon, Input, Button } from 'antd';
import logo from './logo.png'
import './index.less'

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
        const name=rule.field==='username'? '用户名':'密码'
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
                    <Form>
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
const newLogin = Form.create()(Login);
export default newLogin