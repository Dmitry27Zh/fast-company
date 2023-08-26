import React from 'react'

const PageItem = (props) => {
  const { text, disabled, active } = props
  const getClassName = () => {
    let result = 'page-item'
    result += disabled ? ' disabled' : ''
    result += active ? ' active' : ''

    return result
  }

  return (
    <li className={getClassName()}>
      <button className="page-link">{text}</button>
    </li>
  )
}

const Pages = (props) => {
  const { pagesCount, currentPage } = props
  let pages = Array.from({ length: pagesCount }, (_, index) => {
    return {
      text: index + 1,
      disabled: false,
      active: index + 1 === currentPage,
    }
  })
  pages = [
    {
      text: 'Previous',
      disabled: currentPage === 1,
      active: false,
    },
    ...pages,
    {
      text: 'Next',
      disabled: currentPage === pagesCount,
      active: false,
    },
  ]

  return (
    <ul className="pagination">
      {pages.map(({ text, disabled, active }, index) => (
        <PageItem key={index} text={text} disabled={disabled} active={active} />
      ))}
    </ul>
  )
}

const Pagination = (props) => {
  const { itemsCount, pageSize } = props
  const pagesCount = Math.trunc(itemsCount / pageSize)
  let currentPage = 1

  return (
    <nav aria-label="Page navigation">
      <Pages pagesCount={pagesCount} currentPage={currentPage} />
    </nav>
  )
}

export default Pagination
