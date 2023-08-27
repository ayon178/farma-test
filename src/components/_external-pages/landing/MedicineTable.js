// material
import Scrollbar from '@/components/Scrollbar'
import {
  Table,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableContainer,
  Button,
  Box,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import NextImage from 'next/image'
import syrupImage from '@/assets/syrup.png'
import tabletImage from '@/assets/tablet.png'

// ----------------------------------------------------------------------

export default function MedicineTable({ tableData, setPage, setLimit }) {
  return (
    <Scrollbar>
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
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData?.map((row, index) => (
              <TableRow key={index}>
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
                    <Box component="span" sx={{ ml: 1 }}>
                      <span>{row.unitPrice.title}</span> : ৳{' '}
                      <span>{row.unitPrice.price}</span>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  <Button variant="contained" color="primary" size="small">
                    <AddIcon /> <span className="pr-2">Add</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Scrollbar>
  )
}
