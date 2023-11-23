
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import PrivacyModal from './PrivacyModal';
import CancellationModal from './CancellationModal';
import UseModal from './UseModal';

const PoliciesAndConditions = () => {

  return (
   <Box sx={{ width: '100%', bgcolor: 'bg-secondary-dark/50'}}>
      <Tabs centered>
        <PrivacyModal/>
        <CancellationModal/>
        <UseModal/>
      </Tabs>
    </Box>
   
  );
}

export default PoliciesAndConditions