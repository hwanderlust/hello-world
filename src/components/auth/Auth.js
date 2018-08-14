import React from 'react';
import Dropzone from 'react-dropzone';
import request from 'superagent';
import { uploadPic } from '../../adapter'

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

  // handleAccountSubmit = (e) => {
  //   e.preventDefault()
  //   console.log(this.state);
  //   this.props.handleAuth({
  //     username: this.state.username,
  //     password: this.state.password,
  //     profile_picture: this.state.uploadedFileCloudinaryUrl
  //   })
  // }

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
      console.log('RENDERDETAILSFORM RENDERING');
      return (
        <form onSubmit={(e) => this.handleSubmit(e)} id='accountForm' className='auth-children'>
          <label htmlFor='username'>Username</label>
          <input className='inputs' type='text' name='username' value={this.state.username} onChange={(e) => this.handleChange(e)}/>
          <br />
          <label htmlFor='password'>Password</label>
          <input className='inputs' type='password' name='password'  value={this.state.password} onChange={(e) => this.handleChange(e)} />
          <br />
          <input type='submit' className='' />
        </form>
      )
    }

    const renderAboutForm = () => {
      return (
        <form onSubmit={(e) => this.handleSubmit(e)} id='aboutForm' className='auth-children'>
          <label htmlFor='location'>Where you at?</label>
          <input type='text' name='location' className='inputs' onChange={this.handleChange} value={this.state.location} />
          <br />
          <label htmlFor='age'>How wise are you? (age)</label>
          <input type='number' name='age' className='inputs' onChange={this.handleChange} value={this.state.age} />
          <br />
          <label htmlFor='nationality'>Where's your passport from?</label>
          <input type='text' name='nationality' className='inputs' onChange={this.handleChange} value={this.state.nationality} />
          <br />
          <label htmlFor='languages'>Which languages do you speak?</label>
          <input type='text' name='languages' className='inputs' onChange={this.handleChange} value={this.state.languages} />
          <br />
          <input type='submit' className='' />
        </form>
      )
    }

    const renderDetailsForm = () => {
      return (
        <form onSubmit={(e) => this.handleSubmit(e)} id='detailsForm' className='auth-children'>
          <label htmlFor='introduction'>Tell us about yourself!</label>
          <input type='text' name='introduction' className='inputs' onChange={this.handleChange} value={this.state.introduction} />
          <br />
          <label htmlFor='hobbies'>Let others know what your hobbies are and what you're passionate about.</label>
          <input type='text' name='hobbies' className='inputs' onChange={this.handleChange} value={this.state.hobbies} />
          <br />
          <label htmlFor='goals'>What are your learning goals here?</label>
          <input type='text' name='goals' className='inputs' onChange={this.handleChange} value={this.state.goals} />
          <br />
          <input type='submit' className='' />
        </form>
      )
    }

    return (
      <div className='auth-container'>
        <main className='auth-wrapper'>
          { renderHeader() }

          { !this.state.accountForm || this.state.login ? null : renderPicUpload() }

          { this.state.accountForm || this.state.login ? renderAccountForm() : null }
          { this.state.aboutForm ? renderAboutForm() : null }
          { this.state.detailsForm ? renderDetailsForm() : null }

        </main>
      </div>
    )
  }
}

export default Auth;


// account form - username, password, pf pic
// about form
  // location
  // age
  // nationality
  // languages - know and learning
    // knowledge of each beg intermediate fluent native
// details form
  // introduction
  // passions and hobbies
  // language learning goals
