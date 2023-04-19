import React, { Component } from 'react';

import './css/settings.css'

class Settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clickSettings: false
    };

  }

    
  render() {
    return (
        <div className='settings'>
            
            
            
            
            {/* <div className='block'>
                <input formMethod='Post' className='input' placeholder='Email'/>
            </div>
            <h1>Имя</h1>
            <div className='block'>
                <input formMethod='Post' className='input' placeholder='Имя'/>
            </div> */}
            <form className='inputForm'>
              <p>Email</p>
              <input className='inputData' placeholder='Email'/>
              <p>Логин</p>
              <input className='inputData' placeholder='Логин'/>
              <p>Пароль</p>
              <input className='inputData' placeholder='Пароль'/><br/>
              
            </form>
            <button className='button'>Сохранить</button>
            
        </div>
    );
  }
}


export default Settings;