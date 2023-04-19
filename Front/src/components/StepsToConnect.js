import React, { Component } from 'react';
import logo from './img/Vector.svg'
import './css/header.css'
import userIcon from './img/user-icon.svg'
import menuIcon from './img/Menu.svg'
import './css/steps-to-connect.css'
class StepsToConnect extends Component {

  render() {
    return (
        <div className='block-list'>
            
            
            <h2 className='text-2'>3 шага для подключения бота:</h2><br/>
            <div className='block text-3'>
                <p>1. Откройте аккаунт @botfather</p>
                <button>Открыть @botfather</button>
            </div>
            
            <div className='block text-3'>
                <p>2. Отправьте команду /newbot и следуйте указаниям</p>
                <button>Скопировать /newbot</button>
            </div>
            
            <div className='block-token text-3'>
                <p>3. Бот пришлет токен. Скопируйте его и вставьте его:</p>
                <div>
                    <input placeholder="Например 54656526165165" className='input'/>
                    <button>Подключить бота</button>
                </div>
            </div>
        </div>
    );
  }
}


export default StepsToConnect;