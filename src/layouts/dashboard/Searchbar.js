import { Icon } from '@iconify/react'
import { useState } from 'react'
import searchFill from '@iconify/icons-eva/search-fill'
// material
import { styled, alpha } from '@mui/material/styles'
import {
  Box,
  Input,
  Slide,
  InputAdornment,
  ClickAwayListener,
  Typography,
} from '@mui/material'
// components
import { MIconButton } from '../../components/@material-extend'

// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64
const APPBAR_DESKTOP = 92

const SearchbarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APPBAR_MOBILE,
  backdropFilter: 'blur(10px)',
  WebkitBackdropFilter: 'blur(10px)',
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.2)}`,
  [theme.breakpoints.up('md')]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}))

// ----------------------------------------------------------------------

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(prev => !prev)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <MIconButton onClick={handleOpen} sx={{ ml: 5 }}>
            <Icon icon={searchFill} width={20} height={20} />
            <Typography
              variant="subtitle2"
              sx={{ ml: 1, color: 'text.secondary' }}
            >
              Search…
            </Typography>
          </MIconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchbarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder="Search…"
              startAdornment={
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: '#fff', width: 20, height: 20 }}
                  />
                </InputAdornment>
              }
              sx={{ mr: 1, fontWeight: 'fontWeightBold', color: '#fff' }}
            />
          </SearchbarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  )
}
