import React from 'react'
import PropTypes from 'prop-types'

const PageItem = (props) => {
  const { text, disabled, active, currentPage, onPageChange } = props
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
      page = String(Number(currentPage) - 1)
    }

    if (page === 'Next') {
      page = String(Number(currentPage) + 1)
    }

    onPageChange(page)
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
  const { pagesCount, currentPage, onPageChange } = props
  const getPages = () => {
    let pages = Array.from({ length: pagesCount }, (_, index) => {
      const page = String(index + 1)

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
          disabled: String(currentPage) === '1',
          active: false,
        },
        ...pages,
        {
          text: 'Next',
          disabled: Number(currentPage) === pagesCount,
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
        <PageItem
          key={index}
          text={text}
          disabled={disabled}
          active={active}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      ))}
    </ul>
  )
}

const Pagination = (props) => {
  const { pagesCount, currentPage, onPageChange } = props
  const renderPages = () => {
    if (pagesCount === 0) {
      return <p>No pages!</p>
    }

    return <Pages pagesCount={pagesCount} currentPage={currentPage} onPageChange={onPageChange} />
  }

  return <nav aria-label="Page navigation">{renderPages()}</nav>
}

Pagination.propTypes = {
  pagesCount: PropTypes.number.isRequired,
  currentPage: PropTypes.string.isRequired,
  onPageChange: PropTypes.func.isRequired,
}

export default Pagination
