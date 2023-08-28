import { addMedicine } from '@/api/medicine'
import Page from '@/components/Page'
import CustomCard from '@/components/card/CustomCard'
import useSettings from '@/hooks/useSettings'
import DashboardLayout from '@/layouts/dashboard'
import {
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'
import React from 'react'

const AddMedicine = () => {
  const { themeStretch } = useSettings()
  const [formData, setFormData] = React.useState({
    brandName: '',
    genericName: '',
    company: '',
    form: '',
    variant: '',
    unitPrice: {
      price: '',
      title: '',
    },
    quantity: '',
  })

  const handleUnitPrice = event => {
    const { name, value } = event.target
    if (name === 'unitPriceTitle') {
      setFormData({
        ...formData,
        unitPrice: {
          ...formData.unitPrice,
          title: value,
        },
      })
    } else {
      setFormData({
        ...formData,
        unitPrice: {
          ...formData.unitPrice,
          price: value,
        },
      })
    }
  }

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const response = await addMedicine(formData)
    if (response?.status) {
      alert('Medicine Added Successfully')
    }

    //   reset form
    setFormData({
      brandName: '',
      genericName: '',
      company: '',
      form: '',
      variant: '',
      unitPrice: {
        price: '',
        title: '',
      },
      quantity: '',
    })
  }
  return (
    <DashboardLayout>
      <Page title="Add Medicine | Pharma Test">
        <Container maxWidth={themeStretch ? false : 'xl'}>
          <CustomCard sx={{ maxWidth: '100%' }}>
            <Typography variant="h5" paragraph>
              Add Medicine
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ maxWidth: '100%' }}>
                    <TextField
                      onChange={handleChange}
                      fullWidth
                      label="Brand Name"
                      name="brandName"
                      required
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ maxWidth: '100%' }}>
                    <TextField
                      onChange={handleChange}
                      fullWidth
                      label="Generic Name"
                      name="genericName"
                      required
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ maxWidth: '100%' }}>
                    <TextField
                      onChange={handleChange}
                      fullWidth
                      label="Company"
                      name="company"
                      required
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ maxWidth: '100%' }}>
                    <InputLabel>Form</InputLabel>
                    <Select
                      name="form"
                      label="Form"
                      value={formData.form}
                      onChange={handleChange}
                    >
                      <MenuItem value="syrup">Syrup</MenuItem>
                      <MenuItem value="tablet">Tablet</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ maxWidth: '100%' }}>
                    <TextField
                      onChange={handleChange}
                      fullWidth
                      label="Variant"
                      name="variant"
                      required
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ maxWidth: '100%' }}>
                    <TextField
                      onChange={handleUnitPrice}
                      fullWidth
                      label="Unit Price Title"
                      name="unitPriceTitle"
                      required
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ maxWidth: '100%' }}>
                    <TextField
                      onChange={handleUnitPrice}
                      fullWidth
                      label="Unit Price"
                      name="unitPrice"
                      required
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <FormControl fullWidth sx={{ maxWidth: '100%' }}>
                    <TextField
                      onChange={handleChange}
                      fullWidth
                      label="Quantity"
                      name="quantity"
                      required
                      variant="outlined"
                    />
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                  >
                    Add Medicine
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CustomCard>
        </Container>
      </Page>
    </DashboardLayout>
  )
}

export default AddMedicine
