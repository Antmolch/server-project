import React, { Component } from 'react';

import logo from './img/Vector.svg'
// import '../css/startPage.css'

import './css/modal.css'
class ModalRegistration extends Component {
    constructor(props) {
        super(props);
        this.state = {
          // showModal: false,
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
          error: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
    
      handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value });
      };
    
      handleSubmit = (event) => {
        event.preventDefault();
        // здесь можно добавить логику отправки формы на сервер
      };

      userRegistration = () => {
        this.props.onRegistration(this.state.name, this.state.email, '1212121');
      }

      render() {
        const { onClose } = this.props;
        return (
            <div className={this.props.showModal ? "modal active" : "modal"} onClick={()=> this.props.onCloseModal()}>
            <div className={this.props.showModal ? "modal__content active" : "modal__content"} onClick={e=>e.stopPropagation()}>
              <img src={logo} className='size__logo'/>
              <h3 style={{paddingLeft:'40px'}}>Создайте аккаунт</h3>
              <form onSubmit={this.handleSubmit} className='input__form'>
                
                  
                  <input
                    type="text"
                    name="name"
                    placeholder='Имя'
                    value={this.state.name}
                    className='label'
                    onChange={this.handleInputChange}
                  />
                
                  
                  <input
                    type="email"
                    name="email"
                    placeholder='Email'
                    className='label'
                    value={this.state.email}
                    onChange={this.handleInputChange}
                  />
                
                  
                  <input
                    type="password"
                    name="password"
                    placeholder='Пароль'
                    className='label'
                    value={this.state.password}
                    onChange={this.handleInputChange}
                  />
                
                  
                  <input
                    type="password"
                    name="confirmPassword"
                    className='label'
                    placeholder='Подтвердите пароль'
                    value={this.state.confirmPassword}
                    onChange={this.handleInputChange}
                  />
                
                <button type="submit" className='button' style={{fontSize: '20px', width: '80%'}} onClick={() => this.userRegistration()}>Зарегестрироваться</button>
                <br/>
                <br/>
                <p style={{display: 'flex',width: '340px',margin: '0px', textAlign: 'center', justifyContent: 'center', alignItems: 'center', color: 'red'}}>{this.state.error}</p>
                <p style={{display: 'flex',width: '340px',margin: '0px', justifyContent: 'space-between', alignItems: 'center'}}>Уже зарегестрированы? <p style={{cursor: 'pointer', color: 'orange'}} onClick={ ()=> this.props.onOpenModal()}>Войти</p></p>
              </form>
            </div>
          </div>
        );
      }
}


export default ModalRegistration;