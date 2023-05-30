import { useDispatch, useSelector } from "react-redux";
import {
  decrementQuantity,
  deleteCartItem,
  getCart,
  getCartItems,
  incrementQuantity,
} from "../features/cart-slice";
import { AppDispatch } from "../app/store";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../style.scss";

function Cart() {
  const data = useSelector(getCartItems);
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams<{ id?: string }>();

  const [del, setIsDel] = useState<boolean>(false);
  console.log(data, "cart");
  useEffect(() => {
    dispatch(getCart(id));
  }, [dispatch, id, del]);

  function deleteCart(id: number) {
    dispatch(deleteCartItem(id));
    setIsDel(!del);
  }

  function incremenet(id: number) {
    dispatch(incrementQuantity(id));
  }
  function decrement(id: number, quantity: number) {
    if (quantity < 1) {
      deleteCartItem(id);
    } else {
      dispatch(decrementQuantity(id));
    }
  }
  return (
    <>
      <h1>Cart</h1>
      <div className="grid">
        {data &&
          data?.map((cart) => (
            <article key={cart?.Product?.id}>
              {cart?.Product?.Image.map((image)=>(
                <img
                  src={`http://localhost:5000/images/${image?.fileName}`}
                  alt="Sample photo"
                  width="100"
                  height='90'
                  key={image.id}
                />
              ))}
              <div className="text">
                <h3>{cart?.Product?.name}</h3>
                <p>{cart?.Product?.description}</p>
              </div>
              <button
                onClick={() => decrement(cart?.productId, cart?.quantity)}
              >
                -
              </button>
              <span>{cart?.quantity}</span>
              <button onClick={() => incremenet(cart?.productId)}>+</button>
              <button onClick={() => deleteCart(cart?.productId)}>
                delete
              </button>
            </article>
          ))}
      </div>
    </>
  );
}

export default Cart;
