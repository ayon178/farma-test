import Page from '@/components/Page'
import Hero from '@/components/_external-pages/landing/Hero'
import SearchFiled from '@/components/_external-pages/landing/SearchFiled'
import MainLayout from '@/layouts/main'
import { BASE_URL } from '@/routes/paths'
import { styled } from '@mui/material/styles'
import { useEffect, useState } from 'react'

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%',
})

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default,
}))

// ----------------------------------------------------------------------

export default function LandingPage({ initialMedicine }) {
  const [medicine, setMedicine] = useState(initialMedicine)
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    setLoader(true)
    async function fetchData() {
      const apiUrl = `${BASE_URL}/medicine?searchTerm=${searchTerm}&page=${page}&limit=${limit}`
      const res = await fetch(apiUrl)
      const data = await res.json()
      setMedicine(data)
      setLoader(false)
    }

    fetchData()
  }, [searchTerm, page, limit])

  return (
    <MainLayout>
      <RootStyle
        title="The starting point for your next project | Minimal-UI"
        id="move_top"
      >
        <Hero />
        <ContentStyle>
          <SearchFiled
            medicine={medicine}
            setSearchTerm={setSearchTerm}
            setLimit={setLimit}
            setPage={setPage}
            loader={loader}
            page={page}
          />
        </ContentStyle>
      </RootStyle>
    </MainLayout>
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
