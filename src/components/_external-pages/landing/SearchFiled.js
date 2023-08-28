import { Container, Grid } from '@mui/material'
import React from 'react'
import MedicineTable from './MedicineTable'

const SearchFiled = ({
  medicine,
  setSearchTerm,
  setLimit,
  setPage,
  loader,
  page,
}) => {
  return (
    <Container sx={{ mt: 5 }} className="min-h-screen">
      <marquee className="border rounded p-1 mb-2 marquee bg-gray-100">
        Offering a wide range of quality medicines for your well-being. Trusted
        brands, affordable prices, and fast delivery on essential
        pharmaceuticals. Your health is our priority, and we're here to provide
        expert care with a comprehensive selection of medicines. Discover relief
        and healing through our trusted collection of pharmaceuticals. Shop
        online with us for a healthier tomorrow!
      </marquee>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <form className="flex items-center">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className=" absolute inset-y-0 left-0 flex items-center pl-3 pr-3 pointer-events-none bg-[#00AB55] text-white tracking-wider">
                Filter
              </div>
              <input
                onChange={e => setSearchTerm(e.target.value)}
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-md font-semibold  focus:ring-[#00AB55] focus:border-[#00AB55] block w-full pl-20 p-3 "
                placeholder="Search medicine..."
                required
              />
            </div>
          </form>
        </Grid>
        <Grid item xs={12}>
          <MedicineTable
            tableData={medicine.data}
            setPage={setPage}
            setLimit={setLimit}
            loader={loader}
            totalData={medicine.meta.total}
            page={page}
          />
        </Grid>
      </Grid>
    </Container>
  )
}

export default SearchFiled
