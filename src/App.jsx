import React, { useState } from 'react';
// import { useContext } from 'react';
// import Store from './store/store';
import './App.css';
import Masking from './components/Masking';



const App = () => {
  const [masks, setMasks] = useState([]);
  const returnFormat = {
    x: 'xmin',
    height: 'xmax',
    y: 'ymin',
    width: 'ymax',
    dimentionX: 'dimentionX',
    dimentionY: 'dimentionY'
  }
  const onChangeMask = (e, i) => {
    console.log("onChange::", e, i)
    setMasks(e)
  }

  return (
      <Masking
        masks={masks}
        returnFormat={returnFormat}
        onChange={onChangeMask}
        currentId={1}
        ondeleteMask={()=>{}}
        enableMask={true}
        readOnly={false}
        src={"https://thumbs.dreamstime.com/z/big-lord-shiva-statue-bangalore-18811578.jpg"}
      />
  );
}

export default App;
