import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const initPage = 'home';

const Navbar = ({ pq, cartItems, setToken }) => {
  const homeRef = useRef();
  const calculatorRef = useRef();
  const animationRef = useRef();
  const componentsRef = useRef();
  const todosRef = useRef();
  const productsRef = useRef();
  const cartsRef = useRef();

  const [menu, setMenu] = useState('');

  useEffect(() => {
    setMenu(initPage);
  }, []);

  useEffect(() => {
    if (menu === 'calculator') calculatorRef.current.click();
    else if (menu === 'animation') animationRef.current.click();
    else if (menu === 'components') componentsRef.current.click();
    else if (menu === 'todos') todosRef.current.click();
    else if (menu === 'products') productsRef.current.click();
    else if (menu === 'carts') cartsRef.current.click();
    else homeRef.current.click();
  }, [menu]);

  return (
    <div className='d-flex justify-content-center align-items-center gap-2 bg-white py-3'>
      <Link to={'home'}>
        <Button
          variant={menu === 'home' ? 'primary' : 'outline-primary'}
          onClick={() => setMenu('home')}
          ref={homeRef}
        >
          Home
        </Button>
      </Link>
      <Link to={'calculator'}>
        <Button
          variant={menu === 'calculator' ? 'primary' : 'outline-primary'}
          onClick={() => setMenu('calculator')}
          ref={calculatorRef}
        >
          Calculator
        </Button>
      </Link>
      <Link to={'animation'}>
        <Button
          variant={menu === 'animation' ? 'primary' : 'outline-primary'}
          onClick={() => setMenu('animation')}
          ref={animationRef}
        >
          Animation
        </Button>
      </Link>
      <Link to={'components'}>
        <Button
          variant={menu === 'components' ? 'primary' : 'outline-primary'}
          onClick={() => setMenu('components')}
          ref={componentsRef}
        >
          Components
        </Button>
      </Link>
      <Link to={'todos'}>
        <Button
          variant={menu === 'todos' ? 'primary' : 'outline-primary'}
          onClick={() => setMenu('todos')}
          ref={todosRef}
        >
          Todos
        </Button>
      </Link>
      <Link to={'products'}>
        <Button
          variant={menu === 'products' ? 'primary' : 'outline-primary'}
          onClick={() => setMenu('products')}
          ref={productsRef}
        >
          Products ({pq})
        </Button>
      </Link>
      <Link to={'carts'}>
        <Button
          variant={menu === 'carts' ? 'primary' : 'outline-primary'}
          onClick={() => setMenu('carts')}
          ref={cartsRef}
          className='position-relative'
        >
          Carts
          {cartItems.length > 0 && (
            <span className='position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger'>
              {cartItems.length > 99 ? '99+' : cartItems.length}
            </span>
          )}
        </Button>
      </Link>
      <Button
        variant={menu === 'todos' ? 'danger' : 'outline-danger'}
        onClick={() => setToken('')}
        className='ms-2'
      >
        Log out
      </Button>
    </div>
  );
};

export default Navbar;
