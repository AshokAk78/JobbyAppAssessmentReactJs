import './index.css'

const EmploymentType = props => {
  const {employmentTypeDetails, employmentType} = props
  const {label, employmentTypeId} = employmentTypeDetails
  const onChangeEmploymentType = event => {
    employmentType(event)
  }

  return (
    <li className="employment-type-items">
      <div className="employment-type-item">
        <input
          type="checkbox"
          id={employmentTypeId}
          value={employmentTypeId}
          onChange={onChangeEmploymentType}
        />
        <label className="label" htmlFor={employmentTypeId}>
          {label}
        </label>
      </div>
    </li>
  )
}

export default EmploymentType
