// import React, { useState, useEffect } from 'react';
// import { staticData } from '../data/staticData';

// const FilterForm = ({ onFilterChange }) => {
//   const [districts, setDistricts] = useState([]);
//   const [markets, setMarkets] = useState([]);
//   const [filters, setFilters] = useState({
//     state: '',
//     district: '',
//     market: '',
//     commodity: '',
//     dateFrom: '',
//     dateTo: '',
//   });

//   useEffect(() => {
//     if (filters.state) {
//       const selectedState = staticData.states.find(state => state.name === filters.state);
//       setDistricts(Object.keys(selectedState?.districts || {}));
//       setMarkets([]);
//       setFilters(prevFilters => ({
//         ...prevFilters,
//         district: '',
//         market: '',
//       }));
//     } else {
//       setDistricts([]);
//       setMarkets([]);
//     }
//   }, [filters.state]);

//   useEffect(() => {
//     if (filters.district && filters.state) {
//       const selectedState = staticData.states.find(state => state.name === filters.state);
//       const stateDistricts = selectedState?.districts || {};
//       setMarkets(stateDistricts[filters.district] || []);
//     } else {
//       setMarkets([]);
//     }
//   }, [filters.district, filters.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onFilterChange(filters);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         maxWidth: '800px',
//         margin: '20px auto',
//         padding: '20px',
//         border: '1px solid #ddd',
//         borderRadius: '12px',
//         backgroundColor: '#f9f9f9',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         gap: '15px', // Space between form rows
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           width: '100%',
//           gap: '10px', // Space between form fields
//         }}
//       >
//         <select
//           name="state"
//           value={filters.state}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             padding: '10px',
//             borderRadius: '12px',
//             border: '1px solid #ddd',
//             fontSize: '14px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <option value="">State</option>
//           {staticData.states.map((state) => (
//             <option key={state.name} value={state.name}>
//               {state.name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="district"
//           value={filters.district}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             padding: '10px',
//             borderRadius: '12px',
//             border: '1px solid #ddd',
//             fontSize: '14px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <option value="">District</option>
//           {districts.map((district) => (
//             <option key={district} value={district}>
//               {district}
//             </option>
//           ))}
//         </select>

//         <select
//           name="market"
//           value={filters.market}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             padding: '10px',
//             borderRadius: '12px',
//             border: '1px solid #ddd',
//             fontSize: '14px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <option value="">Market</option>
//           {markets.map((market) => (
//             <option key={market} value={market}>
//               {market}
//             </option>
//           ))}
//         </select>
//       </div>

//       <div
//         style={{
//           display: 'flex',
//           justifyContent: 'space-between',
//           width: '100%',
//           gap: '10px', // Space between form fields
//         }}
//       >
//         <select
//           name="commodity"
//           value={filters.commodity}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             padding: '10px',
//             borderRadius: '12px',
//             border: '1px solid #ddd',
//             fontSize: '14px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <option value="">Commodity</option>
//           {staticData.commodities.map((commodity) => (
//             <option key={commodity} value={commodity}>
//               {commodity}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           name="dateFrom"
//           value={filters.dateFrom}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             padding: '10px',
//             borderRadius: '12px',
//             border: '1px solid #ddd',
//             fontSize: '14px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         />

//         <input
//           type="date"
//           name="dateTo"
//           value={filters.dateTo}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             padding: '10px',
//             borderRadius: '12px',
//             border: '1px solid #ddd',
//             fontSize: '14px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         />
//       </div>

//       <button
//         type="submit"
//         style={{
//           backgroundColor: '#009879',
//           color: '#fff',
//           padding: '12px 24px',
//           borderRadius: '12px',
//           border: 'none',
//           cursor: 'pointer',
//           fontSize: '16px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//           alignSelf: 'center',
//         }}
//       >
//         Fetch Data
//       </button>
//     </form>
//   );
// };

// export default FilterForm;

// import React, { useState, useEffect } from 'react';
// import { staticData } from '../data/staticData';

// const FilterForm = ({ onFilterChange }) => {
//   const [districts, setDistricts] = useState([]);
//   const [markets, setMarkets] = useState([]);
//   const [filters, setFilters] = useState({
//     state: '',
//     district: '',
//     market: '',
//     compareMarket: '',
//     commodity: '',
//     dateFrom: '',
//     dateTo: '',
//   });

//   useEffect(() => {
//     if (filters.state) {
//       const selectedState = staticData.states.find(state => state.name === filters.state);
//       setDistricts(Object.keys(selectedState?.districts || {}));
//     } else {
//       setDistricts([]);
//       setMarkets([]);
//     }
//   }, [filters.state]);

