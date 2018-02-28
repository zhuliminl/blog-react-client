import React from 'react';
import { connect } from 'react-redux';
import './style.css';


// 暂时把消息就定义为好消息 good 和 坏消息 bad 这两种
// 其中对于好的消息需要特意声明
// 坏的消息，直接 dispatch(flash({message: 'xxxx'})) 就可以了
//
const Alert = ({ ...props }) => {
    const { isOpen, alertType, message } = props;
    if(isOpen) {
        if(alertType === 'good') {
            return(
                <div className='alert_good'>
                    <h3>好消息</h3>
                    <p>{ message }</p>
                </div>
            );
        } else {
            return(
                <div className='alert_bad'>
                    <h3>坏消息</h3>
                    <p>{ message }</p>
                </div>
            );

        }
    } else {
        return null;
    }
}

 const mapStateToProps = (state) => ({
     isOpen: state.alert.isOpen,
     alertType: state.alert.alertType,
     message: state.alert.message,
 });

export default connect(mapStateToProps, null)(Alert);
