import React, { Component } from 'react';
import logo from './img/Vector.svg'
import './css/header.css'
import userIcon from './img/user-icon.svg'
import menuIcon from './img/Menu.svg'
import arrowIcon from './img/arrow.svg'

class Header extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
          isOpen: false
        };
    
        this.toggleDropdown = this.toggleDropdown.bind(this);
      }
    
      toggleDropdown() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

    
  render() {
    if(this.props.page === "start-page"){
      return(
        <header className='header-start'>
          <img src={logo}/>
          <div className='button-container'>
              <button className='button-log' onClick={() => this.props.onAuthorization()}>
                  Войти
              </button>
              <button className='button-reg' onClick={() => this.props.onRegistration()}>
                  Зарегестрироваться
              </button>
          </div>
      </header>
      );
    }else if (this.props.page === "constructor"){
      return (
        <header className='header'>
          <div style={{display: 'flex', height: 'auto', width: 'auto'}}>
            <img src={logo} className='logo'/>
            <img className='prev-page' src={arrowIcon} onClick={() => this.props.onChangePage('bot-list')}/>
            <p className='text-2-gray'>Конструктор</p>
          </div>
          <div className='button-container'>{/* контейнер с элементами в правой части шапки */}
            <img src={userIcon} className='userIcon'/>
            <p className='userName'>{this.props.user.email}</p>
            <button className='buttonList' onClick={this.toggleDropdown}>
              <img src={menuIcon} />
            </button>         
            {this.state.isOpen && (
              <div className='dropdown-container'>
                <ul>
                  <li>
                      <a href="#" onClick={this.props.onUserSettings()}>Настройки</a>
                  </li>
                  <li>
                      <a href='#' onClick={() => this.props.onExit()}>Выход</a>
                  </li>
                  
                </ul>
              </div>
            )}
          
          </div>
        </header>
      );
    }else if (this.props.page === "bot-list"){
      return (
        <header className='header'>
        <img src={logo} className='logo'/>
        <div className='button-container'>{/* контейнер с элементами в правой части шапки */}
          <img src={userIcon} className='userIcon'/>
          <p className='userName'>{this.props.user.email}</p>
          <button className='buttonList' onClick={this.toggleDropdown}>
            <img src={menuIcon} />
          </button>         
          {this.state.isOpen && (
            <div className='dropdown-container'>
              <ul>
                <li>
                    <a href="#" onClick={() => this.props.onUserSettings()}>Настройки</a>
                </li>
                <li>
                    <a href='#' onClick={() => this.props.onExit()}>Выход</a>
                </li>
                
              </ul>
            </div>
          )}
        
        </div>
      </header>
    );
    }else if (this.props.page === "user-settings"){
      return(
        <header className='header' style={{}}>
        <div style={{display: 'flex', height: 'auto', width: 'auto'}}>
          <img src={logo} className='logo'/>
          <img className='prev-page' src={arrowIcon} onClick={() => this.props.onChangePage('bot-list')}/>
          <p className='text-2-gray'>Настройка аккаунта</p>
        </div>
        <div className='button-container'>{/* контейнер с элементами в правой части шапки */}
          <img src={userIcon} className='userIcon'/>
          <p className='userName'>{this.props.user.email}</p>
          <button className='buttonList' onClick={this.toggleDropdown}>
            <img src={menuIcon} />
          </button>         
          {this.state.isOpen && (
            <div className='dropdown-container'>
              <ul>
                <li>
                    <a href="#" onClick={() => this.props.onUserSettings()}>Настройки</a>
                </li>
                <li>
                    <a href='#' onClick={() => this.props.onExit()}>Выход</a>
                </li>
                
              </ul>
            </div>
          )}
        
        </div>
      </header>
      )
    }
    
  }
}


export default Header;