//   useEffect(() => {
//     if (filters.district && filters.state) {
//       const selectedState = staticData.states.find(state => state.name === filters.state);
//       const stateDistricts = selectedState?.districts || {};
//       setMarkets(stateDistricts[filters.district] || []);
//     } else {
//       setMarkets([]);
//     }
//   }, [filters.district, filters.state]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFilters({
//       ...filters,
//       [name]: value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onFilterChange(filters);
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       style={{
//         display: 'flex',
//         flexDirection: 'column',
//         alignItems: 'center',
//         maxWidth: '1000px',
//         margin: '20px auto',
//         padding: '20px',
//         border: '1px solid #ddd',
//         borderRadius: '12px',
//         backgroundColor: '#f5f5f5',
//         boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//         gap: '20px',
//       }}
//     >
//       <div
//         style={{
//           display: 'flex',
//           flexWrap: 'wrap',
//           gap: '15px',
//           width: '100%',
//         }}
//       >
//         <select
//           name="state"
//           value={filters.state}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             minWidth: '200px',
//             padding: '12px',
//             borderRadius: '8px',
//             border: '1px solid #ccc',
//             fontSize: '16px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <option value="">Select State</option>
//           {staticData.states.map((state) => (
//             <option key={state.name} value={state.name}>
//               {state.name}
//             </option>
//           ))}
//         </select>

//         <select
//           name="district"
//           value={filters.district}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             minWidth: '200px',
//             padding: '12px',
//             borderRadius: '8px',
//             border: '1px solid #ccc',
//             fontSize: '16px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <option value="">Select District</option>
//           {districts.map((district) => (
//             <option key={district} value={district}>
//               {district}
//             </option>
//           ))}
//         </select>

//         <select
//           name="market"
//           value={filters.market}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             minWidth: '200px',
//             padding: '12px',
//             borderRadius: '8px',
//             border: '1px solid #ccc',
//             fontSize: '16px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <option value="">Select Market</option>
//           {markets.map((market) => (
//             <option key={market} value={market}>
//               {market}
//             </option>
//           ))}
//         </select>

//         <select
//           name="compareMarket"
//           value={filters.compareMarket}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             minWidth: '200px',
//             padding: '12px',
//             borderRadius: '8px',
//             border: '1px solid #ccc',
//             fontSize: '16px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <option value="">Compare Market</option>
//           {markets.map((market) => (
//             <option key={`compare-${market}`} value={market}>
//               {market}
//             </option>
//           ))}
//         </select>

//         <select
//           name="commodity"
//           value={filters.commodity}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             minWidth: '200px',
//             padding: '12px',
//             borderRadius: '8px',
//             border: '1px solid #ccc',
//             fontSize: '16px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         >
//           <option value="">Select Commodity</option>
//           {staticData.commodities.map((commodity) => (
//             <option key={commodity} value={commodity}>
//               {commodity}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           name="dateFrom"
//           value={filters.dateFrom}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             minWidth: '200px',
//             padding: '12px',
//             borderRadius: '8px',
//             border: '1px solid #ccc',
//             fontSize: '16px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         />

//         <input
//           type="date"
//           name="dateTo"
//           value={filters.dateTo}
//           onChange={handleChange}
//           style={{
//             flex: '1',
//             minWidth: '200px',
//             padding: '12px',
//             borderRadius: '8px',
//             border: '1px solid #ccc',
//             fontSize: '16px',
//             boxSizing: 'border-box',
//             backgroundColor: '#fff',
//             boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
//           }}
//         />
//       </div>

//       <button
//         type="submit"
//         style={{
//           backgroundColor: '#007bff',
//           color: '#fff',
//           padding: '12px 24px',
//           borderRadius: '8px',
//           border: 'none',
//           cursor: 'pointer',
//           fontSize: '16px',
//           boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
//           alignSelf: 'center',
//         }}
//       >
//         Fetch Data
//       </button>
//     </form>
//   );
// };

// export default FilterForm;

import React, { useState, useEffect } from 'react';
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
      compareMarket: filters.compareMarket === "Compare Market" ? '' : filters.compareMarket,
    };

    onFilterChange(updatedFilters);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxWidth: '1000px',
        margin: '20px auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '12px',
        backgroundColor: '#f5f5f5',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        gap: '20px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          width: '100%',
        }}
      >
        <select
          name="state"
          value={filters.state}
          onChange={handleChange}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <option value="">Select State</option>
          {staticData.states.map((state) => (
            <option key={state.name} value={state.name}>
              {state.name}
            </option>
          ))}
        </select>

        <select
          name="district"
          value={filters.district}
          onChange={handleChange}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district} value={district}>
              {district}
            </option>
          ))}
        </select>

        <select
          name="market"
          value={filters.market}
          onChange={handleChange}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <option value="">Select Market</option>
          {markets.map((market) => (
            <option key={market} value={market}>
              {market}
            </option>
          ))}
        </select>

        <select
          name="compareMarket"
          value={filters.compareMarket}
          onChange={handleChange}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <option value="Default Compare Market">Compare Market</option>
          {markets.map((market) => (
            <option key={`compare-${market}`} value={market}>
              {market}
            </option>
          ))}
        </select>

        <select
          name="commodity"
          value={filters.commodity}
          onChange={handleChange}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        >
          <option value="">Select Commodity</option>
          {staticData.commodities.map((commodity) => (
            <option key={commodity} value={commodity}>
              {commodity}
            </option>
          ))}
        </select>

        <input
          type="date"
          name="dateFrom"
          value={filters.dateFrom}
          onChange={handleChange}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />

        <input
          type="date"
          name="dateTo"
          value={filters.dateTo}
          onChange={handleChange}
          style={{
            flex: '1',
            minWidth: '200px',
            padding: '12px',
            borderRadius: '8px',
            border: '1px solid #ccc',
            fontSize: '16px',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
          }}
        />
      </div>

      <button
        type="submit"
        style={{
          backgroundColor: '#007bff',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          border: 'none',
          cursor: 'pointer',
          fontSize: '16px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          alignSelf: 'center',
        }}
      >
        Fetch Data
      </button>
    </form>
  );
};

export default FilterForm;



