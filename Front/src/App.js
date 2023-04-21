import React, {useState, useEffect} from 'react';
import './normalize.css'
import './components/css/style.css'
import FunctionsBlock from './components/FunctionsBlock'
import Constructor from './components/Constructor'
import BotList from './components/BotList'
import axios from 'axios'
import StartPage from './components/StartPage';
import Header from './components/Header'
import Settings from './components/Settings';
import StepsToConnect from './components/StepsToConnect';
import loadIcon from './components/img/loading-svgrepo-com.svg'
import './components/css/modal.css'


axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';
axios.defaults.withCredentials = true;

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      status: "start-page",
      id: "",
      bots: [
        {
        id: 0,
        name: "Яша",
        unique_name: "@Yashka_Nyashka",
        token: "1234898454521315",
        url: "http://alexey/csharp/constructor/",
        status: false,
        commands: [
          {
            id: 0,
            type: "message",
            call: [
              {
              id: 0,
              command_call: "/start"
              },
              {
                id: 1,
                command_call: "Привет"
              }
            ],
            link: [1, 8]
          },
          {
            id: 1,
            type: "message",
            call: [
              {
              id: 2,
              command_call: "/whatsup"
              },
              {
                id: 3,
                command_call: "Что нового?"
              }
            ],
            link: [6, 7]
          },/*
          {
            id: 2,
            type: "communication",
            call: [
              {
              id: 4,
              command_call: "/helpme"
              },
              {
                id: 5,
                command_call: "Не понимаю"
              }
            ],
            link: [null]
          },*/
          {
            id: 3,
            type: "mail",
            call: [],
            link: [4]
          },
          {
            id: 4,
            type: "message",
            call: [
              {
                id: 6,
                command_call: "/moreinfo"
              },
              {
                id: 7,
                command_call: "Подробнее"
              }
            ],
            link: []
          },
          {
            id: 5,
            type: "message",
            call: [
              {
              id: 8,
              command_call: "/whatsup"
              },
              {
                id: 9,
                command_call: "Что нового?"
              }
            ],
            link: []
          },
          {
            id: 6,
            type: "message",
            call: [
              {
              id: 8,
              command_call: "/whatsup"
              },
              {
                id: 9,
                command_call: "Что нового?"
              }
            ],
            link: []
          },
          {
            id: 7,
            type: "message",
            call: [
              {
              id: 8,
              command_call: "/whatsup"
              },
              {
                id: 9,
                command_call: "Что нового?"
              }
            ],
            link: []
          },
          {
            id: 8,
            type: "message",
            call: [
              {
              id: 8,
              command_call: "/whatsup"
              },
              {
                id: 9,
                command_call: "Что нового?"
              }
            ],
            link: []
          }
          
        ],
        mail_commands: [
          {
            id: 3,
            name: "Защита проектов",
            date: "2023-05-02 15:00",
            message: "Сегодня в Технопарке ИрНИТУ проходит защита проектов Академии IT 2-го потока",
            media: [
            {
              id: 0,
              file: ""
            }]
          }],
        message_commands: [
          {
            id: 0,
            name: "Приветствие",
            message: "Прошёл целый год, а все вы только похорошели",
            media: [
              {
                id: 1,
                file: ""
              }
            ]
          },
          {
            id: 1,
            name: "Дела",
            message: "Да вот, защищаем проект. Пол года то... Пол года сё... Вот и готово)",
            media: []
          },
          {
            id: 4,
            name: "Подробности о мероприятии",
            message: "Да вот, защищают проекты будущие специалисты IT сферы компании En+. Вон как их много...",
            media: []
          },
          {
            id: 5,
            name: "Дела",
            message: "Да вот, защищаем проект. Пол года то... Пол года сё... Вот и готово)",
            media: []
          },
          {
            id: 6,
            name: "Дела",
            message: "Да вот, защищаем проект. Пол года то... Пол года сё... Вот и готово)",
            media: []
          },
          {
            id: 7,
            name: "Дела",
            message: "Да вот, защищаем проект. Пол года то... Пол года сё... Вот и готово)",
            media: []
          },
          {
            id: 8,
            name: "Дела",
            message: "Да вот, защищаем проект. Пол года то... Пол года сё... Вот и готово)",
            media: []
          }],/*
        communication_commands: [
          {
            id: 2,
            name: "Связь с нами",
            user: ["@Antmolch", "@hzxto"]
          }],*/
        chats: [
          {
            id: 0,
            name: "@Antmolch",
          },
          {
            id: 1,
            name: "@hzxto",
          }]
        },
      
        {
          id: 1,
          name: "Гоша",
          unique_name: "@Gosha_Yosha",
          token: "12348ghrbr21315",
          url: "http://alexey/csharp/constructor/",
          status: true,
          commands: [null],
          mail_commands: [null],
          message_commands: [null],
          communication_commands: [null],
          chats: [
            {
              id: 0,
              name: "@Antmolch",
            },
            {
              id: 1,
              name: "@hzxto",
            }]
        }],
      active_func_button: "none",
      user: {
        name: '',
        email: '',
        token: ''
      },
      bot_name: '',
      isLoaded: false,
      error: ''
    }
    this.onChangeBot = this.onChangeBot.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onDeleteBot = this.onDeleteBot.bind(this);
  }

  getBots = () => {
    this.setState({
      isLoaded: true
    })
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/bots',
      data: {
        email: this.state.email
      }
    }).then((res) => {
      console.log(res)
      this.setState({
        isLoaded: false,
        bots: res.data
      })
    })
    .catch(err => {
      this.setState({
        isLoaded: false,
        error: 'Неправльный логин или пороль'
      })
    })
  }

  onChangeBot(id){
    this.setState({ 
      status: "constructor",
      id: id
    });
  }
  onChangeStatus(id){
    let numberBot = this.state.bots.findIndex(x => x.id === id);
    this.state.bots[numberBot].status = !this.state.bots[numberBot].status
  }
  onDeleteBot(id){
    console.log(this.state.bots);
    let newBots = this.state.bots;
    let numberBot = newBots.findIndex(x => x.id === id);
    //Обращение к бд для удаления бота
    delete newBots[numberBot];
    if(newBots !== [null])
      newBots = newBots.filter(bot => bot)
    else
      newBots = [null];
    //this.bots = this.bots.filter((bot) => bot.id !== id);
    this.setState({ 
      status: "bot-list",
      id: "",
      bots: [...newBots]
    });
  }

  onChangeButton = (status) => {
    this.setState({
      active_func_button: status
    });
  }

  userExit = () => {
    this.setState({
      status: "start-page",
      user: {
        name: '',
        email: '',
        token: ''
      }
    })
  }

  userSettings = () => {
    this.setState({
      status: "user-settings"
    })
  }
  
  userAuthorization = (em, name, pass) => {
    /*axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/login',
      data: {
        email: 'mail@mail.ru',
        password: 'examplepass'
      },
      config: {
        headers: { 'Access-Control-Allow-Headers': '*',
                    "Content-Type": "application/json" 
        }
      }

    }).then((res) => console.log(res.data))*/
    /*axios.post('http://127.0.0.1:8000/api/login', {
      params: {
        email: 'em',
        password: 'pass'
        },
      headers: {
          'Access-Control-Allow-Headers': '*',
          'Content-Type': 'application/json'
        }
      }
    ).catch(err => console.log(err))*/
    this.setState({
      status: "bot-list",
      user: {
        name: name,
        email: em
      }
    })
    this.getBots();
    console.log(this.state.bots)
  }

  ChangeBot = (bot) => {
    console.log(bot)
    this.setState({
      bot: bot
    })
  }

  ChangePage = (page) => {
    this.setState({
      status: page
    })
  }

  onCreateBot = (bot_name) => {
    this.setState({
      status: 'create-bot',
      bot_name: bot_name
    })
  }

  render(){
    console.log("render")
    console.log(this.state.status)
    console.log(this.state.active_func_button)
    console.log(this.state.user.token)
    if (this.state.status === "start-page"){
      return(
        <div className='app'>
          <StartPage userAuthorization={this.userAuthorization} />
        </div>
      );
    }else if (this.state.status === "constructor")
      return(
        <div className='app'>
          <Header 
            user={this.state.user} 
            page={this.state.status}
            onChangePage={this.ChangePage}
            />
          <div className="bot-constructor">
            <FunctionsBlock onChangeButton={this.onChangeButton} />
            <Constructor 
              onChangeBot={this.ChangeBot} 
              bot={this.state.bots[this.state.bots.findIndex(x => x.id === this.state.id)]} 
              active_button={this.state.active_func_button}/>
          </div>
        </div>
        
      )
    else if (this.state.status === "bot-list")
      return(
        <div className='app'>
          <Header 
            page={this.state.status}
            user={this.state.user}
            onExit={this.userExit}
            onUserSettings={this.userSettings}
            />
          <div className="bot-list-field">
            {this.state.isLoaded ? 
              <div className='load-bots'>
                <img src={loadIcon} alt='Loader' />
              </div> : 
              <BotList 
                  onDeleteBot={this.onDeleteBot} 
                  onChangeStatus={this.onChangeStatus} 
                  onClickBot={this.onChangeBot} 
                  onCreateBot={this.onCreateBot}
                  bots={this.state.bots}/>
            }
            
          </div> 
        </div>
        
      )
    else if (this.state.status === "user-settings")
        return(
          <div className='app'>
            <Header 
              page={this.state.status}
              user={this.state.user}
              onExit={this.userExit}
              onUserSettings={this.userSettings}
              onChangePage={this.ChangePage}
              />
            <Settings/>
          </div>
        )
      else if (this.state.status === "create-bot")
          return(
            <div className='app'>
            <Header 
              page={this.state.status}
              user={this.state.user}
              onChangePage={this.ChangePage}
              />
            <StepsToConnect/>
          </div>
          )
  }
}

export default App