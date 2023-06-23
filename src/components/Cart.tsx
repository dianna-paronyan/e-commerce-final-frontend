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
import { Link, useNavigate } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { createPaymentIntent } from "../features/order-slice";
import { Product } from "../features/order-slice";
import { nanoid } from "@reduxjs/toolkit";
import useLocalStorage from "../hooks/useLocalStorage";
import "./Cart.scss";


function Cart() {
  const data = useSelector(getCartItems);
  const dispatch: AppDispatch = useDispatch();
  const { decoded } = useLocalStorage();
  const [del, setIsDel] = useState<boolean>(false);
  const navigate = useNavigate();

  const total = data?.reduce(
    (acc, el) => acc + el.Product?.price * el.quantity,
    0
  );

  useEffect(() => {
    if (decoded?.id) {
      dispatch(getCart(decoded?.id.toString()));
    }
  }, [dispatch, decoded?.id, del]);

  function deleteCart(id: number) {
    setIsDel(!del);
    dispatch(deleteCartItem(id));
  }

  function increment(id: number) {
    dispatch(incrementQuantity(id));
  }

  function decrement(id: number, quantity: number) {
    if (quantity < 1) {
      dispatch(deleteCartItem(id));
    } else {
      dispatch(decrementQuantity(id));
    }
  }

  const handleToken = (token: any) => {
    const products: Product[] = data?.map((cart) => ({
      productId: cart.productId,
      name: cart.Product?.name || "",
      price: cart.Product?.price || 0,
      quantity: cart.quantity,
      Image: cart.Product.Image[0],
    }));
    const cartId = data[0]?.cartId;
    dispatch(createPaymentIntent({ token, cartId, products }));
    localStorage.setItem("cartId", String(cartId));

    navigate(`/ordered/${cartId}`);
  };

  useEffect(() => {
    if (decoded?.id) {
      dispatch(getCart(decoded?.id.toString()));
    }
  }, [dispatch, decoded?.id, del]);

  return (
    <>
      <h1>Cart</h1>
      {data?.length ? (
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((cart) => (
              <tr className="row" key={nanoid()}>
                <td className="desc">
                  <img
                    src={`http://localhost:5000/images/${cart?.Product?.Image[0].fileName}`}
                    alt="Sample photo"
                    width="100"
                    height="90"
                    key={cart.Product?.id}
                  />
                  <div className="text_btn_box">
                    <h5>{cart.Product?.name}</h5>
                    <p
                      className="delete_icon"
                      onClick={() => deleteCart(cart.productId)}
                    >
                      Remove
                    </p>
                  </div>
                </td>
                <td>
                  <button
                    className="btn"
                    onClick={() => decrement(cart.productId, cart.quantity)}
                  >
                    -
                  </button>
                  <span>{cart.quantity}</span>
                  <button
                    className="btn"
                    onClick={() => increment(cart.productId)}
                  >
                    +
                  </button>
                </td>
                <td>{cart.Product?.price} AMD</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="empty-cart">
          <p>You don't have items in the cart</p>
          <Link to="/products">Add product</Link>
        </div>
      )}

      {total ? (
        <div className="amount">
          <p className="">Estimated Total is {total} AMD</p>
          <StripeCheckout
            name="Order"
            billingAddress
            token={handleToken}
            stripeKey={`pk_test_51NESNmFUKEekR5Ddklo7hJ1MUZnroodCNt0wlqlye1HKQ6xIiKgW1TBcdu0FR7bVfn1onbSsOCCVcyZVvrBs6OLC00vez4XVih`}
            amount={(total / 400)*100}
          />
        </div>
      ) : null}
    </>
  );
}

export default Cart;
