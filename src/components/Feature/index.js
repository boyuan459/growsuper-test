import React, { Component } from 'react';
import { Icon } from 'antd';

class Feature extends Component {
    render() {
        const { title, positive = true } = this.props;
        return (
            <span className="loan-feature">
                 <Icon type={positive ? "check-circle" : "close-circle"} theme="twoTone" twoToneColor={positive ? '#52c41a' : '#dc3545'} />{title}
            </span>
        );
    }
}

export default Feature;