import React, { Component } from 'react';
import classnames from 'classnames';
import './App.css';
import { getScroll, getClient, getStyle } from './helpers/utility';
import BackTop from './components/BackTop';

const header = 68;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      light: false,
      menu: 'Home',
      scrolling: false,
    }
  }
  onScroll = () => {
    const scrollTop = getScroll().top;
    
    if (scrollTop > 68 && !this.state.light) {
      // console.log("change theme to light");
      this.setState({
        light: true
      })
    } else if (scrollTop <= 68 && this.state.light) {
      // console.log("change theme to dark");
      this.setState({
        light: false
      })
    }
    if (this.state.scrolling) {
      return;
    }
    if (scrollTop < this.state.schedule - header && this.state.menu !== 'Home') {
      this.setState({
        menu: 'Home'
      });
    } else if (scrollTop >= this.state.schedule - header && scrollTop < this.contact.offsetTop - header && this.state.menu !== 'Schedule') {
      this.setState({
        menu: 'Home Loans'
      });
    } else if (scrollTop >= this.contact.offsetTop - header && this.state.menu !== 'Contact') {
      this.setState({
        menu: 'Contact'
      })
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
    console.log(this.schedule.offsetTop);
    this.setState({
      home: this.banner.offsetTop,
      schedule: this.schedule.offsetTop,
    })
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading != prevProps.loading) {
      this.setState({
        home: this.banner.offsetTop,
        schedule: this.schedule.offsetTop,
        contact: this.contact.offsetTop
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  }

  tabChange = (key) => {

  }

  scrollTo = target => {
    this.setState({
      scrolling: true
    })
    clearInterval(this.timer);
    let current = getScroll().top;
    
    this.timer = setInterval(() => {
      let stop = true;
      let step = (target - current) / 10;
      step = step > 0 ? Math.ceil(step) : Math.floor(step);
      current = current + step;
      window.scrollTo(0, current);
      if (current != target) {
        stop = false;
      }
      if (stop) {
        clearInterval(this.timer);
        this.setState({
          scrolling: false
        })
      }
    }, 20);
  }

  handleMenuClick = (e, menu) => {
    e.preventDefault();
    console.log(menu);
    this.setState({
      menu
    })
    switch(menu) {
      case 'Home':
        // window.scrollTo(0, this.state.home);
        this.scrollTo(this.state.home);
        break;
      case 'Home Loans':
        // window.scrollTo(0, this.state.schedule-header);
        this.scrollTo(this.state.schedule-header);
        break;
      case 'Contact':
        // window.scrollTo(0, this.state.contact - header);
        this.scrollTo(this.contact.offsetTop - header);
        break;
      default:
        return;
    }
  }

  render() {
    const { light } = this.state;
    const width = getClient().width;
    return (
      <React.Fragment>
        <header className="ai-header">
          <div className={classnames("ai-header-container", { "dark-theme": !light }, { "light-theme": light })}>
            <nav className="navbar navbar-expand-lg navbar-light">
              <div className="container">
                <a className="navbar-brand ai-header-logo" href="#">Real Weather</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul className="navbar-nav ml-auto">
                    <li className={classnames("nav-item", {active: this.state.menu === 'Home'})}>
                      <a className="nav-link" href="#" onClick={(e) => this.handleMenuClick(e, 'Home')}>Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className={classnames("nav-item", { active: this.state.menu === 'Home Loans'})}>
                      <a className="nav-link" href="#" onClick={(e) => this.handleMenuClick(e, 'Home Loans')}>Weather</a>
                    </li>
                    <li className={classnames("nav-item", { active: this.state.menu === 'Contact'})}>
                      <a className="nav-link" href="#" onClick={(e) => this.handleMenuClick(e, 'Contact')}>Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </header>

        <section ref={banner => this.banner = banner} className="banner-section">
          <div className="container ai-overlay-inner">
            <div className="text-center">
            <h2 className="ai-color-white">Your Current Location</h2>
            <p><a href="">North Sydney</a></p>
            </div>
          </div>
        </section>

        <section ref={schedule => this.schedule = schedule} className="schedule-section">
          
        </section>

        <section ref={contact => this.contact = contact} className="contact-section">
          <div className="container">
            <div className="text-center">
              <h2 className="text-uppercase ai-color-white">Contact Me</h2>
              <p>Please feel free to contact Bo Yuan on any of the following ways. Thanks.</p>
            </div>
            <div className="contact-tools text-uppercase">
              <div>Email: byuan459@gmail.com</div>
              <div>Phone: 0478 052 010</div>
              <div>LinkedIn: <a href="https://www.linkedin.com/in/bo-yuan-514346112/">Bo Yuan</a></div>
            </div>
          </div>
        </section>
        <footer>
          <div></div>
        </footer>
        <BackTop time={10}/>
      </React.Fragment>
    );
  }
}

export default App;
