import React, {Component, Suspense} from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom';
import {Spin} from 'antd'

import Login from '@conts/login';
import NotMatch from  '@comps/not-match';
import BasicLayout from '@comps/basic-layout';
import routes from "./config/routes";
// import Login from "./containers/login";
// import Login from './components/login';
// import Home from './components/home';

class App extends Component {
    render() {
        return <Suspense fallback={<Spin size="large"/>}>
        <Router>
         <Switch>
             <Route path='/login' component={Login} exact/>
             <BasicLayout>
                 <Switch>
                     {
                         routes.map((route, index) => {
                             return <Route{...route} key={index}/>
                         })
                     }
                     <Route component={NotMatch}/>
                 </Switch>
             </BasicLayout>
         </Switch>

        </Router>
        </Suspense>;

    }

}
export default App;