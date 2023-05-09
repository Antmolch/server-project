import React from 'react';
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

import writeCookie from './Session/WriteCookie';
import readCookie from './Session/readCookie';


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
        id: '0',
        name: "Яша",
        unique_name: "@Yashka_Nyashka",
        token: "1234898454521315",
        url: "http://alexey/csharp/constructor/",
        status: false,
        commands: [
          {
            id: '0',
            type: "message",
            call: [
              {
              id: '0',
              command_call: "/start"
              },
              {
                id: '1',
                command_call: "Привет"
              }
            ],
            link: ['1', '8']
          },
          {
            id: '1',
            type: "message",
            call: [
              {
              id: '2',
              command_call: "/whatsup"
              },
              {
                id: '3',
                command_call: "Что нового?"
              }
            ],
            link: ['6', '7']
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
            id: '3',
            type: "mail",
            call: [],
            link: ['4']
          },
          {
            id: '4',
            type: "message",
            call: [
              {
                id: '6',
                command_call: "/moreinfo"
              },
              {
                id: '7',
                command_call: "Подробнее"
              }
            ],
            link: []
          },
          {
            id: '5',
            type: "message",
            call: [
              {
              id: '8',
              command_call: "/whatsup"
              },
              {
                id: '9',
                command_call: "Что нового?"
              }
            ],
            link: []
          },
          {
            id: '6',
            type: "message",
            call: [
              {
              id: '8',
              command_call: "/whatsup"
              },
              {
                id: '9',
                command_call: "Что нового?"
              }
            ],
            link: []
          },
          {
            id: '7',
            type: "message",
            call: [
              {
              id: '8',
              command_call: "/whatsup"
              },
              {
                id: '9',
                command_call: "Что нового?"
              }
            ],
            link: []
          },
          {
            id: '8',
            type: "message",
            call: [
              {
              id: '8',
              command_call: "/whatsup"
              },
              {
                id: '9',
                command_call: "Что нового?"
              }
            ],
            link: []
          }
          
        ],
        mail_commands: [
          {
            id: '3',
            name: "Защита проектов",
            date: "2015-09-25T12:15",
            message: "Сегодня в Технопарке ИрНИТУ проходит защита проектов Академии IT 2-го потока",
            media: []
          }],
        message_commands: [
          {
            id: '0',
            name: "Приветствие",
            message: "Прошёл целый год, а все вы только похорошели",
            media: []
          },
          {
            id: '1',
            name: "Дела",
            message: "Да вот, защищаем проект. Пол года то... Пол года сё... Вот и готово)",
            media: []
          },
          {
            id: '4',
            name: "Подробности о мероприятии",
            message: "Да вот, защищают проекты будущие специалисты IT сферы компании En+. Вон как их много...",
            media: []
          },
          {
            id: '5',
            name: "Дела",
            message: "Да вот, защищаем проект. Пол года то... Пол года сё... Вот и готово)",
            media: []
          },
          {
            id: '6',
            name: "Дела",
            message: "Да вот, защищаем проект. Пол года то... Пол года сё... Вот и готово)",
            media: []
          },
          {
            id: '7',
            name: "Дела",
            message: "Да вот, защищаем проект. Пол года то... Пол года сё... Вот и готово)",
            media: []
          },
          {
            id: '8',
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
            id: '0',
            name: "@Antmolch",
          },
          {
            id: '1',
            name: "@hzxto",
          }]
        },
      
        {
          id: '1',
          name: "Гоша",
          unique_name: "@Gosha_Yosha",
          token: "12348ghrbr21315",
          url: "http://alexey/csharp/constructor/",
          status: true,
          commands: [],
          mail_commands: [],
          message_commands: [],
          communication_commands: [],
          chats: [
            {
              id: '0',
              name: "@Antmolch",
            },
            {
              id: '1',
              name: "@hzxto",
            }]
        }],
      active_func_button: "none",
      user: {
        name: '',
        email: '',
        id: ''
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
      method: 'get',
      url: 'http://127.0.0.1:8000/api/bot/all',
      headers: {
        "Authorization": readCookie('Authorization')
      }
    }).then((res) => {
      this.setState({
        isLoaded: false/*,
        bots: res.data*/
      })
    })
    .catch(err => {
      this.setState({
        isLoaded: false,
        status: "start-page",
        active_func_button: "none",
        user: {
          name: '',
          email: '',
          id: ''
        },
        bot_name: '',
        error: ''

      })
    })
  }

  sendBots = (bot_id, updateCommands, deleteCommands, addCommands) =>{
    this.setState({
      isLoaded: true
    })
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/api/bots/update',
      data: {
        bot_id: bot_id,
        updateCommands: updateCommands,
        deleteCommands: deleteCommands,
        addCommands: addCommands
      }
    }).then((res) => {
      this.setState({
        isLoaded: false
      })
    })
    .catch(err => {
      this.setState({
        isLoaded: false,
        error: 'Ошибка'
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
    let bots = this.state.bots;
    bots[numberBot].status = !this.state.bots[numberBot].status;
    this.setState({bots: bots})
  }
  onDeleteBot(id){
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
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/auth/token/logout',
      headers: {
        "Authorization": readCookie('Authorization')
      }
    })
    this.setState({
      status: "start-page",
      active_func_button: "none",
      user: {
        name: '',
        email: '',
        id: ''
      },
      bot_name: '',
      error: ''
    })
  }

  userSettings = () => {
    this.setState({
      status: "user-settings"
    })
  }
  
  userAuthorization = (name, token, id) => {
    writeCookie('Authorization', 'Token ' + token, 1);
    this.setState({
      status: "bot-list",
      user: {
        name: name,
        email: '',
        id: id
      }
    })
    this.getBots();
  }

  ChangeBot = (bot) => {
    let bots = this.state.bots;
    let bot_index = bots.findIndex(x => x.id === bot.id);

    let updateCommands = {
      commands: [],
      message_commands: [],
      mail_commands: []
    }

    let deleteCommands = {
      commands: [],
      message_commands: [],
      mail_commands: []
    }

    let addCommands = {
      commands: [],
      message_commands: [],
      mail_commands: []
    }

    /*Проверка изменений в объекте commands*/
    //Проверка на изменение команды или её добавление
    bot.commands.map((curr_cmd) => {
      let command_index = bots[bot_index].commands.findIndex(x => x.id === curr_cmd.id)
      if (command_index === -1){
        addCommands.commands.push(curr_cmd)
      }else if (bots[bot_index].commands[bots[bot_index].commands.findIndex(x => x.id === curr_cmd.id)] !== curr_cmd){
        updateCommands.commands.push(curr_cmd)
      }
    })

    //Проверка на удаление комманды
    bots[bot_index].commands.map((prev_cmd) => {
      let command_index = bot.commands.findIndex(x => x.id === prev_cmd.id).length
      if (command_index === -1)
        deleteCommands.commands.push(prev_cmd)
    })

    /*Проверка изменений в объекте mwssage_commands*/
    //Проверка на изменение команды или её добавление
    bot.message_commands.map((curr_cmd) => {
      let command_index = bots[bot_index].message_commands.findIndex(x => x.id === curr_cmd.id)
      if (command_index === -1){
        addCommands.message_commands.push(curr_cmd)
      }else if (bots[bot_index].message_commands[command_index] !== curr_cmd){
        updateCommands.message_commands.push(curr_cmd)
      }
    })

    //Проверка на удаление комманды
    bots[bot_index].message_commands.map((prev_cmd) => {
      let command_index = bot.message_commands.findIndex(x => x.id === prev_cmd.id)
      if (command_index === -1)
        deleteCommands.message_commands.push(prev_cmd)
    })

    /*Проверка изменений в объекте mail_commands*/
    //Проверка на изменение команды или её добавление
    bot.mail_commands.map((curr_cmd) => {
      let command_index = bots[bot_index].mail_commands.findIndex(x => x.id === curr_cmd.id)
      if (command_index === -1){
        addCommands.mail_commands.push(curr_cmd)
      }else if (bots[bot_index].mail_commands[command_index] !== curr_cmd){
        updateCommands.mail_commands.push(curr_cmd)
      }
    })

    //Проверка на удаление комманды
    bots[bot_index].mail_commands.map((prev_cmd) => {
      let command_index = bot.mail_commands.findIndex(x => x.id === prev_cmd.id)
      if (command_index === -1)
        deleteCommands.mail_commands.push(prev_cmd)
    })

    this.sendBots(bot.id, updateCommands, deleteCommands, addCommands);
    this.getBots();
    bots[bot_index] = bot;
    this.setState({
      bots: bots
    })
  }

  ChangePage = (page) => {
    this.setState({
      status: page
    })
  }

  onNewBot = (bot_name) => {
    this.setState({
      status: 'create-bot',
      bot_name: bot_name
    })
  }

  onCreateBot = (bots) => {
    this.setState({
      status: 'bot-list',
      bots: bots
    })
  }

  onSaveBot = (bot) => {
    
  }

  render(){
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
            {this.state.isLoaded ? 
              <div className='load-bots'>
                <img src={loadIcon} alt='Loader' />
              </div> : 
              <div className="bot-constructor">
                <FunctionsBlock onChangeButton={this.onChangeButton} />
                <Constructor 
                  isLoaded={this.state.isLoaded}
                  onChangeBot={this.ChangeBot} 
                  bot={JSON.parse(JSON.stringify(this.state.bots[this.state.bots.findIndex(x => x.id === this.state.id)]))} 
                  active_button={this.state.active_func_button}/>
              </div>
            }
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
                  onNewBot={this.onNewBot}
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
              onChangePage={this.ChangePage}/>
            <StepsToConnect bot_name={this.state.bot_name} user={this.state.user} onCreate={this.onCreateBot}/>
          </div>
          )
  }
}

export default App