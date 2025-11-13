import { useEffect, useRef, useState } from 'react';
import { fetchTodos } from '../data/todos';
import { Badge, Button, Form, Table, Modal } from 'react-bootstrap';

const Todos = () => {
  const newTitleRef = useRef();
  const newIdRef = useRef();

  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [curPage, setCurPage] = useState(1);
  const [numPages, setNumPages] = useState(3);

  //Handle Modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    setTodosRaw(fetchTodos());
  }, []);

  useEffect(() => {
    if (onlyWaiting) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWaiting]);

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage));
  }, [todos, itemsPerPage]);

  useEffect(() => {
    if (curPage > numPages) {
      setCurPage(numPages);
    } else {
      setCurPage(1);
    }
  }, [numPages]);

  const waitingClicked = (id) => {
    const foundTodo = todos.find((todo) => {
      return todo.id === id;
    });
    foundTodo.completed = true;

    setTodosRaw([...todosRaw]); //Force to be effect
  };

  const deleteClicked = (id) => {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  };

  const saveClicked = (id, title) => {
    if (title.trim() !== '') {
      setTodosRaw([
        ...todosRaw,
        {
          userId: 1,
          id,
          title,
          completed: false,
        },
      ]);
    }
    newTitleRef.current.value = ""
    newIdRef.current.value = ""

    handleClose();
  };

  return (
    <div
      className='w-100 h-auto d-flex flex-column justify-content-center align-items-center bg-white rounded-4 p-3'
      style={{ boxShadow: '0 5px 5px #cccccc' }}
    >
      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>ID:</Form.Label>
              <Form.Control
                value={
                  todosRaw.reduce(
                    (prev, todo) => (todo.id > prev ? todo.id : prev),
                    -1
                  ) + 1
                }
                autoFocus
                disabled
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
              <Form.Label>Title:</Form.Label>
              <Form.Control
                placeholder='new todo here..'
                autoFocus
                ref={newTitleRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleClose}>
            Close
          </Button>
          <Button
            variant='primary'
            onClick={() =>
              saveClicked(Number(newIdRef.current.value), newTitleRef.current.value)
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      {/* filter */}
      <Form className='w-100 mb-3'>
        <div className='d-flex justify-content-between align-items-center'>
          <div className='d-flex align-items-center'>
            <Form.Check
              type='switch'
              id='custom-switch'
              label='Show only'
              onChange={(e) => setOnlyWaiting(e.target.checked)}
            />
            &nbsp;
            <Button
              variant='warning'
              disabled
              style={{ opacity: 1, pointerEvents: 'none' }}
            >
              Waiting <i className='bi bi-clock ms-2'></i>
            </Button>
          </div>

          <Form.Select
            aria-label='Default select example'
            style={{ width: '10%' }}
            onChange={(e) => setItemsPerPage(parseInt(e.target.value))}
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </Form.Select>
        </div>
      </Form>

      {/* table */}
      <div className='w-100'>
        <Table striped bordered hover>
          <thead className='table-dark'>
            <tr>
              <th
                className='text-center align-content-center'
                style={{ width: '5rem' }}
              >
                ID
              </th>
              <th className='text-center align-content-center'>Title</th>
              <th
                className='text-end align-content-center'
                style={{ width: '12rem' }}
              >
                Completed &nbsp;
                <Button onClick={() => handleShow()}>+</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos
              .filter((todo, index) => {
                return (
                  index >= (curPage - 1) * itemsPerPage &&
                  index <= curPage * itemsPerPage - 1
                );
              })

              .map((todo) => {
                return (
                  <tr key={todo.id}>
                    <td className='text-center align-content-center fs-5'>
                      <Badge bg='secondary'>{todo.id}</Badge>
                    </td>
                    <td className='align-content-center'>{todo.title}</td>
                    <td className='d-flex align-items-center justify-content-end align-content-center'>
                      {todo.completed ? (
                        <Badge
                          bg='success'
                          className='fs-6 fw-normal py-2 px-3'
                        >
                          Done <i className='bi bi-check2 ms-2'></i>
                        </Badge>
                      ) : (
                        <Button
                          variant='warning'
                          onClick={() => waitingClicked(todo.id)}
                        >
                          Waiting <i className='bi bi-clock ms-2'></i>
                        </Button>
                      )}
                      <Button
                        className='ms-2'
                        variant='danger'
                        onClick={() => deleteClicked(todo.id)}
                      >
                        <i className='bi bi-trash'></i>
                      </Button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </Table>
      </div>

      {/* page control */}
      <div className='text-center'>
        <Button
          variant='outline-primary'
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant='outline-primary'
          onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
          disabled={curPage === 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        &nbsp;
        <Button
          variant='outline-primary'
          onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant='outline-primary'
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
      </div>
    </div>
  );
};

export default Todos;
