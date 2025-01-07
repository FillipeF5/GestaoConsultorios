// src/hooks/useMeses.js
import { useState, useMemo } from 'react';

const useMeses = () => {
  const monthNames = useMemo(() => [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ], []);

  const getCurrentAndNextMonth = () => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth();
    const nextMonth = (currentMonth + 1) % 12;
    return [currentMonth, nextMonth];
  };

  const [currentMonth, nextMonth] = getCurrentAndNextMonth();
  const [loadedMonths, setLoadedMonths] = useState({
    [currentMonth]: true,
    [nextMonth]: true,
  });

  const handleTabClick = (monthIndex) => {
    setLoadedMonths((prevLoaded) => ({
      ...prevLoaded,
      [monthIndex]: true,
    }));
  };

  return { monthNames, loadedMonths, handleTabClick, currentMonth, nextMonth };
};

export default useMeses;
