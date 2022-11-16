import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Cookie from 'js-cookie'
import Loader from 'react-loader-spinner'

import JobsDetails from '../JobsDetails'
import Profile from '../Profile/index'

import EmploymentType from '../EmploymentType/index'
import SalaryRange from '../SalaryRange/index'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employmentType: [],
    salaryRange: '',
    searchInput: '',
    jobsList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getJobsList()
  }

  getSuccessResponse = data => {
    const formattedData = data.jobs.map(job => ({
      companyLogoUrl: job.company_logo_url,
      employmentType: job.employment_type,
      id: job.id,
      jobDescription: job.job_description,
      location: job.location,
      packagePerAnnum: job.package_per_annum,
      rating: job.rating,
      title: job.title,
    }))

    this.setState({
      jobsList: formattedData,
      isLoading: false,
    })
  }

  getJobsList = async () => {
    const {employmentType, salaryRange, searchInput} = this.state
    const commaSeparatedType = employmentType.join(',')
    const jwtToken = Cookie.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${commaSeparatedType}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.getSuccessResponse(data)
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
          onClick={this.getJobsList}
        >
          Retry
        </button>
      </div>
    </div>
  )

  getLoader = () => (
    <div className="loader-container">
      <Loader type="Bars" color="#a1ea" width="50" height="50" />
    </div>
  )

  getJobDetails = () => {
    const {jobsList, isLoading} = this.state

    return (
      <>
        {isLoading ? (
          this.getLoader()
        ) : (
          <ul className="jobs-list">
            {jobsList.map(job => (
              <JobsDetails key={job.id} JobDetails={job} />
            ))}
          </ul>
        )}
      </>
    )
  }

  getEmploymentType = event => {
    const {value, checked} = event.target
    if (checked) {
      this.setState(prevState => ({
        employmentType: [...prevState.employmentType, value],
      }))
    }
  }

  getSalaryRange = event => {
    const updatedSalaryRange = event.target.value

    this.setState({salaryRange: updatedSalaryRange})
    this.getJobsList()
  }

  onChangeSearchInput = event => {
    const inputValue = event.target.value

    this.setState({searchInput: inputValue})
    this.getJobsList()
  }

  render() {
    const {jobsList} = this.state
    console.log(jobsList)

    return (
      <div className="jobs-container">
        <div className="sidebar">
          <Profile />
          <hr className="hr-line" />
          <ul className="employment-type-container">
            {employmentTypesList.map(eachType => (
              <EmploymentType
                key={eachType.employmentTypeId}
                employmentType={this.getEmploymentType}
                employmentTypeDetails={eachType}
              />
            ))}
          </ul>
          <hr />
          <ul className="salary-container">
            {salaryRangesList.map(salary => (
              <SalaryRange
                key={salary.salaryRangeId}
                salaryDetails={salary}
                salaryRange={this.getSalaryRange}
              />
            ))}
          </ul>
          <hr />
        </div>
        <div className="jobs-list-and-search-container">
          <div className="search-container">
            <input
              type="search"
              className="input-search"
              onChange={this.onChangeSearchInput}
            />
            <button type="button" onClick={this.onChangeSearchInput}>
              <BsSearch className="search-icon" />
            </button>
          </div>
        </div>
        <div className="job-list-container">{this.getJobDetails()}</div>
      </div>
    )
  }
}

export default Jobs
