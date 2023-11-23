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
const CancellationModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
    <Button onClick={handleOpen} style={{color:"white"}}>Políticas de Cancelación</Button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2" textAlign={"center"}>
          Políticas de Cancelación
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        
        Superados los 10 días de la fecha de la compra y hasta 48 hs de antelación
        del servicio, se deberá abonar una penalidad equivalente al 10% del servicio contratado,
        en concepto de gastos administrativos y financieros.
        <br />
        Si la cancelación fuera dentro de las 48 hs previas al servicio se considerará
        como un NO SERVICE. Se evaluarán casos de fuerza mayor debidamente acreditados 
        (por ejemplo enfermedad graves, fallecimiento, etc)
        El pedido se debe realizar por escrito a gloCast@gmail.com
        <br />
        <br />
        MODIFICACIÒN
        Se podrá modificar con gastos y penalidades con 48 horas de antelación al servicio,
        por escrito a gloCast@gmail.com
        <br />
        <br />
        NO SERVICE
        En caso de no tomar el servicio en la fecha, hora y lugar convenido se cobrara el 
        100% del costo de el servicio en concepto de gastos de cancelación.
        <br />
        <br />
        **La prestadora del servicio se reserva el derecho de modificar la presente política 
        de cancelación en cualquier momento, a su arbitrio, sin que ello implique el reconocimiento 
        de derecho alguno a favor del asiduo; en cuyo caso, el usuario será notificado de las mismas 
        y se le otorgará un plazo de 72hs. para que proceda a la cancelación de acuerdo a la política 
        existente al momento de la contratación; una vez vencido dicho plazo serán de plena aplicación 
        las nuevas políticas implementadas.
        </Typography>
      </Box>
    </Modal>
    </div>
  );
};

export default CancellationModal;