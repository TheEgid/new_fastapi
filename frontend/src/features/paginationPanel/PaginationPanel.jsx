import { React, useMemo, useState } from 'react';
import { ArrowRightSquareFill, ArrowLeftSquareFill } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
import OnlyTable from '../onlyTable/OnlyTable';

// eslint-disable-next-line react/prop-types
const PaginationPanel = (indata) => {
  const firstCurrentPage = 1;
  const [currentPage, setCurrentPage] = useState(firstCurrentPage);
  const rowsPerPage = 5;

  const indexOfLastElement = useMemo(() => currentPage * rowsPerPage, [currentPage, rowsPerPage]);

  const indexOfFirstElement = useMemo(
    () => indexOfLastElement - rowsPerPage,
    [indexOfLastElement, rowsPerPage],
  );

  // eslint-disable-next-line react/prop-types
  const dataPerPage = useMemo(
    () => indata.data.slice(indexOfFirstElement, indexOfLastElement),
    [indexOfLastElement, indexOfFirstElement, indata],
  );

  const totalPages = useMemo(
    () => Math.ceil(indata.data.length / rowsPerPage),
    [indata, rowsPerPage],
  );

  const pages = [...Array(totalPages).keys()].map((e, i) => i + 1);

  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

  const handlePaginationPages = (e) => {
    const value = e.target.id;
    switch (value) {
      case 'right-arrow':
        if (currentPage > 1) setCurrentPage(currentPage - 1);
        break;
      case 'left-arrow':
        if (currentPage < pages.length) setCurrentPage(currentPage + 1);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center">
        <nav aria-label="Page navigation">
          <ul
            role="tablist"
            className="pagination"
            onClick={handlePaginationPages}
            onKeyUp={handlePaginationPages}>
            <li
              role="presentation"
              className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
              <a
                id="left-arrow"
                className="page-link"
                href="#section"
                onClick={() => handleClickPage(currentPage - 1)}>
                <ArrowLeftSquareFill size={20} />
              </a>
            </li>
            {pages.map((page) => (
              <li
                role="presentation"
                className={currentPage === page ? 'page-item active' : 'page-item'}
                onClick={() => handleClickPage(page)}
                key={page}>
                <a className="page-link" href="#section">
                  {page}
                </a>
              </li>
            ))}
            <li
              role="presentation"
              className={currentPage === pages.length ? 'page-item disabled' : 'page-item'}>
              <a
                id="right-arrow"
                className="page-link"
                href="#section"
                onClick={() => handleClickPage(currentPage + 1)}>
                <ArrowRightSquareFill size={20} />
              </a>
            </li>
          </ul>
        </nav>
      </Container>
      <OnlyTable indata={dataPerPage} />
    </>
  );
};

export default PaginationPanel;
