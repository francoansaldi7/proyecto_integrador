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
const UseModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen} style={{color:"white"}}>Politicas de Uso</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
            Políticas de Uso
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          El uso que hagas de los Servicios y el Contenido debe seguir las 
          reglas establecidas en esta sección. 
          <br />
          Cualquier otro uso de los Servicios y el Contenido constituye 
          un incumplimiento material de este Contrato. GloCast puede 
          supervisar el uso que haces de los Servicios y el Contenido 
          para asegurarse de que sigues estas Reglas de uso.
          <br />
          - Cargar, anunciar, enviar por correo electrónico o de cualquier otra 
          forma transmitir cualquier tipo de contenido que sea ilegal, peligroso, 
          amenazante, abusivo, hostigador, tortuoso, difamatorio, vulgar, obsceno, 
          calumnioso, invasivo del derecho de propiedad, odioso, discriminatorio, 
          o de cualquier otra forma ofensivo.
          <br />
          - Publicar fotografías de menores de edad sin previa y expresa autorización 
          de sus representantes legales y de ninguna manera vulnerar los derechos de 
          menores de edad.
          <br />
          - Suplantar la identidad de otro usuario, o hacer declaraciones falsas sobre cualquier hecho.
          <br />
          - Publicar material protegido por las normas de derechos de autor sin 
          autorización previa del titular de derechos.
          <br />
          - Utilizar el portal para actos fraudulentos.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
};

export default UseModal;
