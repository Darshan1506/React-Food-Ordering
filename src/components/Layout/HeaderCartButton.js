import { useContext , useEffect , useState } from "react";
import CartContext from "../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
const HeaderCartButton = (props) =>{
    const [btnIsHighLighted , setBtnIsHighLighted] = useState(false);
    const cartctx =useContext(CartContext);
    const numberOfCartItems = cartctx.items.reduce((currNumber , item)=>{
        return currNumber + item.amount;
    },0);
    const btnClasses = `${classes.button} ${ btnIsHighLighted ? classes.bump : ''}`;
    const {items} = cartctx;
    useEffect(()=>{
        if(items.length === 0){
            return;
        }
        setBtnIsHighLighted(true);

       const timer = setTimeout(()=>{
            setBtnIsHighLighted(false);
        },300);

        return() =>{
            clearTimeout(timer);
        }
    },[items]);
    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={classes.icon}>
               <CartIcon/> 
            </span>
            <span>Your Cart</span>
            <span className={classes.badge}> {numberOfCartItems}</span>
        </button>
    )

}
export default HeaderCartButton;