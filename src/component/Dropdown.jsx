// DynamicDropdown.js
import React from 'react';

function Dropdown({ options, selectedValue, onChange }) {
  return (
    <div className='text-white w-full mr-[2vw] '>
      <select
        value={selectedValue}
        onChange={(e) => onChange(e.target.value)}
        className='bg-[#27272A] border-2 w-[100%] rounded-md text-center'>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Dropdown;
