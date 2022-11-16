import {BiStar} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails

  return (
    <div className="similar-job-container">
      <div className="job-header">
        <div className="logo-role">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="role-rating">
            <h1>{title}</h1>
            <div className="star-container">
              <BiStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="job-body">
        <div className="description-title-webUrl">
          <h1 className="description-heading">Description</h1>
        </div>
        <p className="description-content">{jobDescription}</p>
      </div>
      <div className="location-employeeType-package-container">
        <div className="location-employeeType-container">
          <div className="location-container">
            <MdLocationOn className="location-icon" />
            <p className="location">{location}</p>
          </div>
          <div className="employeeType-container">
            <BsBriefcaseFill className="employeeType-icon" />
            <p className="employeeType">{employmentType}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SimilarJobs
