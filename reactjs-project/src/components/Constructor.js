import React, {useEffect} from 'react';
import './css/constructor.css'
import Message from './Constructor/Message'
import Mail from './Constructor/Mail'

class Constructor extends React.Component{
constructor(props){
    super(props);
    this.links_commands = this.FindFollowLinksCommands(this.props.bot);
    this.state = {
        bot: this.props.bot,
        start_commands: this.FindStartCommands()
    }

}

useEffect(){
    this.props.onChangeBot(this.state.bot);
}

Change = (bot) => {
    console.log(bot)
    this.links_commands = this.FindFollowLinksCommands(bot);
    this.setState({
        bot: bot,
        start_commands: this.FindStartCommands()
    });
}

SaveBot = () => {
    this.props.onChangeBot(this.state.bot)
}

FindFollowLinksCommands(bot){
    let commands = [];
        bot.commands.map((command) => {
            if (command !== null)
                if (command.link !== null){
                    command.link.map((link) => {
                        !commands.includes(link) && commands.push(link)
                    });
                }
        });
        
    return commands;
}

FindStartCommands(){
    return this.props.bot.commands.filter(cmd => cmd !== null && !this.links_commands.includes(cmd.id))
}


    render(){
        console.log(this.props.active_button)
        return(
            <div className="constructor-block">
                <div className='start-block'>
                    <p className='text-4'>Старт</p>
                </div>
                {this.state.start_commands.map((cmd) => (
                    this.state.bot.commands[this.state.bot.commands.findIndex(x => x.id === cmd.id)].type === "message" &&
                        <div key={cmd.id} className="bot-block">
                            <Message 
                                onChangeBot={this.Change} 
                                bot={this.state.bot} 
                                id={cmd.id} 
                                start_block={true} 
                                active_button={this.props.active_button}
                                prev_id={null}/>
                        </div>
                ))}
                {this.state.start_commands.map((cmd) => (
                    this.state.bot.commands[this.state.bot.commands.findIndex(x => x.id === cmd.id)].type === "mail" &&
                        <div key={cmd.id} className="bot-block">
                            <Mail 
                                onChangeBot={this.Change} 
                                bot={this.state.bot} 
                                id={cmd.id} 
                                start_block={true} 
                                active_button={this.props.active_button}
                                prev_id={null}/>
                        </div>
                ))}
            </div>
        );
    }
}

export default Constructor