import { getMonthSet } from '../../utils/date-utils';
import './MonthIndicator.css';
import {
  getReadableMonthDate,
  getYear,
  getMonth,
} from '../../utils/moment-utils';

const MonthIndicator = ({ selectDate, setSelectDate, setYearMonth }) => {
  const changeDate = (e) => {
    setSelectDate(e.target.getAttribute('data-date'));
    setYearMonth(
      `${getYear(e.target.getAttribute('data-date'))}/${getMonth(
        e.target.getAttribute('data-date')
      )}`
    );
  };

  const monthSet = getMonthSet(selectDate);

  return (
    <header className="header-nav">
      <h2 className="left" data-date={monthSet.prev} onClick={changeDate}>
        {getReadableMonthDate(monthSet.prev)}
      </h2>
      <h1>{`${getReadableMonthDate(monthSet.current)} - ${getYear(
        monthSet.current
      )}`}</h1>
      <h2 className="right" data-date={monthSet.next} onClick={changeDate}>
        {getReadableMonthDate(monthSet.next)}
      </h2>
    </header>
  );
};
export default MonthIndicator;
