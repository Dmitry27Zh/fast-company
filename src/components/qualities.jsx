import React from 'react'
import Badge from './badge'

const Qualities = ({ data }) => {
    return data.map((item, index) => <Badge key={index} {...item}></Badge>)
}

export default Qualities
