import classes from './Checkout.module.css';
import { useRef, useState } from 'react';
const isEmpty = value => value.trim() ==="";
const isFiveChars = value => value.trim().length === 6;
const Checkout=(props)=>{
    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalCodeInputRef = useRef();
    const cityInputRef = useRef();
    const [formInputsValidity , setFormInputsValidity]=useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    });
    const confirmHandler=(event)=>{

        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredStreet = streetInputRef.current.value;
        const enteredPostalCode = postalCodeInputRef.current.value;
        const enteredCity = cityInputRef.current.value;

        const enteredNameIsValid = !isEmpty(enteredName);
        const enteredStreetIsValid = !isEmpty(enteredStreet);
        const enteredCityIsValid = !isEmpty(enteredCity);
        const enteredPostalCodeIsValid = isFiveChars(enteredPostalCode);

        setFormInputsValidity({
            name:enteredNameIsValid,
            street:enteredStreetIsValid,
            postalCode:enteredPostalCodeIsValid,
            city:enteredCityIsValid
        })

        const formIsValid = enteredNameIsValid && enteredPostalCodeIsValid && enteredStreetIsValid && enteredCityIsValid;
        if(!formIsValid){
            return;
        }
        props.onConfirm({
            name:enteredName,
            city:enteredCity,
            street:enteredStreet,
            postalCode:enteredPostalCode
        });
        

    }
    return <form className={classes.form} onSubmit={confirmHandler}>
        <div className={`${classes.control} ${formInputsValidity.name ? '' :classes.invalid}`}>
            <label htmlFor="name">Your Name</label>
            <input type='text' id='name' ref={nameInputRef}></input>
            {!formInputsValidity.name && <p>Enter the valid name !</p>}
        </div>
        
        <div className={`${classes.control} ${formInputsValidity.street ? '' :classes.invalid}`}>
            <label htmlFor="street">street</label>
            <input type='text' id='street' ref={streetInputRef}></input>
            {!formInputsValidity.street && <p>Enter the valid street !</p>}
        </div>

        <div className={`${classes.control} ${formInputsValidity.postalCode ? '' :classes.invalid}`}>
            <label htmlFor="postal">Postal code</label>
            <input type='text' id='postal' ref={postalCodeInputRef}></input>
            {!formInputsValidity.postalCode && <p>Enter 6 digit postal code !</p>}
        </div>

        <div className={`${classes.control} ${formInputsValidity.city ? '' :classes.invalid}`}>
            <label htmlFor="city">City</label>
            <input type='text' id='city' ref={cityInputRef}></input>
            {!formInputsValidity.city && <p>Entered the valid city !</p>}
        </div>
        <div className={classes.actions}>
            <button type="button" onClick={props.onCancel}>Cancel</button>
            <button className={classes.submit}>Submit</button>
        </div>
    </form>
}
export default Checkout;