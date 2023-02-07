import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';

type PaginationPros = { value: number; onChangePage: (page: number) => void };

const Pagination: React.FC<PaginationPros> = ({ value, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles.root}
      breakLabel="..."
      nextLabel=">"
      onPageChange={(event) => {
        onChangePage(event.selected + 1);
      }}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={value - 1}
      previousLabel="<"
    />
  );
};
export default Pagination;
