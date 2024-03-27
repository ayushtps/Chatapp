import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupsIcon from '@mui/icons-material/Groups';
import ForumIcon from '@mui/icons-material/Forum';
export const adminTabs = [
    {
        name:'Dashboard',
        path:'/admin/dashboard',
        icon:<DashboardIcon/>
    },
    {
        name:'Users',
        path:'/admin/users-management',
        icon:<ManageAccountsIcon/>
    },
    {
        name:'Chats',
        path:'/admin/chats-management',
        icon:<GroupsIcon/>
    },
    {
        name:'Message',
        path:'/admin/messages',
        icon:<ForumIcon/>
    },

]