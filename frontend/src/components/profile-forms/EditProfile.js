import React, { useState, Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile, getCurrProfile } from '../../actions/profile';
import { Link, withRouter } from 'react-router-dom';

const EditProfile = ({
  profile: { profile, loading },
  getCurrProfile,
  createProfile,
  history,
}) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData; //sluruh isi formData state yg udah brubah dimasukan ke createProfile action +history

  //mbuat statae pilihan utk social network yg diimputkan dan saling oposite togle
  const [displaySocialInputs, toggleSocialInputs] = useState(false);
  useEffect(() => {
    getCurrProfile();
    //utk setFormData diterangkan dibawah
    setFormData({
      company: loading || !profile.company ? '' : profile.company,
      website: loading || !profile.website ? '' : profile.website,
      location: loading || !profile.location ? '' : profile.location,
      status: loading || !profile.status ? '' : profile.status,
      skills: loading || !profile.skills ? '' : profile.skills,
      githubusername:
        loading || !profile.githubusername ? '' : profile.githubusername,
      bio: loading || !profile.bio ? '' : profile.bio,
      twitter: loading || !profile.twitter ? '' : profile.twitter,
      facebook: loading || !profile.facebook ? '' : profile.facebook,
      linkedin: loading || !profile.linkedin ? '' : profile.linkedin,
      youtube: loading || !profile.youtube ? '' : profile.youtube,
      instagram: loading || !profile.instagram ? '' : profile.instagram,
    });
    // eslint-disable-next-line
  }, [loading]); // jadi gini ini runing depend dari laoding sate berubah pas dia true
  //artinya lagi default maka di run

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history, true); //menuju action createProfile
    //kit amasukan true karena di createProfile edit=false ut defaultnya
    //nah kalau edit Profile maka edit = true alretnya nanti dia mesage profile terupdate]
  };

  return (
    <Fragment>
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea of where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            onChange={(e) => onChange(e)}
            value={website}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={(e) => onChange(e)}
            value={location}
          />
          <small className='form-text'>
            City & state suggested (eg. Boston, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            onChange={(e) => onChange(e)}
            value={skills}
          />
          <small className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            onChange={(e) => onChange(e)}
            value={githubusername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            onChange={(e) => onChange(e)}
            value={bio}
          ></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <div className='my-2'>
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type='button'
            className='btn btn-light'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                onChange={(e) => onChange(e)}
                value={twitter}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                onChange={(e) => onChange(e)}
                value={facebook}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                onChange={(e) => onChange(e)}
                value={youtube}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                onChange={(e) => onChange(e)}
                value={linkedin}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                onChange={(e) => onChange(e)}
                value={instagram}
              />
            </div>
          </Fragment>
        )}

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' to='/dashboard'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  getCurrProfile: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  profile: state.profileReducers,
});

export default connect(mapStateToProps, { createProfile, getCurrProfile })(
  withRouter(EditProfile)
);

/*
keterangan dipslaySoicalInput berupa toggle !not displaySocialInput nilai awal false
jadi jika true maka tampilkan 
kitabuat statenya 
const[displaySocialInput,toggleSocialInput] = useState(false); 

{displaySocialInput && <Fragment> { semua compoennt} </Fragment>} jika true di klik maka muncul
 jadi && artinya jika displaySocialInputValue = true maka smua compoent dlm kalang fragment
 ditampilkan.

*/

/*
with Router digunakan agar bisa push history!


*/

/* USER EFFECT SETFORM DATA KETERANGAN 
contoh:
company:loading||!profile.company?'' :profile.company
//artina jika loading true atau nilau profile compnay valuenya gak ada 
//maka isi kosong  '' TAPI jika ada vlauenya maka taruh valuenya profile.company 
//kedalam field company
//------------------------
tentang loading sprti kita ahu sblumnya kit alakuakan get current profile 
di jalankan dengan useEffect yg jalan tiap refrest dan dgn get current profile 
yaitu menvalidasi token dar user ,
nah kita melaukan dgn getCurretProfile ,
nah setelah dapat update maka tergantung user apakah dialakukan update atau tidak 
ha state akan terupdate dipersilahkan pada user initinya
setFormData mengecek keadaan state profile
yaitu : apakah component sdangloading ,loading bernilai true artinya kondisi lagi loading 
data dari server/proivder/store
atau apakah component terisi null atau tdak jika terisi nul maka isi component element dgn string kosong ''
namum jika ada nilainya maka isikan ke comnent tersbetu sesuai dgn nama componentnya 

:D jangan lupa setelahnya kita buat routenya protected
*/