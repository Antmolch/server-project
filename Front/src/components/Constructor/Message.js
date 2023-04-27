import React, {useState} from 'react';
import plusIcon from '../img/plus-svg.svg'
import plusBlackIcon from '../img/plus-svg-black.svg'
import exitIcon from '../img/exit.svg'
import '../css/message.css'
import Modal from '../Modal/Modal';
import CallList from './list-components/ReactLList';
import '../css/errors.css'

export function Message(props){
    var bot = props.bot;
    const start_block = props.start_block;
    const command_id = props.id;
    const message_index = bot.message_commands.findIndex(x => x.id === command_id);
    const command_index = bot.commands.findIndex(x => x.id === command_id);
    const last_id = bot.commands[bot.commands.length - 1].id;
    const active_button = props.active_button;
    

    const [modalActive, setModalActive] = useState(false);

    const FindCallCommand = (cmd_index) => {
        let calls = [];
        bot.commands[cmd_index].call.map((call) => {
            calls.push(call.command_call);
        })
        return calls;
    }

    const FindCallsOfBot = () => {
        let calls = [];
        bot.commands.map((cmd) => {
            cmd.call.map((call) => {
                calls.push(call.command_call)
            })
        })
        return calls;
    }

    const all_calls_bot = FindCallsOfBot();

    const FindMediaCommand = (msg_index) => {
        let medias = [];
        bot.message_commands[msg_index].media.map((media) =>{
            medias.push(media.file);
        })
        return medias;
    }
    const [name, setName] = useState(bot.message_commands[message_index].name);
    const [message, setMessage] = useState(bot.message_commands[message_index].message);
    const [call_commands, setCalls] = useState(FindCallCommand(command_index));
    const [new_call, setNewCalls] = useState('');
    const [media, setMedia] = useState(FindMediaCommand(message_index));


    const [new_call_error, setNewCallError] = useState('');

    const onChange = (bot) => {
        if(start_block)
            props.onChangeBot(bot);
        else
            props.onChange(bot)
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
        onChange(JSON.parse(JSON.stringify(bot)));
    }

    const onChangeCall = (orig_call, call) => {
        let calls = call_commands;
        calls[calls.findIndex(x => x === orig_call)] = call;
        setCalls(calls);
    }

    const onDeleteCall = (orig_call) => {
        let calls = call_commands;
        calls.splice(calls.findIndex(x => x === orig_call), 1)
        setCalls([...calls]);
    }

    const onAddCall = () => {
        let calls = call_commands;
        if (all_calls_bot.findIndex(x => x === new_call) >= 0 || call_commands.findIndex(x => x === new_call) >= 0){
            setNewCallError("Такая команда вызова уже используется");
        }else if (new_call !== ''){
            calls.push(new_call)
            setCalls([...calls])
            setNewCalls('')
            setNewCallError('')
        }
    }

    const changeData = () => {
        let save = true;
        call_commands.map((call) => {
            if (all_calls_bot.filter(x => x === call).length === 1 && 
                FindCallCommand(command_index).filter(x => x === call).length === 0 && 
                call_commands.filter(x => x === call).length >= 1){
                    setNewCallError("Команда \"" + call + "\" уже используется в этом боте")
                    save = false;
                }
            else if (call_commands.filter(x => x === call).length > 1){
                    setNewCallError("Команда \"" + call + "\" использутся больше одного раза");
                    save = false;
            }
        })
        if (save === true){
            bot.message_commands[message_index].name = name;
            bot.message_commands[message_index].message = message;
            bot.commands[command_index].call = CreateCallToChange();
            bot.message_commands[message_index].media = CreateMediaToChange();
            onChange(bot);
            setNewCallError('')
            setCalls(FindCallCommand(command_index))
        }
        
    }

    const CreateCallToChange = () => {
        let calls = [];
        let index = 0;
        call_commands.map((call) =>{
            calls.push({
                id: index,
                command_call: call
            });
            index++;
        })
        console.log(calls)
        return calls
    }

    const CreateMediaToChange = () => {
        let files = [];
        let index = 0;
        media.map((file) => {
            files.push({
                id: index,
                file: file
            });
            index++;
        })
        return files
    }

    return(
        //Блок сообщения
        <div className='block'> 
            <div className="message-block" onClick={() => { setModalActive(true);

                                                            setName(bot.message_commands[message_index].name);
                                                            setMessage(bot.message_commands[message_index].message);
                                                            setCalls(FindCallCommand(command_index));
                                                            setMedia(FindMediaCommand(message_index));
                                                            setNewCallError('');
                                                            }}>
                <div className="message-field">
                    <div>
                        {/*Имя блока + Удаление блока*/}
                        <p className='text-4'>{bot.message_commands[message_index].name}</p>
                        <div onClick={e => e.stopPropagation()}><a className='delete-block-button' onClick={() => onDeleteBlock()}><img src={exitIcon} alt="close"/></a></div>
                    </div>
                    
                    <div className='message-text'><p className='text-5-gray'>{bot.message_commands[message_index].message !== "" ? bot.message_commands[message_index].message : "Пустой блок"}</p></div>
                </div>
                <button onClick={e => e.stopPropagation()} className="add-message-button"><img src={plusIcon} alt="Добавить" onClick={() => addBlock()}/></button>
            </div>
            <div className='inline-bot-block'>
                {bot.commands[command_index].link.map((id) => (
                        bot.commands[bot.commands.findIndex(x => x.id === id)].type === "message" &&
                            <div key={id} className="bot-block">
                                <Message 
                                    onChange={onChange} 
                                    bot={bot} 
                                    id={id} 
                                    start_block={false} 
                                    active_button={props.active_button}
                                    prev_id={command_id}/>
                            </div>
                    ))}
            </div>

        {/*Окно настройки блока*/}
            <Modal
                active={modalActive} 
                setActive={setModalActive}>
                <div className='modal-head'>
                    <p className='text-2'>Сообщение</p> 
                    <a onClick={() => {
                        setName(bot.message_commands[message_index].name);
                        setMessage(bot.message_commands[message_index].message);
                        setCalls(FindCallCommand(command_index));
                        setMedia(FindMediaCommand(message_index));
                        setNewCallError('');
                        setModalActive(false);
                    }}><img src={exitIcon} alt='Закрыть'/></a>
                </div>
                <hr/>
                <form className='modal-form text-3'>
                    <label htmlFor='name'>Название команды</label>
                    <input 
                        className='text-4' 
                        type='text' 
                        id='name' 
                        placeholder='Введите название команды' 
                        onChange={e => {setName(e.target.value)}}
                        value={name}
                        />
                    <label htmlFor='message'>Сообщение</label>
                    <textarea 
                        className='message-area text-4' 
                        type='text' 
                        id='message' 
                        placeholder='Введите сообщение' 
                        onChange={e => setMessage(e.target.value)}
                        value={message}
                        />
                    
                    <label htmlFor='call'><p style={{marginTop: '0px', marginBottom: '3px'}}>Команды вызова</p></label>
                        {modalActive && FindCallCommand(command_index).map((call) => (
                            <div className='call-commands' key={call}>
                                {console.log(call)}
                                {console.log(call_commands)}
                                <CallList call_command={call} onChangeCall={onChangeCall} onDeleteCall={onDeleteCall}/>
                            </div>
                        ))}
                    <div className='add-call-commands text-4'>
                        <input 
                            type='text' 
                            id='call' 
                            placeholder='Введите команду вызова'
                            value={new_call}
                            onChange={e => setNewCalls(e.target.value)}
                            />
                        <div className='add-call'>
                            <img src={plusBlackIcon} onClick={() => onAddCall()} alt='Добавить'/>
                        </div>
                    </div>
                    <div className='error-message text-5'><p style={{color: "red"}}>{new_call_error}</p></div>
                    <input 
                        type='file' 
                        accept='image/*, video/*'></input>
                    <button onClick={() => changeData()}>Сохранить</button>
                </form>
            </Modal>
        </div>
    );
}

export default Message