import React, { createContext, useContext, useState } from 'react';

const FiltersContext = createContext();

export const useFilters = () => {
  const context = useContext(FiltersContext);
  if (!context) {
    throw new Error('useFilters debe ser usado dentro de un FiltersProvider');
  }
  return context;
};

export const FiltersProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    dateFrom: '',
    dateTo: '',
    team: '',
    status: '',
    season: ''
  });

  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      dateFrom: '',
      dateTo: '',
      team: '',
      status: '',
      season: ''
    });
  };

  return (
    <FiltersContext.Provider value={{
      filters,
      updateFilters,
      clearFilters
    }}>
      {children}
    </FiltersContext.Provider>
  );
};
