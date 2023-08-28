// routes
import { PATH_DASHBOARD } from '../../routes/paths'
// components
import SvgIconStyle from '../../components/SvgIconStyle'

// ----------------------------------------------------------------------

const getIcon = name => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: '100%', height: '100%' }}
  />
)

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
}

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Medicines',
    items: [
      {
        title: 'Medicine List',
        path: PATH_DASHBOARD.Medicines.medicineList,
        icon: ICONS.dashboard,
      },
      {
        title: 'Add Medicine',
        path: PATH_DASHBOARD.Medicines.addMedicine,
        icon: ICONS.ecommerce,
      },
    ],
  },
]

export default sidebarConfig
