import { useState } from 'react';
import {
  BarChart3, Users, Calendar, CreditCard,
  Settings, Menu, Bell, User,
  Map, BookOpen
} from 'lucide-react';
import AdminLayout from "./AdminLayout.jsx";
import SubMenuItem from "./SubMenuItem.jsx";
import ConfirmationDialog from "./ConfirmationDialog.jsx";
import {useNavigate} from "react-router-dom";

const MENU_ITEMS = [
  { 
    name: 'Dashboard', 
    icon: BarChart3,
    path: '/admin/dashboard'
  },
  { 
    name: 'User Management', 
    icon: Users,
    path: '/admin/user-management'
  },
  { 
    name: 'Tourist Bookings', 
    icon: BookOpen,
    path: '/admin/bookings'
  },
  { 
    name: 'Guides Management', 
    icon: Users,
    path: '/admin/guide-management'
  },
  { 
    name: 'Payments', 
    icon: CreditCard,
    path: '/admin/payments'
  },
  { 
    name: 'Reservations', 
    icon: Calendar,
    path: '/admin/reservations'
  },
  { 
    name: 'Tours', 
    icon: Map,
    subItems: [
      { name: 'Tour List', path: '/admin/tours' },
      { name: 'Add New Tour', path: '/admin/tours/new' },
      { name: 'Tour Categories', path: '/admin/tours/categories' }
    ]
  },
  { 
    name: 'Settings', 
    icon: Settings,
    path: '/admin/settings'
  },
];

const AdminDashboard = ({ title,children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  return (
    <AdminLayout>
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div 
        className={`${
          sidebarCollapsed ? 'w-16' : 'w-64'
        } bg-gray-800 transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between border-b border-gray-700">
          {!sidebarCollapsed && (
            <span className="text-xl font-bold text-gray-200">TouriPearl</span>
          )}
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-1 rounded-md hover:bg-gray-700 transition-colors"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto">
          {MENU_ITEMS.map((item) => (
            <SubMenuItem
              key={item.name}
              item={item}
              collapsed={sidebarCollapsed}
              onNavigate={navigate}
            />
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-gray-800 p-4 flex justify-between items-center border-b border-gray-700">
          <h1 className="text-2xl font-bold text-gray-200">{title}</h1>
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-full hover:bg-gray-700 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
            <button 
              className="p-2 rounded-full hover:bg-gray-700 transition-colors
                         focus:outline-none focus:ring-2 focus:ring-gray-500"
              aria-label="Profile"
            >
              <User className="h-5 w-5" />
            </button>
            {/*<ConfirmationDialog
              title="Logout"
              description="Are you sure you want to logout?"
              confirmText="Logout"
              onConfirm={()=>logout()}
            >
                      <LogOut className="h-5 w-5" />
            </ConfirmationDialog>*/}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-6">   
            {children}
        </main>
      </div>
    </div>
    </AdminLayout>
  );
};

export default AdminDashboard;