// ----------------------------------------------------------------------
export const BASE_URL = 'https://pharma-test-backend.vercel.app/api/v1'
function path(root, sublink) {
  return `${root}${sublink}`
}

const ROOTS_DASHBOARD = '/dashboard'

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  Medicines: {
    medicineList: path(ROOTS_DASHBOARD, '/medicine-list'),
    addMedicine: path(ROOTS_DASHBOARD, '/add-medicine'),
  },
}
