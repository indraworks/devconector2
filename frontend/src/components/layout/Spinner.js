import React, { Fragment } from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  //spinner component dimasukan ke dashboard
  //dan akan dimunculkan pada saat return /rendering
  //jika dan hanya jika loading = true dan profile===null ?<Spinner/> :
  //jika tidak maka munculkan profile<Fragment> </Fragment>
  return (
    <Fragment>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading....'
      />
    </Fragment>
  );
};

export default Spinner;
