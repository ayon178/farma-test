import { PATH_DASHBOARD } from '@/routes/paths'

function Page() {
  return null
}

export default Page

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: PATH_DASHBOARD.Medicines.medicineList,
      permanent: false,
    },
  }
}
