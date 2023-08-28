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
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete'
import NextImage from 'next/image'
import syrupImage from '@/assets/syrup.png'
import tabletImage from '@/assets/tablet.png'
import { useRouter } from 'next/router'
import { updateMedicine } from '@/api/medicine'
import { useSession, signIn } from 'next-auth/react'

const AddedList = ({ addedMedicine, setAddedMedicine }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const [rowQuantities, setRowQuantities] = useState({})
  const [staticDiscount, setStaticDiscount] = useState(0)
  const [parcentDiscount, setParcentDiscount] = useState(7)
  const [total, setTotal] = useState(
    addedMedicine.reduce(
      (acc, item) => acc + (item.taken || 1) * item.unitPrice.price,
      0
    )
  )
  const [discountIn, setDiscountIn] = useState('parcent')

  const handleChange = (event, newAlignment) => {
    setDiscountIn(newAlignment)
  }

  useEffect(() => {
    setTotal(
      addedMedicine.reduce(
        (acc, item) => acc + (item.taken || 1) * item.unitPrice.price,
        0
      )
    )
  }, [addedMedicine, rowQuantities])

  const handleRemoveMedicine = id => {
    const remainingMedicine = addedMedicine.filter(item => item._id !== id)
    setAddedMedicine(remainingMedicine)
  }

  const handlePrint = () => {
    if (!session) {
      signIn('google')
      return
    }
    const dataArray = encodeURIComponent(JSON.stringify(addedMedicine))
    const userName = encodeURIComponent(session.user.name)
    const userEmail = encodeURIComponent(session.user.email)
    const subtotal = staticDiscount
      ? (total - staticDiscount).toFixed(2)
      : (total - total * (Number(parcentDiscount) * 0.01 || 0.07)).toFixed(2)
    const subtotalEncoded = encodeURIComponent(subtotal)

    addedMedicine.forEach(async item => {
      updateMedicine(item._id, item.quantity - (item.taken || 1))
    })

    router.push({
      pathname: '/invoice',
      query: {
        dataArray,
        userName,
        userEmail,
        subtotal: subtotalEncoded,
      },
    })
  }

  return (
    <>
      <Typography variant="h4" sx={{ mt: 5, textAlign: 'center' }}>
        Ready for Invoice
      </Typography>
      <TableContainer sx={{ minWidth: 800, mt: 3 }}>
        <Table className="border-b">
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
      {addedMedicine?.length !== 0 && (
        <>
          {/* Total */}
          <Typography
            sx={{
              textAlign: 'right',
              marginRight: 2,
              marginTop: 2,
              marginBottom: 1,
            }}
            variant="body2"
            className="font-semibold"
            paragraph
          >
            {`Total: ৳ ${total}`}
          </Typography>

          {/* Discount */}
          {staticDiscount ? (
            <Typography
              sx={{ textAlign: 'right', marginRight: 2, marginBottom: 1 }}
              variant="body2"
              className="font-semibold"
              paragraph
            >
              {`Taken Discount: ৳ ${Number(staticDiscount)?.toFixed(2)}`}
            </Typography>
          ) : (
            <Typography
              sx={{ textAlign: 'right', marginRight: 2, marginBottom: 1 }}
              variant="body2"
              className="font-semibold"
              paragraph
            >
              {`${parcentDiscount}% Discount: ৳ ${(
                total * (Number(parcentDiscount) * 0.01 || 0.07)
              ).toFixed(2)}`}
            </Typography>
          )}

          {/* Amount to pay */}
          {staticDiscount ? (
            <Typography
              sx={{ textAlign: 'right', marginRight: 2, marginBottom: 1 }}
              variant="body2"
              className="font-semibold"
              paragraph
            >
              {`Amount to Pay: ৳ ${(total - staticDiscount).toFixed(2)}`}
            </Typography>
          ) : (
            <Typography
              sx={{ textAlign: 'right', marginRight: 2 }}
              variant="body2"
              className="font-semibold"
              paragraph
            >
              {`Amount to Pay: ৳ ${(
                total -
                total * (Number(parcentDiscount) * 0.01 || 0.07)
              ).toFixed(2)}`}
            </Typography>
          )}

          {/* Toggler */}
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', mr: 2, mb: 2 }}
          >
            <ToggleButtonGroup
              color="primary"
              value={discountIn}
              exclusive
              onChange={handleChange}
              aria-label="Platform"
              size="small"
            >
              <ToggleButton value="parcent">
                Discount in Parcentage
              </ToggleButton>
              <ToggleButton value="static">Static Discount</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Parcent Discount */}
          {discountIn === 'parcent' && (
            <TextField
              sx={{ width: 200, ml: 'auto', display: 'block', marginRight: 2 }}
              label="Discount parcent"
              size="small"
              type="number"
              variant="outlined"
              value={parcentDiscount || (total * 0.07).toFixed(2)}
              onChange={e => {
                if (e.target.value < 0) {
                  alert('Discount can not be negative')
                  return
                } else if (e.target.value >= total) {
                  alert('Discount can not be greater than total amount')
                  return
                }
                setParcentDiscount(e.target.value)
              }}
            />
          )}

          {/* Static discount */}
          {discountIn === 'static' && (
            <TextField
              sx={{ width: 200, ml: 'auto', display: 'block', marginRight: 2 }}
              label="Discount ৳"
              size="small"
              type="number"
              variant="outlined"
              value={staticDiscount || (total * 0.07).toFixed(2)}
              onChange={e => {
                if (e.target.value < 0) {
                  alert('Discount can not be negative')
                  return
                } else if (e.target.value >= total) {
                  alert('Discount can not be greater than total amount')
                  return
                }
                setStaticDiscount(e.target.value)
              }}
            />
          )}
        </>
      )}
      <button
        onClick={handlePrint}
        className="bg-[#00AB55] text-white px-5 py-1 rounded mt-4 ml-auto block mr-4 delay-75 hover:bg-[#21744a]"
      >
        Print
      </button>
    </>
  )
}

export default AddedList
