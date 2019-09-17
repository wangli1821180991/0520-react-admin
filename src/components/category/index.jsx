import React, {Component} from 'react';
import { Card,Button,Icon ,Table} from 'antd';
import {connect} from 'react-redux';
import {getCategories} from '@redux/action-creators';
import './index.less';
@connect(
    (state)=> ({categories:state.categories}),
    {getCategories}
    )
 class Category extends Component {
    columns = [
        {
            title: '品类名称',//表头的名字
            dataIndex: 'name',//要求唯一，否则报错，会显示数据对应key的value
            // render: text => <a>{text}</a>,
        },
        {
            title: '操作',
            // className: 'column-money',
            dataIndex: 'operation',
            render:()=> {
                return <div>
                    <Button type="link">修改分类</Button>
                    <Button type="link">删除分类</Button>
                </div>
            }
        },

    ];
    componentDidMount() {
        //发送请求，请求分类数据，更新redux状态
        this.props.getCategories();
    }

    render() {
        //列的表头
        // const columns = [
        //     {
        //         title: '品类名称',//表头的名字
        //         dataIndex: 'name',//要求唯一，否则报错，会显示数据对应key的value
        //         // render: text => <a>{text}</a>,
        //     },
        //     {
        //         title: '操作',
        //         // className: 'column-money',
        //         dataIndex: 'operation',
        //         render:()=> {
        //             return <div>
        //                 <Button type="link">修改分类</Button>
        //                 <Button type="link">删除分类</Button>
        //             </div>
        //         }
        //     },
        //
        // ];



//列的具体数据
//         const data = [
//             {
//                 key: '1',
//                 name: 'John Brown',
//             },
//             {
//                 key: '2',
//                 name: 'Jim Green',
//             },
//             {
//                 key: '3',
//                 name: 'Joe Black',
//             },
//             {
//                 key: '4',
//                 name: 'Joe Black',
//             },
//         ];
        const {categories}=this.props;
        return  <Card title="分类列表" extra={<Button type="primary"> <Icon type="plus"/>分类列表</Button>}>
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
            </Card>;

    }

}
export default Category