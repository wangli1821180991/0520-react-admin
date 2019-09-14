import React, {Component} from 'react'
import {Icon, Menu} from 'antd';
import {withRouter,Link} from 'react-router-dom';
import menus from '@config/menus';
const { SubMenu } = Menu;
@withRouter
 class LeftNav extends Component {
     createItem=(menu)=> {
         return  <Menu.Item key={menu.key}>
             <Link to={menu.key}>
                 <Icon type={menu.icon } />
                 <span>{menu.title}</span>
             </Link>
         </Menu.Item>
     }


     createMenu=()=>{
       return  menus.map((menu)=> {
             //判断 是否 是二级菜单
             if (menu.children){
                 //二级菜单
               return   <SubMenu
                   key={menu.key}
                   title={
                       <span>
                  <Icon type={menu.icon} />
                  <span>{menu.title}</span>
                </span>
                   }
               >
                   {
                       menu.children.map((cMenu)=> {
                           return  this.createItem(cMenu);
                       })
                   }
               </SubMenu>
             } else {
                 //一级菜单
                 return  this.createItem(menu);
             }
         })
     } ;
    findOpenKeys=(pathname)=> {
        //第一方法
     // let openKeys='';
     // menus.forEach((menu)=> {
     //     if (menu.children){
     //         menu.children.forEach((cMenu)=> {
     //             if (cMenu.key===pathname){
     //                 openKeys=menu.key
     //             }
     //         })
     //     }
     // })
     //    return openKeys;
        //第二方法
        for (var i = 0; i < menus.length; i++) {
            const menu=menus[i];
            if (menu.children){
                for (var j = 0; j < menu.children.length; j++) {

                    const cMenu=menu.children[j];
                    if (cMenu.key===pathname){
                        return menu.key
                    }
                }
            }

        }
    };

    render() {
        const {pathname}=this.props.location;
        const menus=this.createMenu();
        const openKeys=this.findOpenKeys(pathname)
        return (
            <Menu theme="dark" defaultSelectedKeys={[pathname]} defaultOpenKeys={[openKeys]} mode="inline">
                {
                    menus
                }



            </Menu>
        )
    }

}
export default LeftNav