import { Switch, IconButton, TextField } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import NearMeIcon from '@mui/icons-material/NearMe';
import React, { useState } from 'react';
import CircleButton from './CircleButton';
import SecButton from './SecButton';
import PrimeButton from './PrimeButton';
import { useLocation, useNavigate } from 'react-router-dom';
import TaskBoard from './TaskBoard';


export default function EditTask(props) {
  const {parseUserData,userData} = props;
  const task = state.task;
  const [active, setActive] = useState(task?task.priority:null);
  const navigate = useNavigate();
  const toggleActive = (label) => {
    setActive(active === label ? null : label)
  }
  const { state } = useLocation();
  

  const [title, setTitle] = useState(task.title || "כותרת משימה");
  const [description, setDescription] = useState(task.description || "תיאור משימה");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingDesc, setIsEditingDesc] = useState(false);


  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleDescClick = () => {
    setIsEditingDesc(true);
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleDescChange = (event) => {
    setDescription(event.target.value);
  };

  const handleBlur = () => {
    setIsEditingTitle(false);
    setIsEditingDesc(false);
  };

  return (
    <div className='edit-container'>
      <div style={{ borderBottom: '1px solid #b3ccef', padding: '8px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '0 8px' }}>
          <IconButton onClick={() => navigate("/tasks-board")} style={{ transform: 'scaleX(-1)', position: 'absolute', left: '330px' }}>
            <ArrowBackIcon />
          </IconButton>
          {isEditingTitle ? (
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <h4 style={{ color: '#0C8CE9' }} onClick={handleTitleClick}>{title}</h4>
          )}
        </div>
        <div>
          {isEditingDesc ? (
            <input
              type="text"
              value={description}
              onChange={handleDescChange}
              onBlur={handleBlur}
              autoFocus
            />
          ) : (
            <p style={{ color: '#0C8CE9' }} onClick={handleDescClick}>{task.descriptionTask}</p>
          )}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Switch />
          <span>
            יום אחד
          </span>
        </div>
        <button>
          <div style={{ width: '250px', height: '35px', border: '1px solid #b3ccef', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 'bold' }}>
              17.1.24
            </div>
            <div>התחלה</div>
          </div>
        </button>
        <button>
          <div style={{ width: '250px', height: '35px', border: '1px solid #b3ccef', borderRadius: '8px', padding: '12px 16px', display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ fontWeight: 'bold' }}>
              17.1.24
            </div>
            <div>סיום</div>
          </div>
        </button>
      </div>
      <div style={{ borderBottom: '1px solid #b3ccef', padding: '8px' }}>
        <p style={{ textAlign: 'right' }}>:דחיפות משימה</p>
        <div style={{ display: 'flex', flexDirection: 'row-reverse', justifyContent: 'flex-start', gap: '8px', alignItems: 'center' }}>
          <CircleButton color="#e55c5c" label="דחוף" onClick={toggleActive} active={active === 'דחוף' || active === 3} />
          <CircleButton color="#e5e05c" label="חשוב" onClick={toggleActive} active={active === 'חשוב' || active === 2} />
          <CircleButton color="#67e55c" label="כדאי" onClick={toggleActive} active={active === 'כדאי' || active === 1} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Switch defaultChecked />
          <span>
            קבלת התראה
          </span>
        </div>
      </div>
      <div style={{ marginTop: '16px' }}>
        <p style={{ display: 'flex', justifyContent: 'flex-end' }}>הערות אישיות</p>
        <TextField
          fullWidth
          multiline
          rows={8}
          placeholder="הערות לעצמך"
          variant="outlined"
          style={{ margin: '0px', direction: 'rtl', marginBottom: '16px' }} />
      </div>
      <PrimeButton btntxt="שמירה" />
    </div>
  )
}
