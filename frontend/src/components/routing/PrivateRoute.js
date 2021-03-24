import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//PrivateRoute function  yg dimasuki oleh component App.js ,state props yaitu:
//isAuthenticated dan loading yg ada di masing di component tsb
//passing sbgi parameter nah paremeternya banyak kan sebagai argemnt
//karena indiividue sendir2 maka kita packing utk compoent tsb jadi rest ...rest
//utk render itu adalah variable props yg masuk ke komponent ...rest
//...rest mewakili argument bnyak component yg disatukan dlm "sbuah array"
//utk masukin component yg propsnya !isAuthenticatde yg artinya isauthenticate default bernilai null
//dan loading bernailai false,
//kalau !isautjenticate  ini = false  dan !loading = true
//artinya kondisi dia lagi default harus reirect ke login

export const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => (
  <Route
    {...rest}
    render={props=>
      !isAuthenticated  && !loading? (
        <Redirect to='/login' />
      ) : ( <Component {...props} />
         
      )}
    
  />
);

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);

//beda rest dng  distract
//kalau rest dia adalah agrument parameter di tmpt passing parameter
//sebuah function

//https://scotch.io/bar-talk/javascripts-three-dots-spread-vs-rest-operators543

/*\
old scrip
<Route 
   {...rest}
   render={props =>!isAuthenticated && !loading?( 
       <Redirect to='login'/>
   ):(
     <Component {...props} />
   )}
  
  />


*/
