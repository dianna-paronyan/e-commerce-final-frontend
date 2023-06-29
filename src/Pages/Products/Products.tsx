import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { allProducts, getProducts } from "../../features/products-slice";
import { createCart } from "../../features/cart-slice";
import useLocalStorage from "../../hooks/useLocalStorage";
import { AppDispatch, RootState } from "../../app/store";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import "../../style.scss";

function Products() {
  const dispatch: AppDispatch = useDispatch();
  const { decoded, userInStorage } = useLocalStorage();
  const [search, setSearch] = useState("");
  const products = useSelector(allProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const pages = useSelector((state: RootState) => state.products.totalPages);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProducts(currentPage));
  }, [dispatch, currentPage]);

  function paginate(i: number) {
    setCurrentPage(i);
  }

  function addToCart(id: number) {
    if (userInStorage && decoded?.id) {
      dispatch(createCart({ productId: id, userId: +decoded?.id }));
    } else {
      navigate("/login");
    }
  }

  function handleSearch(event: React.ChangeEvent<HTMLInputElement>) {
    setSearch(event.target.value);
  }

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="products-container">
      <div className="img-box"></div>
      <h1 style={{ marginTop: "50px", fontSize: "40px", fontWeight: "400" }}>
        NEW ARRIVALS
      </h1>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          margin: "20px 10px",
        }}
      >
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={handleSearch}
          style={{ width: "250px", height: "45px", padding: "10px" }}
        />
      </div>
      <div className="grid">
        {filteredProducts ? (
          filteredProducts.map((product) => (
            <article key={product.id} className="card">
              <Link to={`/product/${product.id}`}>
                <div className="image-box">
                  <img
                    src={`http://localhost:5000/images/${product?.Images[0]?.fileName}`}
                    alt="Sample photo"
                  />
                </div>
              </Link>
              <div className="text">
                <h3>{product.name}</h3>
                <p>{product.price}AMD</p>
                {product.quantity > 0 ? (
                  <button onClick={() => addToCart(product.id)}>
                    Add to Cart
                  </button>
                ) : (
                  <button style={{ backgroundColor: "#6E6E6E" }}>
                    Out of Stock
                  </button>
                )}
              </div>
            </article>
          ))
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className="pagination">
        {Array.from(Array(pages).keys()).map((el, i) => (
          <button key={i} onClick={() => paginate(el + 1)}>
            {el + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Products;
