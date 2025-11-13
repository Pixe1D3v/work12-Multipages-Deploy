import { useState } from 'react';
import Value from '../components/Value';
import Adder from '../components/Adder';
import Timer from '../components/Timer';
import Temperature from '../components/Temperature';

const Components = () => {
  
  const [value, setValue] = useState(0)

  return (
    <div className='w-100 h-100 d-flex flex-column align-items-center justify-content-center bg-white rounded-4 py-3' style={{boxShadow:'0 5px 5px #cccccc'}}>
      <h2 className='px-3 py-1 bg-primary text-white rounded-2'>React Components</h2>
      <div className='w-100 h-100 d-flex flex-column justify-content-center align-items-center'>

        <div className='w-75 h-100 d-flex justify-content-center align-items-start gap-3'>
          <div className='col-4 d-flex flex-column justify-content-center align-items-center'>
            <Value name={'COUNTER'} value={value} setValue={setValue} />
            <Timer />
          </div>
          <div className='h-100 col d-flex flex-column justify-content-center align-items-start'>
            <Adder />
          </div>
        </div>
        <div className='w-75 h-100 d-flex justify-content-center'>
          <Temperature />
        </div>

      </div>
    </div>
  )
}

export default Components;