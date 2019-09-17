import React, {Component} from 'react';
import {Card,Icon,Input,Form,Select,InputNumber,Button} from 'antd';
import RichTextEditor from '../rich-text-editor';
const {Item}=Form;
const {Option}=Select;

@Form.create()
 class SaveUpdate extends Component {
    render() {
        const {getFieldDecorator}=this.props.form;
        return (
            <Card title={<div><Icon type="arrow-left"/><span>添加商品</span></div>}>
                <Form labelCol={{span:2}} wrapperCol={{span:8}}>
                    <Item label="商品名称">
                        {
                            getFieldDecorator(
                                "name",
                                {
                                    rules:[
                                        {required:true,message:'请输入商品名称'}
                                    ]
                                }
                            )(
                                <Input placeholder="请输入商品名称"/>
                            )
                        }

                    </Item>
                    <Item label="商品描述">
                        {
                            getFieldDecorator(
                                "desc",
                                {
                                    rules:[
                                        {required:true,message:'请输入商品描述'}
                                    ]
                                }
                            )(
                                <Input placeholder="请输入商品描述"/>
                            )
                        }

                    </Item>
                    <Item label="商品分类">
                        {
                            getFieldDecorator(
                                "categoryId",
                                {
                                    rules:[
                                        {required:true,message:'请输入商品分类'}
                                    ]
                                }
                            )(
                                <Select placeholder="请输入商品分类">
                                    <Option key={1} value={1}>qqq</Option>
                                </Select>
                            )
                        }

                    </Item>
                    <Item label="商品价格">
                        {
                            getFieldDecorator(
                                "price",
                                {
                                    rules:[
                                        {required:true,message:'请输入商品价格'}
                                    ]
                                }
                            )(
                                <InputNumber
                                    formatter={value => `￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                    parser={value => value.replace(/￥\s?|(,*)/g, '')}
                                    style={{width:150}}
                                />
                            )
                        }

                    </Item>
                    <Item>
                        <Button type="primary" htmlType="submit">提交</Button>
                    </Item>
                    <Item label="商品详情" wrapperCol={{span:20}}>
                        <RichTextEditor/>
                    </Item>

                </Form>
            </Card>
        )
    }

}
export default SaveUpdate