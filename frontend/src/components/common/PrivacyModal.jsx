import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "40%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const PrivacyModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      
      <Button onClick={handleOpen} style={{color:"white"}}>Privacidad</Button>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
            Políticas de Privacidad
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            GloCast se compromete a conservar los datos personales y garantizar
            la privacidad de todos sus usuarios y usuarias, de la forma prevista
            en esta Política de Privacidad y Protección de Datos Personales
            (“Política de Privacidad”).
            Al prorcionarnos datos personales, ,si algunos de ellos pudiendo
            ser sensibles, a través de esta página, usted acepta los términos y
            condiciones de la presente Política de Privacidad.
            <br></br>
            Por sitio web o aplicación de GloCast se entiende toda
            aplicación informática gestionada por GloCast,
            en la que se indique que la presente Política de privacidad le es de
            aplicación como responsable de bases de datos, GloCast garantiza que los
            procesos internos propios de las bases de datos cumplen con las
            obligaciones legales de seguridad y confidencialidad. 
            <br />
            GloCast toma y mantiene todas las medidas necesarias para
            mantener la seguridad de su información personal brindada.
            Adoptamos las medidas de seguridad adecuadas para garantizar que
            guardamos tus datos de forma segura, precisa y actualizada, y que
            sólo los guardamos en la medida de lo razonable y necesario. Sin
            embargo, en razón del estado actual de la tecnología, GloCast no puede garantizar en un 100% que el acceso no
            autorizado nunca ocurrirá.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default PrivacyModal;
