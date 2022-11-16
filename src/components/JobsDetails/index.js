import {BiStar} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

import {Link} from 'react-router-dom'
import './index.css'

const JobsDetails = props => {
  const {JobDetails, isJobClick} = props
  const {
    companyLogoUrl,
    companyWebsiteUrl,
    employmentType,
    jobDescription,
    id,
    location,
    packagePerAnnum,
    rating,
    title,
  } = JobDetails

  const CompanyWebUrl = isJobClick ? companyWebsiteUrl : false
  const companyLogoAlt = isJobClick
    ? 'job details company logo'
    : 'company logo'

  return (
    <li className="job-details">
      <Link to={`/jobs/${id}`} className="job-link">
        <div className="job-header">
          <div className="logo-role">
            <img
              src={companyLogoUrl}
              alt={companyLogoAlt}
              className="company-logo"
            />
            <div className="role-rating">
              <h1>{title}</h1>
              <div className="star-container">
                <BiStar className="star-icon" />
                <p className="rating">{rating}</p>
              </div>
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
              <div className="package-container">
                <p className="package">{packagePerAnnum}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="job-body">
          <div className="description-title-webUrl">
            <h1 className="description-heading">Description</h1>
            {CompanyWebUrl && (
              <Link to={companyWebsiteUrl} target="_self">
                Visit
              </Link>
            )}
          </div>
          <p className="description-content">{jobDescription}</p>
        </div>
      </Link>
    </li>
  )
}

export default JobsDetails
