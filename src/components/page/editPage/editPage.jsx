import React from 'react'
import PropTypes from 'prop-types'

const EditPage = (props) => {
    const { name } = props

    return (<div>{`EditPage-User: ${name}`}</div>)
}

EditPage.propTypes = {
    name: PropTypes.string
}

export default EditPage
