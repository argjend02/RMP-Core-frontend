// component
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard/app',
    icon: icon('ic_analytics'),
  },
    {
    title: 'admins',
    path: '/dashboard/admin',
    icon: icon('ic_user'),
  },
  {
    title: 'users',
    path: '/dashboard/user',
    icon: icon('ic_user'),
  },
    {
    title: 'professors',
    path: '/dashboard/professors',
    icon: icon('ic_professor'),
  },
  {
    title: 'universities',
    path: '/dashboard/universities',
    icon: icon('ic_uni'),
  },
  {
    title: 'departaments',
    path: '/dashboard/departments',
    icon: icon('ic_departments'),
  },
  {
    title: 'courses',
    path: '/dashboard/courses',
    icon: icon('ic_course'),
  },
  {
    title: 'news',
    path: '/dashboard/news',
    icon: icon('ic_news'),
  },

];

export default navConfig;
