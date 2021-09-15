import { React, useState, useMemo } from 'react';
// import PropTypes from 'prop-types';
import { ArrowRightSquareFill, ArrowLeftSquareFill } from 'react-bootstrap-icons';
import Container from 'react-bootstrap/Container';
// import { useDispatch } from 'react-redux';
import OnlyTable from '../onlyTable/OnlyTable';

// eslint-disable-next-line react/prop-types
const PaginationPanel = (indata) => {
  const firstCurrentPage = 1;
  const [currentPage, setCurrentPage] = useState(firstCurrentPage);
  const rowsPerPage = 5;
  //
  // const dispatch = useDispatch();

  const indexOfLastElement = useMemo(() => currentPage * rowsPerPage, [currentPage, rowsPerPage]);
  const indexOfFirstElement = useMemo(
    () => indexOfLastElement - rowsPerPage,
    [indexOfLastElement, rowsPerPage],
  );

  const dataPerPage = useMemo(
    // eslint-disable-next-line react/prop-types
    () => indata.data.slice(indexOfFirstElement, indexOfLastElement),
    [indexOfLastElement, indexOfFirstElement, indata],
  );

  const totalPages = useMemo(
    // eslint-disable-next-line react/prop-types
    () => Math.ceil(indata.data.length / rowsPerPage),
    [indata, rowsPerPage],
  );

  const pages = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const handleClickPage = (page) => {
    setCurrentPage(page);
  };

  const handlePaginationPages = (e) => {
    const value = e.target.id;
    switch (value) {
      case 'right-arrow':
        if (currentPage > 1) {
          setCurrentPage(currentPage - 1);
        }
        break;
      case 'left-arrow':
        if (currentPage < pages.length) {
          setCurrentPage(currentPage + 1);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center">
        {/* eslint-disable-next-line max-len */}
        {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */}
        <nav aria-label="Page navigation" onClick={handlePaginationPages}>
          <ul className="pagination">
            <li className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
              <a
                id="left-arrow"
                className="page-link"
                href="#section"
                onClick={() => handleClickPage(currentPage - 1)}>
                <ArrowLeftSquareFill size={20} />
              </a>
            </li>
            {pages.map((page) => (
              // eslint-disable-next-line max-len
              // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions,jsx-a11y/click-events-have-key-events
              <li
                className={currentPage === page ? 'page-item active' : 'page-item'}
                onClick={() => handleClickPage(page)}
                key={Math.random()}>
                <a className="page-link" href="#section">
                  {page}
                </a>
              </li>
            ))}
            <li className={currentPage === pages.length ? 'page-item disabled' : 'page-item'}>
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

// PaginationPanel.propTypes = {
//   components: PropTypes.object,
// };

export default PaginationPanel;
