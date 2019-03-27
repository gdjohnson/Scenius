import React from 'react';
import { Route } from 'react-router-dom';
import Header from './header/header';

const Application = () => {
    return(
        <div>
            <Route path="/" component={Header}/>
                {/* <Route exact path="/" component={Home}/>
            <Route path="/" component={Footer}/> */}
        </div>
    )
}

export default Application;