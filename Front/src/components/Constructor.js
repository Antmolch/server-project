import React from 'react';
import './css/constructor.css'
import Message from './Constructor/Message'
import Mail from './Constructor/Mail'
import plusIcon from './img/plus-svg.svg'
import saveIcon from './img/save.svg'
import backArrowActiveIcon from './img/back-arrow-active.svg'
import nextArrowActiveIcon from './img/next-arrow-active.svg'
import backArrowIcon from './img/back-arrow.svg'
import nextArrowIcon from './img/next-arrow.svg'

import { Guid } from 'js-guid';

class Constructor extends React.Component{
constructor(props){
    super(props);
    this.links_commands = this.FindFollowLinksCommands(props.bot);
    this.state = {
        bot: props.bot,
        start_commands: this.FindStartCommands(props.bot)
    }
}

Change = (bot) => {
    this.links_commands = this.FindFollowLinksCommands(bot);
    this.setState({
        bot: bot,
        start_commands: this.FindStartCommands(bot)
    });
}

addNewBlock = () => {
    let bot = JSON.parse(JSON.stringify(this.state.bot));
    if (this.props.active_button === "none")
        console.log("Не выбран блок для добавления")
    else if (this.props.active_button === "mail"){
        let guid = bot.id + Guid.newGuid()
        bot.commands.push({
            id: guid,
            type: "mail",
            call: [],
            link: []
        });
        bot.mail_commands.push({
            id: guid,
            name: "Без имени",
            date: '',
            message: "",
            media: []
        })
        this.setState({
            bot: bot,
            start_commands: this.FindStartCommands(bot)
        })
    }else if (this.props.active_button === "message"){
        let guid = bot.id + Guid.newGuid()
        bot.commands.push({
            id: guid,
            type: "message",
            call: [],
            link: []
        });
        bot.message_commands.push({
            id: guid,
            name: "Без имени",
            message: "",
            media: []
        })
        console.log("работаем")
        this.setState({
            bot: bot,
            start_commands: this.FindStartCommands(bot)
        })
    }
}

addStartBlock = () => {
    let bot = JSON.parse(JSON.stringify(this.state.bot));
    if (this.props.active_button === "none")
        console.log("Не выбран блок для добавления")
    else if (this.props.active_button === "mail"){
        console.log("Нельзя добавлять рассылку в это место")
    }else if (this.props.active_button === "message"){
        let guid = bot.id + Guid.newGuid()
        bot.commands.push({
            id: guid,
            type: "message",
            call: [{id: 0, command_call: "/start"}],
            link: []
        });
        bot.message_commands.push({
            id: guid,
            name: "Без имени",
            message: "",
            media: []
        })
        console.log("работаем")
        this.setState({
            bot: bot,
            start_commands: this.FindStartCommands(bot)
        })
    }
}

SaveBot = () => {
    this.props.onChangeBot(JSON.parse(JSON.stringify(this.state.bot)))
}

FindFollowLinksCommands(bot){
    let commands = [];
        bot.commands.map((command) => {
            if (command !== null && command.link !== null)
                command.link.map((link) => {
                    !commands.includes(link) && commands.push(link)
                });
        });
        
    return commands;
}

FindStartCommands(bot){
    return bot.commands.filter(cmd => cmd !== null && !this.links_commands.includes(cmd.id))
}

FindStartCommand(bot){
    let index = null;
    bot.commands.map((cmd) => {
        cmd.call.map((call) => {
            if (call.command_call === "/start"){
                index =  bot.commands.findIndex(x => x.id === cmd.id)
            }
        })
    })
    return index
}


    render(){
        return(
            <div className="constructor-block">
                <div className='start-block'>
                    <p className='text-3'>Старт</p>
                </div>
                {this.FindStartCommand(this.state.bot) !== null &&
                    <div key={this.state.bot.commands[this.FindStartCommand(this.state.bot)].id} className="bot-block">
                        {console.log(this.state.bot.commands[this.FindStartCommand(this.state.bot)].id)}
                        {console.log(this.state.bot)}
                        <Message 
                            onChangeBot={this.Change} 
                            bot={this.state.bot} 
                            id={this.state.bot.commands[this.FindStartCommand(this.state.bot)].id} 
                            start_block={true} 
                            active_button={this.props.active_button}
                            prev_id={null}/>
                    </div>
                }
                {this.FindStartCommand(this.state.bot) === null && 
                    <div className='add-block-field'>
                        <a href='#' title='Добавить'><img src={plusIcon} alt="Добавить" onClick={() => this.addStartBlock()}/></a>
                    </div>
                }
                {this.state.start_commands.map((cmd) => (
                    (this.FindStartCommand(this.state.bot) !== null &&
                        cmd.id !== this.state.bot.commands[this.FindStartCommand(this.state.bot)].id &&
                        this.state.bot.commands[this.state.bot.commands.findIndex(x => x.id === cmd.id)].type === "message") &&
                        <div key={cmd.id} className="bot-block">
                            <hr></hr>
                            <h2 className='text-2'>Начало нового блока</h2>
                            <Message 
                                onChangeBot={this.Change} 
                                bot={this.state.bot} 
                                id={cmd.id} 
                                start_block={true} 
                                active_button={this.props.active_button}
                                prev_id={null}/>
                        </div>
                    )
                )}
                {this.state.start_commands.map((cmd) => (
                    (this.FindStartCommand(this.state.bot) === null &&
                        this.state.bot.commands[this.state.bot.commands.findIndex(x => x.id === cmd.id)].type === "message") &&
                        <div key={cmd.id} className="bot-block">
                            <hr></hr>
                            <h2 className='text-2'>Начало нового блока</h2>
                            <Message 
                                onChangeBot={this.Change} 
                                bot={this.state.bot} 
                                id={cmd.id} 
                                start_block={true} 
                                active_button={this.props.active_button}
                                prev_id={null}/>
                        </div>
                    )
                )}
                <hr></hr>
                <h2 className='text-2'>Добавление нового блока</h2>
                <div className='add-block-field'>
                    <a href='#' title='Добавить'><img src={plusIcon} alt="Добавить" onClick={() => this.addNewBlock()}/></a>
                </div>
                {this.state.start_commands.map((cmd) => (
                    this.state.bot.commands[this.state.bot.commands.findIndex(x => x.id === cmd.id)].type === "mail" &&
                        <div key={cmd.id} className="bot-block">
                            <hr></hr>
                            <h2 className='text-2'>Рассылка</h2>
                            <Mail 
                                onChangeBot={this.Change} 
                                bot={this.state.bot} 
                                id={cmd.id} 
                                start_block={true} 
                                active_button={this.props.active_button}
                                prev_id={null}/>
                        </div>
                ))}
                <a href="#" onClick={() => this.SaveBot()} className='save-button text-2' title='Сохранить'>
                    <img src={saveIcon} alt='Сохранить'/>
                </a>
                <a href="#" onClick={() => this.SaveBot()} className='back-arrow text-2' title='Назад'>
                    <img src={backArrowIcon} alt='Сохранить'/>
                </a>
                <a href="#" onClick={() => this.SaveBot()} className='next-arrow text-2' title='Вперёд'>
                    <img src={nextArrowIcon} alt='Сохранить'/>
                </a>
            </div>
        );
    }
}

export default Constructor