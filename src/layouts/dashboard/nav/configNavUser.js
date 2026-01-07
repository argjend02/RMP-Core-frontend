// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfigUser = [
  {
    title: 'dashboard User',
    path: '/dashboardUser/appUser',
    icon: icon('ic_analytics'),
  },
  {
    title: 'professors',
    path: '/dashboardUser/professorsUser',
    icon: icon('ic_professor'),
  },
  {
    title: 'universities',
    path: '/dashboardUser/universitiesUser',
    icon: icon('ic_uni'),
  },

];

export default navConfigUser;
