import React from 'react';
import { getMonthSet } from '../../utils/date-utils';
import moment from 'moment';

const MonthIndicator = ({ selectDate, setSelectDate }) => {
  const changeDate = (e) => {
    setSelectDate(e.target.getAttribute('data-date'));
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
