import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';

const CropPriceChart = ({ historicalData, compareMarketData, chartType }) => {
    if (!Array.isArray(historicalData) || historicalData.length === 0) {
        return <p></p>;
    }

    const createDatePriceMap = (data) => {
        const map = new Map();
        data.forEach(item => map.set(item.arrival_date, parseFloat(item.modal_price)));
        return map;
    };

    const historicalMap = createDatePriceMap(historicalData);
    const compareMap = createDatePriceMap(compareMarketData);

    const allDates = Array.from(new Set([...historicalData.map(item => item.arrival_date), ...compareMarketData.map(item => item.arrival_date)]));
    allDates.sort();

    const historicalPrices = allDates.map(date => historicalMap.get(date) || null);
    const comparePrices = allDates.map(date => compareMap.get(date) || null);

    const data = {
        labels: allDates,
        datasets: [
            {
                label: 'Actual Market Price (₹)',
                data: historicalPrices,
                fill: false,
                backgroundColor: 'rgba(100, 177, 198, 1)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                tension: chartType === 'line' ? 0.3 : 0,
            },
            ...(compareMarketData.length > 0 ? [{
                label: 'Compare Market Price (₹)',
                data: comparePrices,
                fill: false,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
                tension: chartType === 'line' ? 0.3 : 0,
            }] : [])
        ]
    };

    const options = {
        layout: {
            padding: {
                left: 10,
                right: 10,
                top: 1,
                bottom: 78
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    }
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.5)',
                }
            },
            x: {
                ticks: {
                    color: '#333',
                    font: {
                        size: 12,
                    }
                },
                grid: {
                    color: 'rgba(200, 200, 200, 0.5)',
                }
            }
        },
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                labels: {
                    color: '#333',
                }
            },
            tooltip: {
                callbacks: {
                    label: function(tooltipItem) {
                        return `Price: ₹${tooltipItem.raw}`;
                    }
                }
            }
        }
    };

    return (
        <div style={{
            height: '480px',
            margin: '20px 94px',
            borderRadius: '8px',
            backgroundColor: '#f9f9f9',
            padding: '20px',
            border: '1px solid #ddd',
            boxSizing: 'border-box',
        }}>
            {/* <h2 style={{ color: '#4caf50', marginBottom: '20px' }}>Crop Price Variation</h2> */}
            <h2 style={{
            fontSize: '1.8rem',  
            fontWeight: '600', 
            color: '#4caf50', 
            marginBottom: '20px', 
            padding: '10px',  
            textAlign: 'center',
            borderBottom: '2px solid rgba(75, 192, 192, 1)', 
            display: 'inline-block', 
            backgroundColor: '#f1f1f1',
            borderRadius: '4px',
        }}>
            Crop Price Variation
        </h2>

        {chartType === 'bar' ? <Bar data={data} options={options} /> : <Line data={data} options={options} />}
        
        </div>
    );
};

export default CropPriceChart;
