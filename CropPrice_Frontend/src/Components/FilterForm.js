import React, { useState, useEffect } from 'react';
import { MenuItem, Select, TextField, Button, FormControl, InputLabel } from '@mui/material';
import { staticData } from '../data/staticData';

const FilterForm = ({ onFilterChange }) => {
  const [districts, setDistricts] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [filters, setFilters] = useState({
    state: '',
    district: '',
    market: '',
    compareMarket: '',
    commodity: '',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    if (filters.state) {
      const selectedState = staticData.states.find(state => state.name === filters.state);
      setDistricts(Object.keys(selectedState?.districts || {}));
    } else {
      setDistricts([]);
      setMarkets([]);
    }
  }, [filters.state]);

  useEffect(() => {
    if (filters.district && filters.state) {
      const selectedState = staticData.states.find(state => state.name === filters.state);
      const stateDistricts = selectedState?.districts || {};
      setMarkets(stateDistricts[filters.district] || []);
    } else {
      setMarkets([]);
    }
  }, [filters.district, filters.state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedFilters = {
      ...filters,
      compareMarket: filters.compareMarket === '' ? 'Nothing' : filters.compareMarket,
    };
    onFilterChange(updatedFilters);
    console.log(filters.compareMarket);
  };
  

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        maxWidth: '1200px',
        margin: '20px auto',
        padding: '20px',
        gap: '20px',
        backgroundColor: '#fdfefe',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          width: '100%',
        }}
      >
        <FormControl variant="outlined" size="small" style={{ minWidth: 220 }}>
          <InputLabel id="state-label">State</InputLabel>
          <Select
            labelId="state-label"
            name="state"
            value={filters.state}
            onChange={handleChange}
            label="State"
            style={{ height: '48px' }}
          >
            <MenuItem value="">Select State</MenuItem>
            {staticData.states.map((state) => (
              <MenuItem key={state.name} value={state.name}>
                {state.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ minWidth: 220 }}>
          <InputLabel id="district-label">District</InputLabel>
          <Select
            labelId="district-label"
            name="district"
            value={filters.district}
            onChange={handleChange}
            label="District"
            style={{ height: '48px' }}
          >
            <MenuItem value="">Select District</MenuItem>
            {districts.map((district) => (
              <MenuItem key={district} value={district}>
                {district}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ minWidth: 220 }}>
          <InputLabel id="market-label">Market</InputLabel>
          <Select
            labelId="market-label"
            name="market"
            value={filters.market}
            onChange={handleChange}
            label="Market"
            style={{ height: '48px' }}
          >
            <MenuItem value="">Select Market</MenuItem>
            {markets.map((market) => (
              <MenuItem key={market} value={market}>
                {market}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="outlined" size="small" style={{ minWidth: 220 }}>
          <InputLabel id="compareMarket-label">Compare Market</InputLabel>
          <Select
            labelId="compareMarket-label"
            name="compareMarket"
            value={filters.compareMarket}
            onChange={handleChange}
            label="Compare Market"
            style={{ height: '48px' }}
          >
            <MenuItem value="">Compare Market</MenuItem>
            {markets.map((market) => (
              <MenuItem key={`compare-${market}`} value={market}>
                {market}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
          width: '100%',
          alignItems: 'center',
        }}
      >
        <FormControl variant="outlined" size="small" style={{ minWidth: 220 }}>
          <InputLabel id="commodity-label">Commodity</InputLabel>
          <Select
            labelId="commodity-label"
            name="commodity"
            value={filters.commodity}
            onChange={handleChange}
            label="Commodity"
            style={{ height: '48px' }}
          >
            <MenuItem value="">Select Commodity</MenuItem>
            {staticData.commodities.map((commodity) => (
              <MenuItem key={commodity} value={commodity}>
                {commodity}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleChange}
          label="Date From"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 220,
            '& .MuiInputBase-root': {
              height: '48px',
            },
            '& .MuiOutlinedInput-root': {
              height: '48px',
            },
          }}
        />

        <TextField
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={handleChange}
          label="Date To"
          InputLabelProps={{ shrink: true }}
          variant="outlined"
          size="small"
          sx={{
            minWidth: 220,
            '& .MuiInputBase-root': {
              height: '48px',
            },
            '& .MuiOutlinedInput-root': {
              height: '48px',
            },
          }}
        />

        <Button
          type="submit"
          variant="outlined"
          color="success"
          sx={{
            minWidth: '150px',
            height: '45px',
            fontWeight: 'bold',
            marginLeft: '38px',
            marginRight: '38px',
            '&:hover': {
              backgroundColor: 'success.main',
              color: 'white',
              borderColor: 'success.main',
            },
          }}
        >
          Show Data
        </Button>
      </div>
    </form>
  );
};

export default FilterForm;
