import React, { Component } from 'react';
import { MdVerticalAlignTop } from 'react-icons/md';
import BackTopWrapper from './BackTopWrapper';
import { getScroll } from '../../helpers/utility';

class BackTop extends Component {
    state = {
        show: false,
        leader: 0,
    };
    componentDidMount() {
        const { visibilityHeight = 100 } = this.props;
        window.onscroll = () => {
            const scrollTop = getScroll().top;
            if (scrollTop > visibilityHeight) {
                this.setState({
                    show: true,
                    leader: scrollTop
                });
            } else {
                this.setState({
                    show: false,
                    leader: 0,
                });
            }
        }
    }

    handleBackTop = (e) => {
        const { time = 10 } = this.props;
        clearInterval(this.timer);
        const target = 0;
        var leader = this.state.leader;
        this.timer = setInterval(()=>{
            let stop = true;
            let step = (target - leader) / 10;
            step = step > 0 ? Math.ceil(step) : Math.floor(step);
            leader = leader + step;
            if (target != leader) {
                stop = false;
            }
            window.scrollTo(0, leader);
            if (stop) {
                clearInterval(this.timer);
            }
        }, time);
    }

    render() {
        return (
            <BackTopWrapper show={this.state.show} onClick={this.handleBackTop}>
                <MdVerticalAlignTop size={32} color="#FFFFFF"/>
            </BackTopWrapper>
        );
    }
}

export default BackTop;