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
              <p className='text-3'>Email</p>
              <input className='inputData text-3' placeholder='Email'/>
              <p className='text-3'>Логин</p>
              <input className='inputData text-3' placeholder='Логин'/>
              <p className='text-3'>Пароль</p>
              <input className='inputData text-3' placeholder='Пароль'/><br/>
              
            </form>
            <button className='button text-2'>Сохранить</button>
            
        </div>
    );
  }
}


export default Settings;