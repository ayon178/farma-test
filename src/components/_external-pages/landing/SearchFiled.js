import { Box, Container, Grid } from '@mui/material'
import React from 'react'

const SearchFiled = ({ medicine, setSearchTerm }) => {
  return (
    <Container sx={{ mt: 5 }}>
      <Grid container spacing={5}>
        <Grid item xs={12}>
          <form class="flex items-center">
            <label for="simple-search" class="sr-only">
              Search
            </label>
            <div class="relative w-full">
              <div class=" absolute inset-y-0 left-0 flex items-center pl-3 pr-3 pointer-events-none bg-[#00AB55] text-white tracking-wider">
                Filter
              </div>
              <input
                onChange={e => setSearchTerm(e.target.value)}
                type="text"
                id="simple-search"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-md font-semibold  focus:ring-[#00AB55] focus:border-[#00AB55] block w-full pl-20 p-3 "
                placeholder="Search medicine..."
                required
              />
            </div>
          </form>
        </Grid>
        <Grid item xs={12} >
          {medicine.data.map((item, index) => (
            <h1 key={index}>{item.brandName}</h1>
          ))}
        </Grid>
      </Grid>
    </Container>
  )
}

export default SearchFiled
