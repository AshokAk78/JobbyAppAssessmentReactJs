import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class Profile extends Component {
  state = {
    profile: '',
    isLoading: true,
  }

  componentDidMount() {
    this.getProfileDetails()
  }

  getSuccessResponse = data => {
    const profileDetails = {
      name: data.profile_details.name,
      image: data.profile_details.profile_image_url,
      skills: data.profile_details.short_bio,
    }
    this.setState({
      profile: profileDetails,
      isLoading: false,
    })
  }

  getFailureResponse = () => (
    <div className="profile-container">
      <button type="button" className="profile-load-button">
        Retry
      </button>
    </div>
  )

  getProfileDetails = async () => {
    const url = 'https://apis.ccbp.in/profile'
    const jwtToken = Cookie.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getSuccessResponse(data)
    } else {
      this.getFailureResponse()
    }
  }

  getLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#a1ea" width="50" height="50" />
    </div>
  )

  render() {
    const {isLoading, profile} = this.state

    return (
      <>
        {isLoading ? (
          this.getLoader()
        ) : (
          <div>
            <img className="profile-image" src={profile.image} alt="profile" />
            <h1 className="profile-name">{profile.name}</h1>
            <p className="profile-skills">{profile.skills}</p>
          </div>
        )}
      </>
    )
  }
}
export default Profile
