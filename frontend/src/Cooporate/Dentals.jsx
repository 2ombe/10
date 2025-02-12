import React, { useState } from 'react'
import { Form, FormControl } from 'react-bootstrap';
import Denta from './Denta';
import DentaPerFamily from './DentaPerFamily';

const consideredCategory = {
  premiumPerFamily: "Premium per family",
  premiumPerCompany: "Premium per Person"
};

function Dentals() {
    const [selectedCategory,setSelectedCategory]=useState('')

    const handleSelectedCategory=(event)=>{
        setSelectedCategory(event.target.value)
    }
  return (
    <div>
      <Form>
<FormControl as='select' value={selectedCategory} onChange={handleSelectedCategory}>

        <option value="">--Select an Option--</option>
        <option value="premiumPerCompany">{consideredCategory.premiumPerCompany}</option>
        <option value="premiumPerFamily">{consideredCategory.premiumPerFamily}</option>
</FormControl>
     
</Form>
{selectedCategory==="premiumPerCompany"&&<Denta selectedCategory={selectedCategory}/>}
{selectedCategory==="premiumPerFamily"&&<DentaPerFamily selectedCategory={selectedCategory}/>}
    </div>
  )
}

export default Dentals
