import React, { useState } from 'react';
import CooporateOptical from './CooporateOptical';
import CooporateOpticalPerFamily from './OpticalPerFamily';
import { Form, FormControl } from 'react-bootstrap';

const consideredCategory = {
  premiumPerFamily: "Premium per family",
  premiumPerPerson: "Premium per Company"
};

function Opticals() {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSelectionChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div>
      <h3>Select an Client Option</h3>
<Form>
<FormControl as='select' value={selectedCategory} onChange={handleSelectionChange}>

        <option value="">--Select an Option--</option>
        <option value="premiumPerPerson">{consideredCategory.premiumPerPerson}</option>
        <option value="premiumPerFamily">{consideredCategory.premiumPerFamily}</option>
</FormControl>
     
</Form>

      {selectedCategory === 'premiumPerCompany' && <CooporateOptical selectedCategory={selectedCategory}/>}
      {selectedCategory === 'premiumPerFamily' && <CooporateOpticalPerFamily selectedCategory={selectedCategory}/>}
    </div>
  );
}

export default Opticals;
