import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

export const EducationScreen = ({
  education: { school, degree, fieldofstudy, to, from, description },
}) => (
  <div>
    <h3 className='test-dark'>{school}</h3>
    <p>
      <Moment format='YYYY-MM-DD'>{from}</Moment> -{' '}
      {!to ? 'Now' : <Moment format='YYYY-MM-DD'>{to}</Moment>}
    </p>

    <p>
      <strong>Degree</strong>
      {degree}
    </p>
    <p>
      <strong>Field Of Study</strong>
      {fieldofstudy}
    </p>
    <p>
      <strong>Description</strong>
      {description}
    </p>
  </div>
);

EducationScreen.propTypes = {
  education: PropTypes.array.isRequired,
};

export default EducationScreen;
