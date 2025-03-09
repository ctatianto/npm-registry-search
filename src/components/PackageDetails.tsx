// src/components/PackageDetails.tsx
import { Modal, Box, Typography, Paper, IconButton, Divider, Chip } from '@mui/material';
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
          maxHeight: '90vh', // Fixed height (80% of viewport height)
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 2, // Rounded corners
          overflowY: 'auto', // Enable vertical scrolling
          p: 3, // Padding
        }}
      >
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', mb: 2 }}>
          {packageData.name}
        </Typography>
        <Divider sx={{ mb: 2 }} /> {/* Divider for visual separation */}
        <Box sx={{ mb: 2 }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Author:</strong> {packageData.author?.name || 'Unknown'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Last Updated:</strong> {lastUpdated !== 'N/A' ? new Date(lastUpdated).toLocaleDateString() : 'N/A'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>Latest Version:</strong> {latestVersion || 'N/A'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            <strong>License:</strong> {packageData.license || 'N/A'}
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
          <strong>Description:</strong> {packageData.description || 'N/A'}
        </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} /> {/* Divider for visual separation */}
        {packageData.readme && (
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
              README
            </Typography>
            <Paper
              sx={{
                p: 2,
                bgcolor: 'background.default',
                overflowX: 'auto',
                maxHeight: '200px', // Fixed height for README section
              }}
            >
              <pre style={{ whiteSpace: 'pre-wrap', wordWrap: 'break-word', margin: 0 }}>
                {packageData.readme}
              </pre>
            </Paper>
          </Box>
        )}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Chip label="NPM Package" color="primary" />
        </Box>
      </Box>
    </Modal>
  );
};

export default PackageDetails;