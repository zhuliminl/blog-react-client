import React from 'react';
import { CSSTransitionGroup } from 'react-transition-group' // ES6
import { connect } from 'react-redux';
import './style.css';


// 暂时把消息就定义为好消息 good 和 坏消息 bad 这两种
// 其中对于好的消息需要特意声明
// 坏的消息，直接 dispatch(flash({message: 'xxxx'})) 就可以了
              // transitionAppear={true}

const Alert = ({ ...props }) => {
    const { isOpen, alertType, message } = props;
    return (
        <div className='alert'>
            <CSSTransitionGroup
              transitionName="alert"
              transitionEnterTimeout={2000}
              transitionLeaveTimeout={2000}>
                {
                    isOpen
                        ? (alertType === 'good' ? <p className='alert__notice alert_good'>{ message }</p > : <p className='alert__notice alert_bad'>{ message }</p>)
                        : ''
                }
            </CSSTransitionGroup>
        </div>
    );
}


 const mapStateToProps = (state) => ({
     isOpen: state.alert.isOpen,
     alertType: state.alert.alertType,
     message: state.alert.message,
 });


export default connect(mapStateToProps, null)(Alert);

