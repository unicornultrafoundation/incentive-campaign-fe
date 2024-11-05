import { DocumentNode, gql } from '@apollo/client';
import { Address } from 'viem';

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

export const TransactionRewardQuery: DocumentNode = gql(`
query TransactionReward($contract: String, $address: String, $limit: Int = 10, $skip: Int = 0) {
  transactionPools(where: {to: $address, event: HARVEST, contract: $contract}, 
  first: $limit,
  skip: $skip,
    orderBy: timestamp,
    orderDirection: desc
  ) {
    txHash
    to
    timestamp
    id
    from
    event
    contract
    amount
  }
}`);

export const TransactionStakeQuery: DocumentNode = gql(`
query TransactionReward($contract: String, $address: String, $limit: Int = 10, $skip: Int = 0) {
  transactionPools(where: {to: $address, event: STAKE, contract: $contract}, 
  first: $limit,
  skip: $skip,
    orderBy: timestamp,
    orderDirection: desc
  ) {
    txHash
    to
    timestamp
    id
    from
    event
    contract
    amount
  }
}`);

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
