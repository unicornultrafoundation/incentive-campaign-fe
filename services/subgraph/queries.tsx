import { gql } from '@apollo/client';

export const DashboardPublicQuery = gql(`
  query DashboardPublic {
   dashboards {
    id
    amountStakePublic
    amountHarvestPublic
    totalUserPublic
  }
}
`);

export const DashboardBitgetQuery = gql(`
  query DashboardBitget {
   dashboards {
    id
    amountStakeBitget
    amountHarvestBitget
    totalUserBitget
  }
}
`);
