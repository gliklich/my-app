import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
  setFilters,
} from '../redux/slices/filterSlice';
import { fetchPizzas, SearchPizzaParams, selectPizzaData } from '../redux/slices/pizzaSlice';
import { useAppDispatch } from '../redux/store';

const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
  const { items, status } = useSelector(selectPizzaData);
  // eslint-disable-next-line
  const onChangeCategory = React.useCallback((id: number) => dispatch(setCategoryId(id)), []);

  const onChangePage = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const sortType = sort.sortProperty;

  const pizzas = items.map((obj: any) => <PizzaBlock key={obj.id} {...obj} />);
  const skeleton = [...new Array(4)].map((_, index) => <Skeleton key={index} />);

  const getPizzas = async () => {
    const sortBy = sortType.replace('-', '');
    const order = sortType.includes('-') ? 'desc' : 'asc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    dispatch(fetchPizzas({ sortBy, order, category, search, currentPage: String(currentPage) }));
    window.scrollTo(0, 0);
  };

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1)) as unknown as SearchPizzaParams;
      const sort = sortList.find((obj) => obj.sortProperty === params.sortBy);

      dispatch(
        setFilters({
          searchValue: params.search,
          categoryId: Number(params.category),
          currentPage: Number(params.currentPage),
          sort: sort || sortList[0],
        }),
      );
      isSearch.current = true;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortBy: sort.sortProperty,
        category: categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      getPizzas();
    }
    isSearch.current = false;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <>
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={(id: number) => onChangeCategory(id)} />
        <Sort value={sort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div>
          <h2>ERROR</h2>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skeleton : pizzas}</div>
      )}
      <Pagination value={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
