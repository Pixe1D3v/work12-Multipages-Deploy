const Carts = ({cartItems, setCartItems}) => {

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price || 0),
    0
  );

  return (
    <div
      className='w-100 h-auto d-flex flex-column justify-content-center align-items-center bg-white rounded-4 p-3'
      style={{ boxShadow: '0 5px 5px #cccccc' }}
    >
      {cartItems.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
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
        {cartItems.map((item) => {
          return (
            <div
              className='card p-2 d-flex flex-column justify-content-between align-items-center'
              style={{ height: '25rem' }}
            >
              <div className='card w-100 h-50'>
                <img
                  src={item.url}
                  className='card-img-top w-100 h-100 object-fit-cover'
                />
              </div>
              <div className='card-body text-center'>
                <h5
                  className='card-title'
                  style={{ overflow: 'hidden', height: '3rem' }}
                >
                  {item.title}
                </h5>
                <p className='card-text'>${item.price}</p>
                <button
                  className='btn btn-outline-danger'
                  onClick={() => removeItem(item.id)}
                >
                  Delete from Carts
                </button>
              </div>
            </div>
          );
        })}
      </div>
      )}
      <div className="text-center">
          <span>
            Products: <span className="badge bg-danger">{totalItems}</span> - Total Price: <span className="badge bg-success">${totalPrice.toFixed(2)}</span> <br />
            <span className="badge bg-warning text-black">Checkout<i class="bi bi-wallet ms-2"></i></span>
          </span>
      </div>
    </div>
  );
}

export default Carts;