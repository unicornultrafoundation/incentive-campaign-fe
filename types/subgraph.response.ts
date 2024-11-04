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

export interface TransactionReward {
  txHash: string;
  to: string;
  timestamp: string;
  id: string;
  from: string;
  event: string;
  contract: string;
  amount: string;
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

  export interface TransactionRewardData {
    transactionPools: TransactionReward[];
  }
}
