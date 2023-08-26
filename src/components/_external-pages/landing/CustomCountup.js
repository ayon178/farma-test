import { Box, Typography } from '@mui/material'
import dynamic from 'next/dynamic'

const CountUp = dynamic(() => import('react-countup'), { ssr: false })

export default function CustomCountUp({ count, countTitle }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography
        variant="h2"
        sx={{
          fontSize: {
            xs: '1rem',
            sm: '2rem',
            md: '2.5rem',
          },
          color: '#fff',
        }}
      >
        <CountUp end={count} duration={9} />
        k
        <sup style={{ fontSize: '24px', marginLeft: '8px' }}>+</sup>
      </Typography>
      <Typography
        variant="h6"
        sx={{
          fontSize: {
            xs: '0.5rem',
            sm: '.8rem',
            md: '1rem',
          },
          color: 'primary.main',
        }}
      >
        {countTitle}
      </Typography>
    </Box>
  )
}
