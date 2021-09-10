import React from 'react';
import { getMonthSet } from '../../utils/date-utils';
import moment from 'moment';
import './MonthIndicator.css';

const MonthIndicator = ({ selectDate, setSelectDate, setYearMonth }) => {
  const changeDate = (e) => {
    setSelectDate(e.target.getAttribute('data-date'));
    setYearMonth(moment(e.target.getAttribute('data-date')).format('YYYY/MM'));
  };

  const monthSet = getMonthSet(selectDate);

  return (
    <header className="header-nav">
      <h2 className="left" data-date={monthSet.prev} onClick={changeDate}>
        {moment(monthSet.prev).format('MMMM')}
      </h2>
      <h1>{moment(monthSet.current).format('MMMM - YYYY')}</h1>
      <h2 className="right" data-date={monthSet.next} onClick={changeDate}>
        {moment(monthSet.next).format('MMMM')}
      </h2>
    </header>
  );
};
export default MonthIndicator;
