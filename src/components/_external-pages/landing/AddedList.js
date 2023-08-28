import Scrollbar from '@/components/Scrollbar'
import Button from '@/theme/overrides/Button'
import {
  Box,
  FormControl,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import NextImage from 'next/image'
import syrupImage from '@/assets/syrup.png'
import tabletImage from '@/assets/tablet.png'

const AddedList = ({ addedMedicine, setAddedMedicine }) => {
  const [rowQuantities, setRowQuantities] = useState({})

  const handleRemoveMedicine = id => {
    const remainingMedicine = addedMedicine.filter(item => item._id !== id)
    setAddedMedicine(remainingMedicine)
  }

  return (
    <>
      <Typography variant="h4" sx={{ mt: 5, textAlign: 'center' }}>
        Ready for Invoice
      </Typography>
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
                    <TextField
                      size="small"
                      label="Quantity"
                      type="number"
                      sx={{ width: 100 }}
                      onChange={e => {
                        const newQuantities = { ...rowQuantities }
                        newQuantities[index] = e.target.value
                        if (newQuantities[index] < 1) newQuantities[index] = 1
                        if (newQuantities[index] > row.quantity)
                          newQuantities[index] = row.quantity
                        setRowQuantities(newQuantities)
                        row.taken = Number(newQuantities[index])
                      }}
                      value={rowQuantities[index] || 1}
                    />
                  </FormControl>
                </TableCell>
                <TableCell align="center">
                  {(
                    (rowQuantities[index] || 1) * Number(row.unitPrice.price)
                  ).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Tooltip title="Delete">
                    <IconButton onClick={() => handleRemoveMedicine(row._id)}>
                      <DeleteIcon sx={{ color: 'red' }} />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default AddedList
