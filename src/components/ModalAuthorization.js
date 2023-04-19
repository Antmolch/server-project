import React, { Component } from 'react';

import logo from './img/Vector.svg'

import './css/modal.css'
class ModalAuthorization extends Component {
    constructor(props) {
        super(props);
        this.state = {
        //   showModalAuthorization: false,
          name: '',
          email: '',
          password: '',
          confirmPassword: '',
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
        console.log(this.state);
      };

      userAuthorization = () => {
        this.props.onAuthorization(this.state.name, this.state.email, '1212121');
      }

      render() {
        const { onClose } = this.props;
        return (
            <div className={this.props.showModal ? "modal active" : "modal"} onClick={()=> this.props.onCloseModal()}>
            <div className={this.props.showModal ? "modal__content active" : "modal__content"} onClick={e=>e.stopPropagation()}>
              <img src={logo} className='size__logo'/>
              <h3 style={{paddingLeft:'40px'}}>Авторизуйтесь</h3>
              <form onSubmit={this.handleSubmit} className='input__form'>

                  
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
                {/* <button onClick={ ()=> this.props.onOpenModal()}>sfvd</button> */}
                
                <button type="submit" className='button' style={{fontSize: '20px', width: '80%'}}  onClick={() => this.userAuthorization()}>Войти</button>
                <br/>
                <br/>
                <p style={{display: 'flex',width: '340px',margin: '0px', justifyContent: 'space-between', alignItems: 'center'}}>Нет аккаунта? <p style={{cursor: 'pointer', color: 'orange'}} onClick={ ()=> this.props.onOpenModal()}>Зарегестрируйтесь</p></p>
              </form>
            </div>
          </div>
        );
      }
}


export default ModalAuthorization;