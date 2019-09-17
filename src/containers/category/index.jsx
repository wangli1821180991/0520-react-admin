import React, {Component} from 'react';
import { Card,Button,Icon ,Table,Modal} from 'antd';
import {connect} from 'react-redux';
import {getCategories,addCategory,updateCategory} from '@redux/action-creators';

import AddCategoryForm from './add-category-form';
import UpdateCategoryForm from './update-category-form';
import './index.less';
@connect(
    (state)=> ({categories:state.categories}),
    {getCategories,addCategory,updateCategory}
    )
 class Category extends Component {
    state={
        isShowAddCategoryModal:false,
        isShowUpdateCategoryModal:false,
        category:{}
    };

    addCategoryForm=React.createRef();
    updateCategoryForm=React.createRef();
    columns = [
        {
            title: '品类名称',//表头的名字
            dataIndex: 'name',//要求唯一，否则报错，会显示数据对应key的value
            // render: text => <a>{text}</a>,
        },
        {
            title: '操作',
            // className: 'column-money',
            // dataIndex: 'operation',
            render:(category)=> {
                console.log(category.name);
                return <div>
                    <Button type="link" onClick={this.showUpdateCategoryModal(category)}>修改分类</Button>
                    <Button type="link">删除分类</Button>
                </div>
            }
        },

    ];
    showUpdateCategoryModal=(category)=> {
        return ()=> {
            this.setState({
                isShowUpdateCategoryModal:true,
                category
            })
        }

    };
    componentDidMount() {
        //发送请求，请求分类数据，更新redux状态
        this.props.getCategories();
    }
    switchModal=(key,value)=> {
    return ()=> {
        this.setState({
            [key]:value
        })
     }
    };
    addCategory=()=> {
        const form=this.addCategoryForm.current;
        //检验表单

        form.validateFields((err,values)=> {
      if (!err){
          //表单效验通过
          this.props.addCategory(this.state.category,values.categoryName);
          // 清空表单
          form.resetFields();

          //隐藏对话框
            this.setState({
                isShowAddCategoryModal:false
            })

      }
       })
    };

    updateCategory=()=> {
        const form=this.updateCategoryForm.current;
        //检验表单

        form.validateFields((err,values)=> {
            if (!err){
                //表单效验通过
                this.props.updateCategory(this.state.category._id,values.categoryName);
                // 清空表单
                form.resetFields();

                //隐藏对话框
                this.setState({
                    isShowUpdateCategoryModal:false
                })

            }
        })

    };
    hiddenUpdateCategoryModal=()=> {
       this.setState({
           isShowUpdateCategoryModal:false
       });
        //清空表单数据
    this.updateCategoryForm.current.resetFields();
    };
    render() {

        const {categories}=this.props;
        const {isShowAddCategoryModal,isShowUpdateCategoryModal,category}=this.state;

        return  <Card title="分类列表" extra={<Button type="primary" onClick={this.switchModal('isShowAddCategoryModal' ,true)}> <Icon type="plus"/>分类列表</Button>}>
                <Table
                    columns={this.columns}
                    dataSource={categories}
                    bordered
                    rowKey='_id'
                    pagination={{

                        showQuickJumper:true,
                        showSizeChanger:true,
                        pageSizeOptions:['3', '6', '9', '12'],
                        defaultPageSize:3
                        }}
                />
            <Modal
                visible={isShowAddCategoryModal}
                title="添加分类"
                onOk={this.addCategory}
                okText="确定"
                cancelText="取消"
                width={300}
                onCancel={this.switchModal('isShowAddCategoryModal' ,false)}
            >
                <AddCategoryForm ref={this.addCategoryForm}/>
            </Modal>
            <Modal
                visible={isShowUpdateCategoryModal}
                title="修改分类"
                onOk={this.updateCategory}
                okText="确定"
                cancelText="取消"
                width={300}
                onCancel={this.hiddenUpdateCategoryModal}
            >
                <UpdateCategoryForm ref={this.updateCategoryForm} categoryName={category.name}/>
            </Modal>
            </Card>;

    }

}
export default Category