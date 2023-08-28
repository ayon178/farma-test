import { motion } from 'framer-motion'
// material
import { styled } from '@mui/material/styles'
import { Box, Stack, Container, Typography } from '@mui/material'
import { varFadeInRight, varWrapEnter } from '@/components/animate'
import CustomCountUp from './CustomCountup'
import { CustomCardGlass } from '@/components/card/CustomCard'

// ----------------------------------------------------------------------

const RootStyle = styled(motion.div)(({ theme }) => ({
  position: 'relative',
  backgroundColor: theme.palette.grey[400],
  [theme.breakpoints.up('md')]: {
    top: 0,
    left: 0,
    width: '100%',
    height: '100vh',
    display: 'flex',
    position: 'fixed',
    alignItems: 'center',
  },
}))

const ContentStyle = styled(props => <Stack spacing={5} {...props} />)(
  ({ theme }) => ({
    zIndex: 10,
    maxWidth: 520,
    margin: 'auto',
    textAlign: 'center',
    position: 'relative',
    paddingTop: theme.spacing(25),
    paddingBottom: theme.spacing(15),
    [theme.breakpoints.up('md')]: {
      margin: 'unset',
      textAlign: 'left',
    },
  })
)

// ----------------------------------------------------------------------

export default function Hero() {
  const COUNT_TITLE = ['Brands', 'Generic', 'Pharmaceutical ']
  const COUNT = [35, 5, 2]
  const countData = [...Array(3)].map((_, index) => ({
    count: COUNT[index],
    countTitle: COUNT_TITLE[index],
  }))

  return (
    <>
      <RootStyle initial="initial" animate="animate" variants={varWrapEnter}>
        <div className={`heroOverlay`}></div>

        <Container maxWidth="lg">
          <ContentStyle>
            <motion.div variants={varFadeInRight}>
              <Typography variant="h1" sx={{ color: 'common.white' }}>
                Explore <br />
                Order & Heal <br />
                <Typography
                  component="span"
                  variant="h1"
                  sx={{ color: 'primary.main' }}
                >
                  MediShop360
                </Typography>
              </Typography>
            </motion.div>

            <motion.div variants={varFadeInRight}>
              <Typography sx={{ color: 'common.white' }}>
                Your Trusted Online Pharmacy: Browse, Search, and Purchase
                Medicine with Ease on MediShop360
              </Typography>
            </motion.div>

            {/* Counter */}
            {/* <Stack
              component={motion.div}
              variants={varFadeInRight}
              direction="row"
              spacing={1}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              {countData.map((count, index) => (
                <CustomCardGlass key={index} sx={{ p: 2, width: '220px' }}>
                  <CustomCountUp
                    count={count.count}
                    countTitle={count.countTitle}
                  />
                </CustomCardGlass>
              ))}
            </Stack> */}
          </ContentStyle>
        </Container>
      </RootStyle>
      <Box sx={{ height: { md: '100vh' } }} />
    </>
  )
}
