import React, {Component} from 'react'
import withCheckLogin from '@conts/with-check-login';

@withCheckLogin

 class NotMatch extends Component {
    render() {
        return (
            <div>
                NotMatch
            </div>
        )
    }

}
export default NotMatch