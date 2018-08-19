import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import AccountForm from './AccountForm';
import AboutForm from './AboutForm';
import DetailsForm from './DetailsForm';
// import { uploadPic } from '../../adapter'
import TestModal from './TestModal'

const CLOUDINARY_UPLOAD_PRESET = 'vsicareb';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/pablopawpaw/upload';

class Auth extends React.Component {
  state = {
    username: '',
    password: '',
    login: false,
    uploadedFileCloudinaryUrl: null,
    location: '',
    age: 0,
    nationality: '',
    languages: '',
    introduction: '',
    hobbies: '',
    goals: '',
    accountForm: false,
    aboutForm: false,
    detailsForm: false,
  }

  componentDidMount() {
    if(window.location.pathname === '/login') {
      this.setState({login: true}, () => console.log(this.state))
    }
    if(window.location.pathname === '/signup') {
      this.setState({accountForm: true}, () => console.log(this.state))
      this.setState({aboutForm: false}, () => console.log(this.state))
      this.setState({detailsForm: false}, () => console.log(this.state))
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if(window.location.pathname === '/login' && this.state.login === false) {
      this.setState({login: true}, () => console.log(this.state))
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    e.persist()

    switch(e.target.id) {

      case 'accountForm':
        if(this.state.login) {
          if(this.state.username === '' || this.state.password === '') {
            alert('Kindly fill out all fields')
          } else {
            this.props.handleAuth({username: this.state.username, password: this.state.password})
          }

        } else {
          if(this.state.username === '' || this.state.password === '' || this.state.uploadedFileCloudinaryUrl === null) {
            alert('Kindly fill out all fields and upload a profile picture')
          } else {
           this.toggleFormStatus(e)
           this.setState({aboutForm: !this.state.aboutForm}, () => console.log(this.state))
          }
      }
        break

      case 'aboutForm':
        if(this.state.location === '' || this.state.age === 0 || this.state.nationality === '' || this.state.languages === '') {
           alert('Kindly fill out all fields')
         } else {
           this.toggleFormStatus(e)
           this.setState({detailsForm: !this.state.detailsForm}, () => console.log(this.state))
         }
        break

      case 'detailsForm':
        if(this.state.introduction === '' || this.state.hobbies === '' || this.state.goals === '') {
           alert('Kindly fill out all fields')
         } else {
           this.toggleFormStatus(e)
           console.log(this.state);

           const { username, password, location, age, nationality, languages, introduction, hobbies, goals } = this.state
           this.props.handleAuth({ username, password, location, age, nationality, languages, introduction, hobbies, goals, profile_picture: this.state.uploadedFileCloudinaryUrl })
         }
        break

      default:
        console.log('something is wrong!');
    }
  }

  toggleFormStatus = (e) => {
    this.setState({[e.target.id]: !this.state[e.target.id]}, () => console.log(this.state))
  }

  onImageDrop = (files) => {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({uploadedFileCloudinaryUrl: response.body.secure_url}, () => console.log(this.state));
      }
    });
  }

  render() {
    const renderHeader = () => {
      return this.state.login ? <h1 className='header auth-header'>Login</h1> : <h1 className='header auth-header'>Signup</h1>
    }

    const renderPicUpload = () => {
      return (
        <Dropzone
          multiple={false}
          accept="image/*"
          onDrop={this.onImageDrop}
          className='auth-children dropzone'
        >
          <p>Drop an image or click to select a file to upload.</p>
        </Dropzone>
      )
    }

    const renderAccountForm = () => {
      return <AccountForm username={this.state.username} password={this.state.password} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
    }

    const renderAboutForm = () => {
      return <AboutForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} location={this.state.location} age={this.state.age} nationality={this.state.nationality} languages={this.state.languages} />
    }

    const renderDetailsForm = () => {
      return <DetailsForm handleChange={this.handleChange} handleSubmit={this.handleSubmit} introduction={this.state.introduction} hobbies={this.state.hobbies} goals={this.state.goals} />
    }

    return (
      <div className='auth-container'>
        <main className='auth-wrapper'>
          { renderHeader() }

          { !this.state.accountForm || this.state.login ? null : this.state.uploadedFileCloudinaryUrl ? <img className='checkmark' src='https://png.icons8.com/cotton/2x/checkmark.png' alt='check mark'/> : renderPicUpload() }

          { this.state.accountForm || this.state.login ? renderAccountForm() : null }
          {/* { this.state.login? <a href='/signup'><li>Sign up</li></a> : <a href='/login'><li>Login</li></a>} */}
          { this.state.aboutForm ? renderAboutForm() : null }
          { this.state.detailsForm ? renderDetailsForm() : null }
          <TestModal auth='signup' />
        </main>
      </div>
    )
  }
}

export default Auth;
