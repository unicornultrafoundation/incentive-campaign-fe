export const stakePublicAbi = [
  {
    type: 'constructor',
    stateMutability: 'nonpayable',
    inputs: [
      { type: 'address', name: '_pUSDT', internalType: 'address' },
      { type: 'uint256', name: '_startTime', internalType: 'uint256' },
    ],
  },
  { type: 'error', name: 'InvalidShortString', inputs: [] },
  {
    type: 'error',
    name: 'StringTooLong',
    inputs: [{ type: 'string', name: 'str', internalType: 'string' }],
  },
  { type: 'event', name: 'EIP712DomainChanged', inputs: [], anonymous: false },
  {
    type: 'event',
    name: 'Harvest',
    inputs: [
      { type: 'address', name: 'user', internalType: 'address', indexed: true },
      {
        type: 'uint256',
        name: 'u2uRewards',
        internalType: 'uint256',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'OwnershipTransferred',
    inputs: [
      {
        type: 'address',
        name: 'previousOwner',
        internalType: 'address',
        indexed: true,
      },
      {
        type: 'address',
        name: 'newOwner',
        internalType: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Paused',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleAdminChanged',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32', indexed: true },
      {
        type: 'bytes32',
        name: 'previousAdminRole',
        internalType: 'bytes32',
        indexed: true,
      },
      {
        type: 'bytes32',
        name: 'newAdminRole',
        internalType: 'bytes32',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleGranted',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32', indexed: true },
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
        indexed: true,
      },
      {
        type: 'address',
        name: 'sender',
        internalType: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'RoleRevoked',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32', indexed: true },
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
        indexed: true,
      },
      {
        type: 'address',
        name: 'sender',
        internalType: 'address',
        indexed: true,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Stake',
    inputs: [
      { type: 'address', name: 'user', internalType: 'address', indexed: true },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UnStake',
    inputs: [
      { type: 'address', name: 'user', internalType: 'address', indexed: true },
      {
        type: 'uint256',
        name: 'amount',
        internalType: 'uint256',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'Unpaused',
    inputs: [
      {
        type: 'address',
        name: 'account',
        internalType: 'address',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UpdateClaimableTime',
    inputs: [
      {
        type: 'uint256',
        name: 'time',
        internalType: 'uint256',
        indexed: false,
      },
    ],
    anonymous: false,
  },
  {
    type: 'event',
    name: 'UpdateIgnoreSignerState',
    inputs: [
      { type: 'bool', name: 'newState', internalType: 'bool', indexed: false },
    ],
    anonymous: false,
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
    name: 'DEFAULT_ADMIN_ROLE',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'MAX_STAKE_AMOUNT',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'MAX_STAKING_DAYS',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'MAX_U2U_REWARDS',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'MAX_USDT_POOL_CAP',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'MIN_STAKE_AMOUNT',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
    name: 'POOL_SIGNER',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'claimableTime',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      { type: 'bytes1', name: 'fields', internalType: 'bytes1' },
      { type: 'string', name: 'name', internalType: 'string' },
      { type: 'string', name: 'version', internalType: 'string' },
      { type: 'uint256', name: 'chainId', internalType: 'uint256' },
      { type: 'address', name: 'verifyingContract', internalType: 'address' },
      { type: 'bytes32', name: 'salt', internalType: 'bytes32' },
      { type: 'uint256[]', name: 'extensions', internalType: 'uint256[]' },
    ],
    name: 'eip712Domain',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'emergencyWithdrawU2U',
    inputs: [
      { type: 'address', name: '_to', internalType: 'address' },
      { type: 'uint256', name: '_amount', internalType: 'uint256' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'endTime',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
    name: 'getRoleAdmin',
    inputs: [{ type: 'bytes32', name: 'role', internalType: 'bytes32' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [
      { type: 'uint256', name: 'totalStaked', internalType: 'uint256' },
      { type: 'uint256', name: 'latestHarvest', internalType: 'uint256' },
      { type: 'uint256', name: 'totalClaimed', internalType: 'uint256' },
    ],
    name: 'getUserInfo',
    inputs: [{ type: 'address', name: '_user', internalType: 'address' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'grantRole',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32' },
      { type: 'address', name: 'account', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'harvest',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'hasRole',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32' },
      { type: 'address', name: 'account', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bytes32', name: '', internalType: 'bytes32' }],
    name: 'hashStake',
    inputs: [
      { type: 'address', name: '_userAddr', internalType: 'address' },
      { type: 'uint256', name: '_expiresAt', internalType: 'uint256' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'ignoreSigner',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'owner',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'pUSDT',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'pause',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'paused',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'pendingRewards',
    inputs: [{ type: 'address', name: '_user', internalType: 'address' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'renounceOwnership',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'renounceRole',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32' },
      { type: 'address', name: 'account', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'revokeRole',
    inputs: [
      { type: 'bytes32', name: 'role', internalType: 'bytes32' },
      { type: 'address', name: 'account', internalType: 'address' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'rewardsRatePerSecond',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setClaimableTime',
    inputs: [{ type: 'uint256', name: '_time', internalType: 'uint256' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'setIgnoreSigner',
    inputs: [{ type: 'bool', name: '_state', internalType: 'bool' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'stake',
    inputs: [
      { type: 'uint256', name: '_amount', internalType: 'uint256' },
      { type: 'uint256', name: '_expiresAt', internalType: 'uint256' },
      { type: 'bytes', name: '_signature', internalType: 'bytes' },
    ],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'startTime',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'supportsInterface',
    inputs: [{ type: 'bytes4', name: 'interfaceId', internalType: 'bytes4' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'uint256', name: '', internalType: 'uint256' }],
    name: 'totalPoolStaked',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'transferOwnership',
    inputs: [{ type: 'address', name: 'newOwner', internalType: 'address' }],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'unpause',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'nonpayable',
    outputs: [],
    name: 'unstake',
    inputs: [],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'bool', name: '', internalType: 'bool' }],
    name: 'usedSignatures',
    inputs: [{ type: 'bytes', name: '', internalType: 'bytes' }],
  },
  {
    type: 'function',
    stateMutability: 'view',
    outputs: [{ type: 'address', name: '', internalType: 'address' }],
    name: 'verifyStake',
    inputs: [
      { type: 'uint256', name: '_expiresAt', internalType: 'uint256' },
      { type: 'bytes', name: '_signature', internalType: 'bytes' },
    ],
  },
  { type: 'receive', stateMutability: 'payable' },
];
