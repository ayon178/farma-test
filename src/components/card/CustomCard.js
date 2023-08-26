// material
import { Card } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export default function CustomCard({ children, sx }) {
    const theme = useTheme();

    return (
        <Card
            sx={{
                p: 5,
                boxShadow: theme.customShadows.z4,
                ...sx,
            }}
        >
            {children}
        </Card>
    );
}
export function CustomCardGlass({ children, sx }) {

    return (
        <Card
            className='glass_effect'
            sx={{
                p: 5,
            
                ...sx,
            }}
        >
            {children}
        </Card>
    );
}