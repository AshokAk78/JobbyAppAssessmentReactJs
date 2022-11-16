import Header from '../Header/index'
import './index.css'

const Home = props => {
  const onClickJobsButton = () => {
    const {history} = props
    history.replace('/jobs')
  }

  return (
    <>
      <Header />
      <div className="home-container">
        <h1 className="find-jobs">
          Find The Jobs That <br />
          Fits your Life
        </h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fit your abilities and potential.
        </p>
        <button
          type="button"
          className="jobs-button"
          onClick={onClickJobsButton}
        >
          Jobs
        </button>
      </div>
    </>
  )
}

export default Home
