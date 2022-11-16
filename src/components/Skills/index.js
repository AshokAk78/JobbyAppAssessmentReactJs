import './index.css'

const Skills = props => {
  const {skillDetails} = props
  const {name} = skillDetails
  const imageUrl = skillDetails.image_url

  return (
    <div className="skill-details-container">
      <img src={imageUrl} alt={name} />
      <h1>{name}</h1>
    </div>
  )
}

export default Skills
