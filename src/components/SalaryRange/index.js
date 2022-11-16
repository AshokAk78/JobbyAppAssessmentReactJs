const SalaryRange = props => {
  const {salaryDetails, salaryRange} = props
  const {salaryRangeId, label} = salaryDetails

  const onChangeSalaryRange = event => {
    salaryRange(event)
  }

  return (
    <li className="salary-items-container">
      <div className="salary-item">
        <input
          type="radio"
          className="radio"
          name="range"
          value={salaryRangeId}
          id={salaryRangeId}
          onChange={onChangeSalaryRange}
        />
        <label className="label" htmlFor={salaryRangeId}>
          {label}
        </label>
      </div>
    </li>
  )
}

export default SalaryRange
