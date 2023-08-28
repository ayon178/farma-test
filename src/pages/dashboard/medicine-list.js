import Page from '@/components/Page'
import Scrollbar from '@/components/Scrollbar'
import useSettings from '@/hooks/useSettings'
import DashboardLayout from '@/layouts/dashboard'
import { BASE_URL } from '@/routes/paths'
import {
  Box,
  Container,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import NextImage from 'next/image'
import syrupImage from '@/assets/syrup.png'
import tabletImage from '@/assets/tablet.png'

// ----------------------------------------------------------------------

export default function MedicineList({ initialMedicine }) {
  const { themeStretch } = useSettings()
  const [medicine, setMedicine] = useState(initialMedicine)
  const [page, setPage] = useState(1)

  const handleChangePage = (_, newPage) => {
    setPage(newPage)
  }

  return (
    <DashboardLayout>
      <Page title="Medicine List | Pharma Test">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <Typography variant="h3" component="h1" paragraph>
            Available Medicine List
          </Typography>
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
                    <TableCell align="center">Variant</TableCell>
                    <TableCell align="center">Price</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {medicine?.data?.map((row, index) => (
                    <TableRow className="border-bottom-cell" key={index}>
                      <TableCell>{index + 1}</TableCell>
                      <TableCell>{row.brandName}</TableCell>
                      <TableCell align="center">{row.genericName}</TableCell>
                      <TableCell align="center">{row.company}</TableCell>
                      <TableCell align="center">{row.form}</TableCell>
                      <TableCell align="center">{row.variant}</TableCell>
                      <TableCell align="center" className="no_word_break">
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                          }}
                        >
                          <NextImage
                            src={
                              row.form === 'syrup' ? syrupImage : tabletImage
                            }
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
                        {row.quantity}{' '}
                        {row.form === 'syrup' ? 'Bottles' : 'Pieces'}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Pagination
                  count={Math.ceil(medicine?.meta?.total / 10)}
                  page={page}
                  onChange={handleChangePage}
                />
              </Box>
            </TableContainer>
          </Scrollbar>
        </Container>
      </Page>
    </DashboardLayout>
  )
}

export async function getServerSideProps() {
  const apiUrl = `${BASE_URL}/medicine`
  const res = await fetch(apiUrl)
  const initialMedicine = await res.json()

  return {
    props: {
      initialMedicine,
    },
  }
}
