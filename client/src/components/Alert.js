import React from 'react'

const Alert = ({type, content}) => {
  return (
    <div className={`alert alert-${type} break-word`}>
      {content}
    </div>
  )
}


export default Alert
