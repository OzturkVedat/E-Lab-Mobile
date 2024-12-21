export const adminTabs = [
  {
    name: "Dashboard",
    component: require("../screens/AdminDashboard").default,
    iconName: "stats-chart-outline",
  },
  {
    name: "List Patients",
    component: require("../components/PatientsList").default,
    iconName: "people-outline",
  },
  {
    name: "Admin Profile",
    component: require("../components/AccountDetails").default,
    iconName: "person-outline",
  },
];
export const userTabs = [
  {
    name: "Home",
    component: require("../screens/UserDashboard").default,
    iconName: "stats-chart-outline",
  },
  {
    name: "User Profile",
    component: require("../components/AccountDetails").default,
    iconName: "person-outline",
  },
];
