import { Grid, Card, CardContent, Typography } from '@mui/material';

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
        keywords?: string[];
        links?: {
          npm?: string;
          homepage?: string;
          repository?: string;
          bugs?: string;
        };
      };
}

interface PackageListProps {
  packages: Package[];
  onPackageClick: (packageName: string) => void;
}

const PackageList = ({ packages, onPackageClick }: PackageListProps) => {
  return (
    <Grid container spacing={2}>
      {packages.map((pkg) => (
        <Grid item xs={12} sm={6} md={4} key={pkg.package.name}>
          <Card onClick={() => onPackageClick(pkg.package.name)} style={{ cursor: 'pointer' }}>
            <CardContent>
              <Typography variant="h6">{pkg.package.name}</Typography>
              <Typography>Author: {pkg.package.publisher?.username || 'Unknown'}</Typography>
              <Typography>Last Updated: {new Date(pkg.package.date).toLocaleDateString()}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default PackageList;