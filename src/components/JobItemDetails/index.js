import {Component} from 'react'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import SimilarJobs from '../SimilarJobs'
import Skill from '../Skills'
import JobsDetails from '../JobsDetails'
import './index.css'

class JobItemDetails extends Component {
  state = {
    isLoading: true,
    jobItemDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobsItemDetails()
  }

  getSuccessResponse = data => {
    const job = data.job_details
    let formattedSimilarJobData = null
    let formattedJobData = null
    formattedJobData = {
      companyLogoUrl: job.company_logo_url,
      companyWebsiteUrl: job.company_website_url,
      employmentType: job.employment_type,
      id: job.id,
      jobDescription: job.job_description,
      location: job.location,
      packagePerAnnum: job.package_per_annum,
      rating: job.rating,
      title: job.title,
      skills: job.skills,
      lifeAtCompany: {
        description: job.life_at_company.description,
        imageUrl: job.life_at_company.image_url,
      },
    }
    formattedSimilarJobData = data.similar_jobs.map(jobItem => ({
      companyLogoUrl: jobItem.company_logo_url,
      employmentType: jobItem.employment_type,
      id: job.id,
      jobDescription: jobItem.job_description,
      location: jobItem.location,
      rating: jobItem.rating,
      title: jobItem.title,
    }))
    this.setState({
      jobItemDetails: formattedJobData,
      similarJobs: formattedSimilarJobData,
      isLoading: false,
    })
  }

  getJobsItemDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    const job = console.log(data)
    if (response.ok === true) {
      this.getSuccessResponse(job)
    } else {
      this.getFailureResponse()
    }
  }

  getFailureResponse = () => (
    <div className="failure-container">
      <img
        className="failure"
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <div className="failure-content-container">
        <p className="failure-param">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          type="button"
          className="failure-retry-button"
          onClick={this.getJobsItemDetails}
        >
          Retry
        </button>
      </div>
    </div>
  )

  getLifeAtCompany = () => {
    const {jobItemDetails} = this.state
    const {lifeAtCompany} = jobItemDetails
    console.log(lifeAtCompany)
    return (
      <div className="job-item-description">
        <h1 className="description-heading">Description</h1>
        <div className="description-image">
          <p className="description-content">{lifeAtCompany.description}</p>
          <img
            className="company-image"
            src={lifeAtCompany.imageUrl}
            alt="life at company"
          />
        </div>
      </div>
    )
  }

  getJobDetails = () => {
    const {jobItemDetails, isLoading} = this.state

    return (
      <>
        <JobsDetails
          key={jobItemDetails.id}
          JobDetails={jobItemDetails}
          isJobClick={!isLoading}
        />
      </>
    )
  }

  getSimilarItemJobs = () => {
    const {similarJobs} = this.state

    return (
      <div className="similar-jobs-container">
        <h1 className="similar-heading">Similar Jobs</h1>
        {similarJobs.map(job => (
          <SimilarJobs key={job.id} similarJobDetails={job} />
        ))}
      </div>
    )
  }

  getSkill = () => {
    const {jobItemDetails} = this.state
    const {skills} = jobItemDetails
    console.log(skills)

    return (
      <>
        <h1 className="skills-heading">Skills</h1>
        {skills.map(skill => (
          <Skill key={skill.name} skillDetails={skill} />
        ))}
      </>
    )
  }

  getLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#a1ea" width="50" height="50" />
    </div>
  )

  render() {
    const {isLoading, similarJobs} = this.state
    console.log(similarJobs)

    return (
      <>
        {isLoading ? (
          this.getLoader()
        ) : (
          <>
            <div>{this.getJobDetails()}</div>
            <div>{this.getSkill()}</div>
            <div>{this.getLifeAtCompany()}</div>
            <div>{this.getSimilarItemJobs()}</div>
          </>
        )}
      </>
    )
  }
}
export default JobItemDetails
