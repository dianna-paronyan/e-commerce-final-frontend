import { useDispatch, useSelector } from "react-redux";
import { getOrders, orderById } from "../../features/order-slice";
import { AppDispatch } from "../../app/store";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Ordered.scss";


function Ordered() {
  const orders = useSelector(getOrders);
  const dispatch: AppDispatch = useDispatch();
  const { cartId } = useParams<{ cartId?: string }>();
  console.log(orders,'ord');

  useEffect(() => {
    if (cartId) {
      dispatch(orderById(cartId));
    }
  }, [dispatch, cartId]);

  return (
<div className="container">
<>
        <h2 className="heading">Your Orders</h2>
        {!orders.length ? (
          <p className="no-orders">You don't have ordered products</p>
        ) : (
          orders.map((order) =>
            order.products.map((product) => (
              <div className="product-item" key={product.productId}>
                <img
                  src={`http://localhost:5000/images/${product?.Image?.fileName}`}
                  alt=""
                />
                <div className="desc">
                  <p className="name">{product.name}</p>
                  <p className="price">Price: {product.price}</p>
                  <p className="quantity">Quantity: {product.quantity}</p>
                </div>
              </div>
            ))
          )
        )}
      </>

</div>

  );
}

export default Ordered;
