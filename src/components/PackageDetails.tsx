// src/components/PackageDetails.tsx
import { Modal, Box, Typography, Paper, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface PackageDetailsProps {
  packageData: {
    name: string;
    author?: { name: string };
    time?: { [key: string]: string }; // Last updated dates for versions
    description?: string;
    license?: string;
    readme?: string;
    versions?: { [key: string]: any }; // All versions
  };
  open: boolean;
  onClose: () => void;
}

const PackageDetails = ({ packageData, open, onClose }: PackageDetailsProps) => {
  // Get the latest version or fallback to 'N/A'
  const latestVersion = packageData.versions ? Object.keys(packageData.versions).pop() : null;

  // Get the last updated date for the latest version or fallback to 'N/A'
  const lastUpdated = latestVersion && packageData.time ? packageData.time[latestVersion] : 'N/A';

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          maxWidth: '800px',
          maxHeight: '80vh', // Fixed height (80% of viewport height)
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          outline: 'none',
          overflowY: 'auto', // Enable vertical scrolling
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4">{packageData.name}</Typography>
        <Typography>Author: {packageData.author?.name || 'Unknown'}</Typography>
        <Typography>Last Updated: {lastUpdated !== 'N/A' ? new Date(lastUpdated).toLocaleDateString() : 'N/A'}</Typography>
        <Typography>Latest Version: {latestVersion || 'N/A'}</Typography>
        <Typography>License: {packageData.license || 'N/A'}</Typography>
        <Typography>Description: {packageData.description || 'N/A'}</Typography>
        {packageData.readme && (
          <div>
            <Typography variant="h6">README</Typography>
            <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word' }}>{packageData.readme}</pre>
          </div>
        )}
      </Box>
    </Modal>
  );
};

export default PackageDetails;