import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { allProducts, fetchProducts } from "../../features/products-slice";
import { AppDispatch } from "../../app/store";
import { Link } from "react-router-dom";
import { createCart } from "../../features/cart-slice";
import { decodeToken } from "react-jwt";
import "../../style.scss";

function Home() {
  const data = useSelector(allProducts);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  function addToCart(id: number) {
    const user = localStorage.getItem("user");
    if (user) {
      const decoded: any = decodeToken(JSON.parse(user)?.jwt);
      dispatch(createCart({ productId: id, userId: decoded.id }));
    }
  }

  console.log(data);
  return (
    <div>
      <h1>Home</h1>
      <div className="grid">
        {data ? data?.map((product) => (
          <article key={product.id}>
            <Link to={`product/${product.id}`}>
              <img
                src={`http://localhost:5000/images/${product?.Images[0]?.fileName}`}
                alt="Sample photo"
              />
            </Link>
            <div className="text">
              <h3>{product.name}</h3>
              <p>{product.description}.</p>
              <button onClick={() => addToCart(product.id)}>Add to Cart</button>
            </div>
          </article>
        )): <p></p> }
      </div>
    </div>
  );
}

export default Home;
