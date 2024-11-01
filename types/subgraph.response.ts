export interface DashboardPublic {
  id: string;
  amountStakePublic: string;
  amountHarvestPublic: string;
  totalUserPublic: string;
}

export interface DashboardBitget {
  id: string;
  amountStakeBitget: string;
  amountHarvestBitget: string;
  totalUserBitget: string;
}

export namespace SubgraphResponse {
  export interface DashboardPublicData {
    data: {
      dashboards: DashboardPublic[];
    };
  }
  export interface DashboardBitgetData {
    dashboards: DashboardBitget[];
  }
}
