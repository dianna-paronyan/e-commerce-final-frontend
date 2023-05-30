import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductSt, fetchProductById } from '../../features/products-slice';
import { useParams } from 'react-router-dom';
import { AppDispatch, RootState } from '../../app/store';


function Product ()  {
  const { id } = useParams<{id?: string}>();
  const dispatch:AppDispatch = useDispatch();
  const product = useSelector((state: RootState) =>
    state.products.products.find((p: ProductSt) => p.id === Number(id))
  );
console.log(product,'product');
  useEffect(() => {
    dispatch(fetchProductById(id));
  }, [dispatch, id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>Price: ${product.price}</p>
      <p>{product.description}</p>
      <div>
        <h2>Images:</h2>
        {product.Images.map((image) => (
          <img
            key={image.fileName}
            src={`http://localhost:5000/images/${image.fileName}`}
            alt={image.fileName}
            style={{ width: '200px' }}
          />
        ))}
      </div>
    </div>
  );
}

export default Product;
