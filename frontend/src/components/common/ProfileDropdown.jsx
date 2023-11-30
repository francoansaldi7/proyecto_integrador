import * as React from 'react';
import '../../App.css';
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';


function ProfileDropdown({initials}) {    
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 
  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        {initials}
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >       
        <MenuItem onClick={() => navigate("/") }>Mi perfil</MenuItem>      
        <MenuItem onClick={() => navigate("/favServices")}>Favoritos</MenuItem>
        <MenuItem onClick={() => navigate("/favServices") }>Mis reservas</MenuItem>
        <MenuItem onClick={() => navigate("/favServices") }>Cerrar sesión</MenuItem>
      </Menu>
    </div>
  );
  
}

export default ProfileDropdown;