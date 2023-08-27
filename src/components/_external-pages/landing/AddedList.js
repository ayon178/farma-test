import Scrollbar from '@/components/Scrollbar'
import Button from '@/theme/overrides/Button'
import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from '@mui/material'
import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import NextImage from 'next/image'
import syrupImage from '@/assets/syrup.png'
import tabletImage from '@/assets/tablet.png'

const AddedList = ({ addedMedicine }) => {
  const [quantity, setQuantity] = React.useState(null)
  console.log(addedMedicine, 'addedMedicine')
  const handleRemoveMedicine = () => {}
  return (
    // <Scrollbar>
    <TableContainer sx={{ minWidth: 800, mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Serial</TableCell>
            <TableCell>Brand</TableCell>
            <TableCell align="center">Generic</TableCell>
            <TableCell align="center">Company</TableCell>
            <TableCell align="center">Form</TableCell>
            <TableCell align="center">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Subtotal</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {addedMedicine?.map((row, index) => (
            <TableRow className="border-bottom-cell" key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{row.brandName}</TableCell>
              <TableCell align="center">{row.genericName}</TableCell>
              <TableCell align="center">{row.company}</TableCell>
              <TableCell align="center">{row.form}</TableCell>
              <TableCell align="center">
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                  }}
                >
                  <NextImage
                    src={row.form === 'syrup' ? syrupImage : tabletImage}
                    width={20}
                    height={20}
                  />
                  <Box
                    className="no_word_break"
                    component="span"
                    sx={{ ml: 1 }}
                  >
                    <span>{row.unitPrice.title}</span> : ৳{' '}
                    <span>{row.unitPrice.price}</span>
                  </Box>
                </Box>
              </TableCell>
              <TableCell align="center">
                <FormControl variant="outlined" size="small">
                  {/* <InputLabel>Quantity</InputLabel> */}
                  {/* <Select
                    name="quantity"
                    value={quantity || ''}
                    label="Quantity"
                    onChange={e => setQuantity(e.target.value)}
                  >
                    <MenuItem value={10}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                  </Select> */}

                  <TextField
                    size="small"
                    label="Quantity"
                    type="number"
                    sx={{ width: 100 }}
                    onChange={e => setQuantity(e.target.value)}
                    value={quantity || ''}
                  />
                </FormControl>
              </TableCell>
              <TableCell align="center">100</TableCell>
              <TableCell align="right">
                <Tooltip title="Delete">
                  <IconButton onClick={handleRemoveMedicine}>
                    <DeleteIcon sx={{ color: 'red' }} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    // </Scrollbar>
  )
}

export default AddedList
