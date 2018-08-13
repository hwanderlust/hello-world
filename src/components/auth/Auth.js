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
    uploadedFileCloudinaryUrl: '',
  }

  componentDidMount() {
    if(window.location.pathname === '/login') {
      this.setState({login: !this.state.login}, () => console.log(this.state))
    }

  }

  componentDidUpdate(prevProps, prevState) {
    if(window.location.pathname === '/login' && this.state.login === false) {
      this.setState({login: !this.state.login}, () => console.log(this.state))
    }
  }

  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault()
    console.log(this.state);
    // uploadPic(this.state.uploadedFileCloudinaryUrl).then(r => console.log(r))
    this.props.handleAuth({
      username: this.state.username,
      password: this.state.password,
      profile_picture: this.state.uploadedFileCloudinaryUrl
    })
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

      return ( this.state.login ? null :
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

    const renderForm = () => {
      return (
        <form onSubmit={(e) => this.handleSubmit(e)} className='auth-children'>
          <label htmlFor='username'>Username</label>
          <input className='inputs' type='text' name='username' value={this.state.username} onChange={(e) => this.handleChange(e)}/>
          <br />
          <label htmlFor='password'>Password</label>
          <input className='inputs' type='password' name='password'  value={this.state.password} onChange={(e) => this.handleChange(e)} />
          <br />
          <input type='submit' />
        </form>
      )
    }

    return (
      <div className='auth-container'>
        <main className='auth-wrapper'>
          { renderHeader() }

          { renderPicUpload() }

          { renderForm() }
        </main>
      </div>
    )
  }
}

export default Auth;


// username, password, pf pic form
// about form
  // location
  // age
  // languages - know and learning 
  // passions and hobbies
  // language learning goals
