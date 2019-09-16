import React, {Component} from 'react';
import { Card,Button,Icon ,Table} from 'antd';
 class Category extends Component {
    render() {
        //列的表头
        const columns = [
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



//列的具体数据
        const data = [
            {
                key: '1',
                name: 'John Brown',
            },
            {
                key: '2',
                name: 'Jim Green',
            },
            {
                key: '3',
                name: 'Joe Black',
            },
            {
                key: '4',
                name: 'Joe Black',
            },
        ];
        return  <Card title="分类列表" extra={<Button type="primary"> <Icon type="plus"/>分类列表</Button>}>
                <Table
                    columns={columns}
                    dataSource={data}
                    bordered
                    pagination={{

                        showQuickJumper:true,
                        showSizeChanger:true,
                        pageSizeOptions:['3', '6', '9', '12']

                        }}
                />
            </Card>;

    }

}
export default Category