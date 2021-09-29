import './MonthIndicator.css';
import {
  getReadableMonth,
  getYear,
  getYearMonth,
  getMonthSet,
} from '../../utils/moment-utils';

const MonthIndicator = ({ selectDate, setSelectDate, setYearMonth }) => {
  const changeDate = (e) => {
    setSelectDate(e.target.getAttribute('data-date'));
    setYearMonth(getYearMonth(e.target.getAttribute('data-date')));
  };

  const monthSet = getMonthSet(selectDate);

  return (
    <header className="header-nav">
      <h2 className="left" data-date={monthSet.prev} onClick={changeDate}>
        {getReadableMonth(monthSet.prev)}
      </h2>
      <h1>{`${getReadableMonth(monthSet.current)} - ${getYear(
        monthSet.current
      )}`}</h1>
      <h2 className="right" data-date={monthSet.next} onClick={changeDate}>
        {getReadableMonth(monthSet.next)}
      </h2>
    </header>
  );
};
export default MonthIndicator;
