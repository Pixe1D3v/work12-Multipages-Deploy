import { useEffect, useState } from 'react';
import { fetchProducts } from '../data/products';

const Products = ({setPq, cartItems, setCartItems}) => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    setProducts(fetchProducts());
  }, []);

  useEffect(() => {
    setPq(products.length)
  }, [products]);

  const addToCarts = (product) => {

    setCartItems((prev) => {
      if (prev.find((item) => item.id === product.id)) return prev;
      return [...prev, product];
    });
  }

  return (
    <div
      className='w-100 h-auto d-flex flex-column justify-content-center align-items-center bg-white rounded-4 p-3'
      style={{ boxShadow: '0 5px 5px #cccccc' }}
    >
      <div
        className='w-100 overflow-y-auto'
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr 1fr',
          gap: '2rem',
          height: '57.2vh',
          padding: '0 25rem',
        }}
      >
        {products.map((p) => {
          const isAdded = cartItems.some((item) => item.id === p.id);
          return (
            <div
              className='card p-2 d-flex flex-column justify-content-between align-items-center'
              style={{ height: '25rem' }}
            >
              <div className='card w-100 h-50'>
                <img
                  src={p.url}
                  className='card-img-top w-100 h-100 object-fit-cover'
                />
              </div>
              <div className='card-body text-center'>
                <h5
                  className='card-title'
                  style={{ overflow: 'hidden', height: '3rem' }}
                >
                  {p.title}
                </h5>
                <p className='card-text'>${p.price}</p>
                <button
                  className={
                    isAdded
                      ? 'btn btn-danger'
                      : 'btn btn-outline-primary'
                  }
                  onClick={() => addToCarts(p)}
                  disabled={isAdded}
                >
                  {isAdded ? 'Added to carts' : 'Add to carts'}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
