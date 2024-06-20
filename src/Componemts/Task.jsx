import React from 'react'
import './Realocation.css';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import IconButton from '@mui/material/IconButton';

export default function Task({ date, label, description, onDelete }) {
  return (
    <div className="task-container" >
        <IconButton aria-label="delete" size="small" className="task-delete-button"  onClick={() => onDelete(label)} >
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
