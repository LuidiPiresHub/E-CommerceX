import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.css';
import { IPaginationProps } from '../../interfaces/pagination.interface';

export default function Pagination({ pageCount, forcePage, onPageChange }: IPaginationProps) {
  const handlePageChange = ({ selected }: { selected : number }) => {
    onPageChange({ selected });
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <ReactPaginate
      breakLabel=""
      nextLabel="Next"
      onPageChange={handlePageChange}
      pageRangeDisplayed={2}
      marginPagesDisplayed={1}
      pageCount={pageCount}
      previousLabel="Previous"
      renderOnZeroPageCount={null}
      containerClassName={styles.pagination}
      pageLinkClassName={styles.pageLink}
      previousLinkClassName={styles.previous}
      nextLinkClassName={styles.next}
      activeLinkClassName={styles.active}
      breakLinkClassName={styles.break}
      disabledLinkClassName={styles.disabledLink}
      forcePage={forcePage}
    />
  );
}
