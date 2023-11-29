
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';

import  WhatsappIcon  from "../../assets/whatsapp.png";

const AddButtonWhatApp = () => {
    return (
        <Box sx={{height: 80, transform: 'translateZ(0px)', flexGrow: 1 }}>
          <SpeedDial
            ariaLabel="SpeedDial basic example"
            sx={{ position: 'absolute', bottom: 16, right: 16 }}
            icon=
             <a href="https://wa.me/+5493517010836?text=Hola,%20En%20que%20puedo%20ayudarte?" target="_blank" rel="noreferrer">
            <img src={WhatsappIcon} alt=""></img>
          </a>
          >
          </SpeedDial>
        </Box>
      );
    }

export default AddButtonWhatApp