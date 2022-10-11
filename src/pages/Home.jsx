/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import Categories from '../components/Categories';
import Pagination from '../components/Pagination';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { sortList } from '../components/Sort';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { SearchContext } from '../App';

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { categoryId, sort, currentPage } = useSelector((state) => state.filter);

  const { searchValue } = useContext(SearchContext);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&title=${searchValue}` : '';

    //! due to the specifics of mockapi, search correctly works only on the "ALL" TAB AND FIRST PAGE

    axios
      .get(
        `https://633eacc90dbc3309f3ba904c.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
      )
      .then((res) => {
        setItems(res.data);
        setIsLoading(false);
      });
  };

  //*on the very first render (example: open app) - prevent setting params in url
  useEffect(() => {
    //* if the render occurs and isMounted is true then do ...->
    if (isMounted.current) {
      // stringify params-obj to set string in url
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      // set string in url
      navigate(`?${queryString}`);
    }
    // after render set isMounter to true
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  //*on first render
  useEffect(() => {
    //*check url-params
    if (window.location.search) {
      // parse url-string with our query
      const params = qs.parse(window.location.search.substring(1));

      // find every sortProperty in exported from <Sort/> sortList-array
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      //*...and put it in payload (send to redux)
      dispatch(setFilters({ ...params, sort }));

      // signalize, that params came from url
      isSearch.current = true;
    }
  }, []);

  //*prevent double-fetching
  useEffect(() => {
    //* if it was first render - then fetch pizzas
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    // and set isSearch to false
    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  const pizzas = items.map((item) => <PizzaBlock key={item.id} {...item} />);
  const skeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} onChangeCategory={onChangeCategory} />
        <Sort />
      </div>
      <h2 className="content__title">All pizzas</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
