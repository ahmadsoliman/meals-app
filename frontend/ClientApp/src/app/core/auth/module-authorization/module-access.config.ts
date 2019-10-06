export enum ModuleAccess {
  DASHBOARD = 1,

  ASSET_LIST = 2,
  ASSET_DETAILS = 3,

  JOB_LIST = 4,
  JOB_DETAILS = 5,

  JOB_REQUEST_LIST = 6,
  JOB_REQUEST_DETAILS = 7,

  CALENDAR = 8,
  SUPPLY_CHAIN = 9
} // please keep the numbers unique and greater than 0

export enum AccessLevel {
  HIDE = 0,
  READ = 1,
  WRITE = 2
}

export const ModuleAccessList = [
  {
    PageAccessName: 'Dashboard',
    id: ModuleAccess.DASHBOARD,
    copyFrom: undefined,
    default: AccessLevel.READ
  },
  {
    PageAccessName: 'Asset',
    id: ModuleAccess.ASSET_LIST,
    copyFrom: undefined,
    default: AccessLevel.HIDE
  },
  {
    PageAccessName: 'Asset_Details',
    id: ModuleAccess.ASSET_DETAILS,
    copyFrom: ModuleAccess.ASSET_LIST,
    default: AccessLevel.HIDE
  },
  {
    PageAccessName: 'Job',
    id: ModuleAccess.JOB_LIST,
    copyFrom: undefined,
    default: AccessLevel.HIDE
  },
  {
    PageAccessName: 'Job_Details',
    id: ModuleAccess.JOB_DETAILS,
    copyFrom: ModuleAccess.JOB_LIST,
    default: AccessLevel.HIDE
  },
  {
    PageAccessName: 'JobRequest',
    id: ModuleAccess.JOB_REQUEST_LIST,
    copyFrom: undefined,
    default: AccessLevel.HIDE
  },
  {
    PageAccessName: 'JobRequest_Details',
    id: ModuleAccess.JOB_REQUEST_DETAILS,
    copyFrom: ModuleAccess.JOB_REQUEST_LIST,
    default: AccessLevel.HIDE
  },
  {
    PageAccessName: 'Calendar',
    id: ModuleAccess.CALENDAR,
    copyFrom: ModuleAccess.JOB_LIST,
    default: AccessLevel.HIDE
  },
  {
    PageAccessName: 'SupplyChain',
    id: ModuleAccess.SUPPLY_CHAIN,
    copyFrom: undefined,
    default: AccessLevel.HIDE
  }
];
