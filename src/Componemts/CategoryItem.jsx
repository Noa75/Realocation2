import React from 'react'
import './Realocation.css';

function CategoryItem({ image, label }) {
  
    return (
    <div className='card-container'>
        <img src={image} alt={label} className='card-image'/>
        <p className='card-label'>{label}</p>
    </div>
  );
}

export default CategoryItem;