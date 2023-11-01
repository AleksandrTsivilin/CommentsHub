import { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { SearchLink } from '../utils/SearchLink';
import { getNumbers } from '../../helpers/getNumbers';
import { PAGE_LIMIT } from '../../constants/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft, faAnglesRight } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';
import './Pagination.css';


interface Props {
  total: number
}

export const Pagination: FC<Props> = ({total}) => {
  const [pages, setPages] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const currentPage = Number(searchParams.get('page')) || 1;
  const lastPage = pages[pages.length - 1];

  if (Number(currentPage) > lastPage) {
    setSearchParams({ page: `${lastPage}` });
  }


  useEffect(() => {
    setPages(getNumbers(total, PAGE_LIMIT));
  }, [total]);


  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= pages.length;
  const prevPage = isFirstPage ? 1 : currentPage - 1;   
  const nextPage = isLastPage ? pages.length : currentPage + 1;  

  if (pages.length <=1) {
    return null;
  }
 
  return (
    <section className="Pagination">
      <SearchLink
          className={classNames('Pagination__item', {
            'Pagination__item--disabled': isFirstPage,
            'Pagination__item-arrow': !isFirstPage
          })}
        params={{ page: `${prevPage}` }}
      >
        <FontAwesomeIcon icon={faAnglesLeft} />
      </SearchLink>
      <ul className="Pagination__list">
        {pages.map((page) => (
          <li key={page}>
            <SearchLink
              className={classNames('Pagination__item', 'Pagination__item-numbers', {
                'Pagination__item--selected': page === currentPage,
              })}
              params={{ page: `${page}`, limit: `${PAGE_LIMIT}` }}
            >
              {page}
            </SearchLink>
          </li>
        ))}
      </ul>
      <SearchLink
        className={classNames('Pagination__item',  {
          'Pagination__item--disabled': isLastPage,
          'Pagination__item-arrow': !isLastPage,
        })}
        params={{ page: `${nextPage}` }}
      >
        <FontAwesomeIcon icon={faAnglesRight}  />
      </SearchLink>
      
    </section>
  );
};