import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import { useContext } from 'react';
import CartContext from '../store/cart-context';
import CartItem from './CartItem';
const Cart = props =>{
    const cartItemRemoveHandler = id =>{
        cartCtx.removeItem(id);
    }
    const cartItemAddHandler = item=>{
        cartCtx.addItem(item);
    }
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.totalAmount > 0;
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

    return (
        <Modal onClose={props.onClose}>
            {CartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={classes.actions}>
                <button className={classes['button--alt']} onClick={props.onClose}>Close</button>
                {hasItems &&  <button className={classes.button}>Order</button>}
            </div>
        </Modal> 
    )
}
export default Cart;