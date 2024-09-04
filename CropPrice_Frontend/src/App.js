import React, { useState } from 'react';
import FilterForm from './Components/FilterForm';
import DataTable from './Components/DataTable';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import './App.css';
import CropPriceChart from './Components/CropPriceChart';

const App = () => {
  const [data, setData] = useState([]);
  const [noDataMessage, setNoDataMessage] = useState('');
  const [historicalData, setHistoricalData] = useState([]);
  const [compareMarketData, setCompareMarketData] = useState([]);
  const [chartType, setChartType] = useState('bar');

  const handleFilterChange = async (filters) => {
    const { state, district, market, compareMarket, commodity, dateFrom, dateTo } = filters;

    let priceUrl = `http://172.212.230.201:5000/recent_crop_prices?state=${state}&district=${district}&market=${market}&commodity=${commodity}`;

    if (dateFrom && dateTo) {
      priceUrl = `http://172.212.230.201:5000/range_crop_prices?state=${state}&district=${district}&market=${market}&commodity=${commodity}&date_from=${dateFrom}&date_to=${dateTo}`;
    }

    try {
      const response = await axios.get(priceUrl);
      const items = response.data;

      if (items.length === 0) {
        setData([]);
        setNoDataMessage('No data found');
      } else {
        setData(items);
        setNoDataMessage('');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setData([]);
      setNoDataMessage('Error fetching data');
    }

    let trendUrl = `http://172.212.230.201:5000/price_trends?state=${state}&district=${district}&market=${market}&commodity=${commodity}`;

    if (dateFrom && dateTo) {
      trendUrl = `http://172.212.230.201:5000/price_trends?state=${state}&district=${district}&market=${market}&commodity=${commodity}&date_from=${dateFrom}&date_to=${dateTo}`;
    }

    if (compareMarket) {
      let comparetrendUrl = `http://172.212.230.201:5000/price_trends?state=${state}&district=${district}&market=${compareMarket}&commodity=${commodity}`;

      if (dateFrom && dateTo) {
        comparetrendUrl = `http://172.212.230.201:5000/price_trends?state=${state}&district=${district}&market=${compareMarket}&commodity=${commodity}&date_from=${dateFrom}&date_to=${dateTo}`;
      }
      
      try {
        const comparegraphResponse = await axios.get(comparetrendUrl);
        const comparehistoricalItems = comparegraphResponse.data;
  
        if (comparehistoricalItems.length === 0) {
          setCompareMarketData([]);
        } else {
          setCompareMarketData(comparehistoricalItems);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setCompareMarketData([]);
        setNoDataMessage('Error fetching data');
      }
    }


    try {
      const graphResponse = await axios.get(trendUrl);
      const historicalItems = graphResponse.data;

      if (historicalItems.length === 0) {
        setHistoricalData([]);
      } else {
        setHistoricalData(historicalItems);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setHistoricalData([]);
      setNoDataMessage('Error fetching data');
    }
  };

  const handleChartTypeChange = (event) => {
    setChartType(event.target.value);
  };

  return (
    <div className="App">
      <h1>Crop Price Fetcher</h1>
      <FilterForm onFilterChange={handleFilterChange} />
      <DataTable data={data} noDataMessage={noDataMessage} />
      <div style={{ margin: '32px 94px', display: 'flex', alignItems: 'center' }}>
            <FormControl variant="outlined" size="small" style={{ minWidth: 150 }}>
                <InputLabel id="chartType-label">Select Chart Type</InputLabel>
                <Select
                    labelId="chartType-label"
                    id="chartType"
                    value={chartType}
                    onChange={handleChartTypeChange}
                    label="Select Chart Type"
                >
                    <MenuItem value="bar">Bar Chart</MenuItem>
                    <MenuItem value="line">Line Chart</MenuItem>
                </Select>
            </FormControl>
        </div>
        <CropPriceChart 
            historicalData={historicalData} 
            compareMarketData={compareMarketData} 
            chartType={chartType} 
        />
    </div>
  );
};

export default App;