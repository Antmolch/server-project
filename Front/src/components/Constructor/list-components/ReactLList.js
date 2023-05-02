import React, { useEffect, useState } from "react";
import exitIcon from '../../img/exit.svg'

function CallList(props){
    const [call, setCall] = useState(props.call_command);
    var original_call = call;

    const onDelete = (orig_call) => {
        console.log("я вызываюсь")
        props.onDeleteCall(orig_call)
    }

    const onChange = (event) => {
        
        
        console.log("я вызываюсь")
        console.log(original_call)
        console.log(event.target.value)
        props.onChangeCall(original_call, event.target.value)
        original_call = event.target.value
        setCall(event.target.value)
    }

    return(
        <div className="call-commands" style={{width: '100%', height: '100%'}}>
            <input 
                className='text-4' 
                type='text' 
                id={call}
                onChange={e => onChange(e)}
                value={call}
                />
            <div className='delete-call' style={{cursor: 'pointer'}}>
                <img src={exitIcon} onClick={() => onDelete(original_call)} alt='Удалить'/>
            </div>
        </div>
    )
    
}

export default CallList