import React from 'react'
import './Realocation.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

export default function Task(props) {
  const { date, label, description, onDelete, onClick } = props;
  const handleDelete = (e, label) => {
    e.stopPropagation();
    onDelete(label);
  }
  console.log(description);
  return (
    <div className="task-container" onClick={onClick} >
        <IconButton aria-label="delete" size="small" className="task-delete-button"  onClick={(e) => handleDelete(e, label)} >
        <DeleteOutlineIcon style={{color:'#1170f4'}} />
      </IconButton>
      <div className="task-content">
        <h3 className="task-label">{label}</h3>
        <p className="task-description">{description}</p>
      </div>
      <p className="task-date">{date}</p>
    </div>
  )
}
