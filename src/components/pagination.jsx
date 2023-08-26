import React from 'react'

const PageItem = (props) => {
  const { text, disabled, active, currentPage } = props
  const getClassName = () => {
    let result = 'page-item'
    result += disabled ? ' disabled' : ''
    result += active ? ' active' : ''

    return result
  }
  const handleClick = (event) => {
    if (active) {
      return
    }

    let page = event.target.textContent

    if (page === 'Previous') {
      page = currentPage - 1
    }

    if (page === 'Next') {
      page = currentPage + 1
    }

    console.log(page)
  }

  return (
    <li className={getClassName()}>
      <button className="page-link" onClick={handleClick}>
        {text}
      </button>
    </li>
  )
}

const Pages = (props) => {
  const { pagesCount, currentPage } = props
  const getPages = () => {
    let pages = Array.from({ length: pagesCount }, (_, index) => {
      const page = index + 1

      return {
        text: page,
        disabled: false,
        active: page === currentPage,
      }
    })

    if (pagesCount > 1) {
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
    }

    return pages
  }
  const pages = getPages()

  return (
    <ul className="pagination">
      {pages.map(({ text, disabled, active }, index) => (
        <PageItem key={index} text={text} disabled={disabled} active={active} currentPage={currentPage} />
      ))}
    </ul>
  )
}

const Pagination = (props) => {
  const { pagesCount, currentPage } = props
  const renderPages = () => {
    if (pagesCount === 0) {
      return <p>No pages!</p>
    }

    return <Pages pagesCount={pagesCount} currentPage={currentPage} />
  }

  return <nav aria-label="Page navigation">{renderPages()}</nav>
}

export default Pagination
