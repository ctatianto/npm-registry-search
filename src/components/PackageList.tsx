// src/components/PackageList.tsx
import { Grid, Card, CardContent, Typography, CardActionArea, Box } from '@mui/material';

interface Package {
  package: {
    name: string;
    publisher?: {
      email: string;
      username?: string;
    };
    author?: {
      email: string;
      name?: string;
    };
    date: string;
    description?: string;
    version?: string;
    license?: string;
  };
}

interface PackageListProps {
  packages: Package[];
  onPackageClick: (packageName: string) => void;
}

const PackageList = ({ packages, onPackageClick }: PackageListProps) => {
  return (
    <Grid container spacing={3} sx={{ padding: 3 }}>
      {packages.map((pkg) => (
        <Grid item xs={12} sm={6} md={4} key={pkg.package.name}>
          <Card
            sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'scale(1.05)',
                boxShadow: 6,
              },
            }}
          >
            <CardActionArea
              onClick={() => onPackageClick(pkg.package.name)}
              sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
            >
              <CardContent>
                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 1 }}>
                  {pkg.package.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  Author: {pkg.package.publisher?.username || 'Unknown'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Last Updated: {new Date(pkg.package.date).toLocaleDateString()}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, textAlign: 'right' }}>
                <Typography variant="caption" color="text.secondary">
                  Click to view details
                </Typography>
              </Box>
            </CardActionArea>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PackageList;