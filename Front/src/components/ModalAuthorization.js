import React, { Component } from 'react';
import axios from 'axios'

import loadIcon from './img/loading-svgrepo-com.svg'
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
          isLoaded: false,
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
        console.log(this.state);
      };

      userAuthorization = () => {
        this.setState({isLoaded: true});
        console.log(this.state.isLoaded)
        axios({
          method: 'post',
          url: 'http://127.0.0.1:8000/api/login',
          data: {
            email: this.state.email,
            password: this.state.password
          }
        }).then((res) => {
          this.setState({
            isLoaded: false
          })
          console.log(this.state.isLoaded)
          this.props.onAuthorization(res.email, res.password)

          console.log(res.data)
        })
        .catch(err => {
          this.setState({
            isLoaded: false,
            error: 'Неправльный логин или пороль'
          })
          console.log(err.response.data.email[0])
        })
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
                <p style={{display: 'flex',width: '340px', height: '30px', margin: '0px', marginBottom: '10px', justifyContent: 'center', alignItems: 'center', color: 'red'}}>{this.state.error}</p>
                <button type="submit" className='button' style={{fontSize: '20px', width: '80%'}}  onClick={() => this.userAuthorization()}>Войти</button>
                <br/>
                <br/>
                <div style={{display: 'flex',width: '340px',margin: '0px', justifyContent: 'space-between', alignItems: 'center'}}><p>Нет аккаунта?</p><p style={{cursor: 'pointer', color: 'orange'}} onClick={ ()=> this.props.onOpenModal()}>Зарегестрируйтесь</p></div>
              </form>
            </div>
            {this.state.isLoaded &&
              <div className={this.state.isLoaded ? "modal_loaded active" : "modal_loaded"}>
                <div className='loader'>
                  <img src={loadIcon} alt='Loader'/>
                </div>
              </div>
            }
          </div>
        );
      }
}


export default ModalAuthorization;