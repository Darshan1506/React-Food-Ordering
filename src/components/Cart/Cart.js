import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import React, { useContext , useState } from 'react';
import CartContext from '../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';
const Cart = props =>{
    const [isCheckout , setIsCheckout]= useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit , setDidSubmit] = useState(false);
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.totalAmount > 0;
    const cartItemRemoveHandler = id =>{
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = item=>{
        cartCtx.addItem(item);
    }
    
    const orderHandler= ()=>{
        setIsCheckout(true);
    }
    const submitOrderHandler =async(userData)=>{
        setIsSubmitting(true);
        await fetch('https://c-hook-default-rtdb.firebaseio.com/orders.json',{
            method:'POST',
            body:JSON.stringify({
                user:userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();

    };
    const CartItems = <ul className={classes['cart-items']}>{cartCtx.items.map((item)=><li>
        <CartItem
          key={item.id} 
          name={item.name} 
          amount={item.amount} 
          price={item.price} 
          onRemove={cartItemRemoveHandler.bind(null,item.id)}
          onAdd={cartItemAddHandler.bind(null,item)}
          />
    </li>)}</ul>



    const modalActions = <div className={classes.actions}>
    <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
    {hasItems &&  <button className={classes.button} onClick={orderHandler}>Order</button>}
   </div>

   const cartModalContent = 
   <React.Fragment>
       {CartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose}/>}
            {/* <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems &&  <button className={classes.button} onClick={orderHandler}>Order</button>}
            </div> */}
            {!isCheckout && modalActions}  
   </React.Fragment>
   const isSubmittingModalContent = <p>Sending Order Data....</p>
   const didSubmitModalContent= 
   <React.Fragment>
       <p>Succesfully sent the Order</p>
    <div className={classes.actions}>
       <button className={classes.button} onClick={props.onClose}>Close</button>
    </div>

    </React.Fragment>

    return (
        <Modal onClose={props.onClose}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && !isSubmitting&& didSubmitModalContent}
              
        </Modal> 
    )
}
export default Cart;