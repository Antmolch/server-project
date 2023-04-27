import React from 'react';
import plusIcon from '../img/plus-svg.svg'
import exitIcon from '../img/exit.svg'
import Message from './Message'

export function Mail(props){
    var bot = props.bot;
    const command_id = props.id;
    const message_index = bot.mail_commands.findIndex(x => x.id === command_id);
    const command_index = bot.commands.findIndex(x => x.id === command_id);
    const last_id = bot.commands[bot.commands.length - 1].id;
    const active_button = props.active_button;
    
    const onChange = (bot) => {
        props.onChangeBot(bot);
    }

    
    const addBlock = () => {
        if (active_button === "none")
            console.log("Не выбран блок для добавления")
        else if (active_button === "mail")
            console.log("Нельзя добавлять рассылку в это место")
        else if (active_button === "message"){
            bot.commands[command_index].link.push(last_id + 1);
            bot.commands.push({
                id: last_id + 1,
                type: "message",
                call: [],
                link: []
            });
            bot.message_commands.push({
                id: last_id + 1,
                name: "Без имени",
                message: "",
                media: []
            })
            console.log("работаем")
            onChange(JSON.parse(JSON.stringify(bot)));
        }
        
    }

    
    const deleteBlock = (cmd_id) => {
        if (bot.commands[bot.commands.findIndex(x => x.id === cmd_id)].link[0] !== null){
            //удаление блоков по ссылкам
            bot.commands[bot.commands.findIndex(x => x.id === cmd_id)].link.map((id) => {
                bot = deleteBlock(id);
            });
        }
        if (bot.commands[bot.commands.findIndex(x => x.id === cmd_id)].type === "message")
            bot.message_commands = bot.message_commands.filter(x => x.id !== cmd_id);
        else if (bot.commands[bot.commands.findIndex(x => x.id === cmd_id)].type === "mail")
            bot.mail_commands = bot.mail_commands.filter(x => x.id !== cmd_id);
        bot.commands = bot.commands.filter(x => x.id !== cmd_id);
        return bot;
    }

    const onDeleteBlock = () => {
        if (props.prev_id !== null)
            //удаление ссылки на блок
            bot.commands[bot.commands.findIndex(x => x.id === props.prev_id)].link = bot.commands[bot.commands.findIndex(x => x.id === props.prev_id)].link.filter(x => x !== command_id);
        deleteBlock(command_id);
        onChange(bot);
    }
    
    return(
        <div className='block'>
        <div className="message-block">
            <div className="message-field">
                <div>
                    <p className='text-4'>{bot.mail_commands[message_index].name}</p>
                    <a className='delete-block-button' href='#' onClick={() => onDeleteBlock()}><img src={exitIcon}/></a>
                </div>
                <div className='message-text'><p className='text-5-gray'>{bot.mail_commands[message_index].message !== "" ? bot.mail_commands[message_index].message : "Пустой блок"}</p></div>
            </div>
            <button onClick={() => addBlock()} className="add-message-button"><img src={plusIcon} alt="Добавить"/></button>
        </div>
            <div className='inline-bot-block'>
                {bot.commands[command_index].link.map((id) => (
                        id !== null &&
                        bot.commands[bot.commands.findIndex(x => x.id === id)].type === "message" &&
                            <div key={id} className="bot-block">
                                <Message 
                                    onChangeBot={onChange} 
                                    bot={bot} 
                                    id={id} 
                                    start_block={true} 
                                    active_button={props.active_button}
                                    prev_id={command_id}/>
                            </div>
                    ))}
                {/* Код для блока подключения человека к чату
                {bot.commands[command_index].link.map((id) => (
                        id !== null &&
                        bot.commands[bot.commands.findIndex(x => x.id === id)].type === "communication" &&
                            
                            <div key={id} className="bot-block">
                                <Communication onChange={onChange} bot={bot} id={id} start_block={false} active_button={props.active_button}/>
                            </div>
                    ))}*/}
            </div>
        </div>
    );
}

export default Mail