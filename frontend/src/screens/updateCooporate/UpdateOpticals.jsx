import React, { useState } from 'react';
import { Form, FormControl } from 'react-bootstrap';
import UpdateCooporateOptical from './UpdateCorporateOptical';
import UpdateCooporateOpticalPerPerson from './UpdateCorporateOpticalPerPerson';

const consideredCategory = {
  premiumPerFamily: "Premium per family",
  premiumPerPerson: "Premium per Person"
};

function UpdateOpticals() {
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

      {selectedCategory === 'premiumPerPerson' && <UpdateCooporateOpticalPerPerson selectedCategory={selectedCategory}/>}
      {selectedCategory === 'premiumPerFamily' && <UpdateCooporateOptical selectedCategory={selectedCategory}/>}
    </div>
  );
}

export default UpdateOpticals;
