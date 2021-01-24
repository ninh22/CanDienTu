/* eslint-disable prettier/prettier */
const https = 'https://canquochungdlk.com/';
const type_API = {
  home: https + 'Home/',
  weight: https + 'Weight/',
  account: https + 'Account/',
  admin: https + 'Admin/',
  users: https + 'Users/',
};
const host = {
  // Home
  getNumber: type_API.home + 'GetNumber',
  // Weight
  SearchPhieuCan: type_API.weight + 'SearchPhieuCan',
  // Account
  Login: type_API.account + 'Login',
  checkStatusUser: type_API.account + 'CheckStatusUser',
  checkPass: type_API.account + 'CheckPass',
  changePass: type_API.account + 'ChangePass',
  // Admin
  searchUsersGroup: type_API.admin + 'SearchUsersGroup',
  getAllUsersGroup: type_API.admin + 'GetAllUsersGroup',
  getAllWeightAppType: type_API.admin + 'GetAllWeightAppType',
  getAllAppTypes: type_API.admin + 'GetAllAppTypes',
  countUsersOfUsersGroup: type_API.admin + 'CountUsersOfUsersGroup',
  searchUsers: type_API.admin + 'SearchUsers',
  deleteUsers: type_API.admin + 'DeleteUsers',
  addUsersGroup: type_API.admin + 'AddUsersGroup',
  addAccount: type_API.admin + 'AddAccount',
  // Users
  weightAppType: type_API.users + 'WeightAppType',
  userOverview: type_API.users + 'UserOverview',
  userDiagramMap: type_API.users + 'UserDiagramMap',
  userDiagramProgress: type_API.users + 'UserDiagramProgress',
  searchDiagramMap: type_API.users + 'SearchDiagramMap',
  searchDiagramProgress: type_API.users + 'SearchDiagramProgress',
};

export default host;
