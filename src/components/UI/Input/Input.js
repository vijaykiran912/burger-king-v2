import React from 'react';
import classes from './Input.css'

const input = (props) => {
    let inputElement = null;

    let classNameArray = [classes.InputElement];
    if(props.touched && props.invalid && props.shouldValidate){
        classNameArray.push(classes.Invalid)
    }

    const classNameArrayString = classNameArray.join(' ')

    switch (props.elementType) {
        case 'input':
            inputElement = <input className={classNameArrayString}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />
            break;
        case 'textarea':
            inputElement = <textarea className={classNameArrayString}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />
            break;
        case 'select':
            inputElement = <select className={classNameArrayString}
                value={props.value} onChange={props.changed}>
                {props.elementConfig.options.map(opt =>
                    (<option
                        key={opt.value}
                        value={opt.value}>{opt.displayValue}</option>))}
            </select>
            break;
        default:
            inputElement = <input className={classNameArrayString}
                {...props.elementConfig}
                value={props.value} onChange={props.changed} />
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;