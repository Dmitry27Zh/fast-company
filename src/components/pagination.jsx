import React from 'react'

const PageItem = (props) => {
  const { text } = props

  return (
    <li className="page-item">
      <button className="page-link">{text}</button>
    </li>
  )
}

const Pages = (props) => {
  const { pages } = props

  return (
    <ul className="pagination">
      {pages.map((text, index) => (
        <PageItem key={index} text={text} />
      ))}
    </ul>
  )
}

const Pagination = (props) => {
  const { itemsCount, pageSize } = props
  const pagesCount = Math.trunc(itemsCount / pageSize)
  const pages = new Array(pagesCount + 2).fill().map((_, index, arr) => {
    if (index === 0) {
      return 'Previous'
    }

    if (index === arr.length - 1) {
      return 'Next'
    }

    return index
  })

  return (
    <nav aria-label="Page navigation">
      <Pages pages={pages} />
    </nav>
  )
}

export default Pagination
