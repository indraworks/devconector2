import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// import { connect } from 'react-redux';

export const Experience = ({ experience }) => {
  const experiences = experience.map((exp) => (
    <tr key={exp._id}>
      <td>{exp.company}</td>
      <td className='hide-sm'>{exp.title}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
        {exp.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{exp.to}</Moment>
        )}
      </td>

      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Experience Creadential</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>Company</th>
            <th className='hide-sm'>Title</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>{experiences}</tbody>
      </table>
    </Fragment>
  );
};

Experience.propTypes = {
  experience: PropTypes.array.isRequired,
};

// const mapStateToProps = (state) => ({});

export default Experience;

/*
jadi gini props yg masuk yaitu dari parent :Dashboard  brupa experience berasal
dari profile.experience ---coba lihat di model kan bentuknya array utk experience dan
education
jadi experience yg masuk keaank expereicen adalah props yg bersii statae dari profile.experience
makanya pas di indouk kita taru  <Experience experience={profile.experience} />


*/
