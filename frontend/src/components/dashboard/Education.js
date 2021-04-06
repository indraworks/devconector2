import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
// import { connect } from 'react-redux';

export const Education = ({ education }) => {
  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className='hide-sm'>{edu.degree}</td>
      <td>
        <Moment format='YYYY/MM/DD'>{edu.from}</Moment> -{' '}
        {edu.to === null ? (
          'Now'
        ) : (
          <Moment format='YYYY/MM/DD'>{edu.to}</Moment>
        )}
      </td>

      <td>
        <button className='btn btn-danger'>Delete</button>
      </td>
    </tr>
  ));

  return (
    <Fragment>
      <h2 className='my-2'>Education Creadential</h2>
      <table className='table'>
        <thead>
          <tr>
            <th>School</th>
            <th className='hide-sm'>Degree</th>
            <th className='hide-sm'>Years</th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </Fragment>
  );
};

Education.propTypes = {
  education: PropTypes.array.isRequired,
};

// const mapStateToProps = (state) => ({});

export default Education;

/*
jadi gini props yg masuk yaitu dari parent :Dashboard  brupa experience berasal
dari profile.experience ---coba lihat di model kan bentuknya array utk experience dan
education
jadi experience yg masuk keaank expereicen adalah props yg bersii statae dari profile.experience
makanya pas di indouk kita taru  <Education experience={profile.experience} />


*/
