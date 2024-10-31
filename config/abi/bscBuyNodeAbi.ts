export const bscBuyNodeAbi = [
  {
    inputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'ModApproved',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'previousOwner',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
    ],
    name: 'RoundActived',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'nodeSale',
        type: 'uint16',
      },
    ],
    name: 'RoundAdded',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'nodeSale',
        type: 'uint16',
      },
    ],
    name: 'RoundUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'startTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'endTime',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'nodePerUser',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'nodeSales',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'discount',
        type: 'uint8',
      },
    ],
    name: 'RoundWhitelistUpdated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'refAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'bytes',
        name: 'promotionCode',
        type: 'bytes',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'currentSale',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'amountNode',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'totalDiscount',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'payment',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'counter',
        type: 'uint256',
      },
    ],
    name: 'UserBuy',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'refAddress',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'round',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint16',
        name: 'currentSale',
        type: 'uint16',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'amountNode',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'price',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint8',
        name: 'discount',
        type: 'uint8',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'amountUsd',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'payment',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'counter',
        type: 'uint256',
      },
    ],
    name: 'UserBuyWhitelist',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'sender',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
    ],
    name: 'UserJoinedWhitelist',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        indexed: true,
        internalType: 'uint8',
        name: 'discount',
        type: 'uint8',
      },
    ],
    name: 'UserRefDiscounted',
    type: 'event',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [],
    name: 'PERCENT',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
    ],
    name: 'activeRound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint16',
            name: 'totalNodes',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'currentSale',
            type: 'uint16',
          },
        ],
        internalType: 'struct NodeSale.Round',
        name: '_round',
        type: 'tuple',
      },
    ],
    name: 'addRound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'refAddress',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
      {
        internalType: 'uint8',
        name: 'amountNode',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: 'chainId',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'promotionCode',
        type: 'bytes',
      },
      {
        internalType: 'uint8',
        name: 'totalDiscount',
        type: 'uint8',
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'timeExpired',
        type: 'uint256',
      },
      {
        internalType: 'bytes',
        name: 'signature',
        type: 'bytes',
      },
    ],
    name: 'buyNode',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'refAddress',
        type: 'address',
      },
    ],
    name: 'buyNodeWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'capital',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'counter',
    outputs: [
      {
        internalType: 'uint256',
        name: '_value',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
    ],
    name: 'getConfigWhitelist',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'startTime',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'endTime',
            type: 'uint256',
          },
          {
            internalType: 'uint8',
            name: 'nodePerUser',
            type: 'uint8',
          },
          {
            internalType: 'uint16',
            name: 'totalNodes',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'currentSale',
            type: 'uint16',
          },
          {
            internalType: 'uint8',
            name: 'discount',
            type: 'uint8',
          },
          {
            internalType: 'uint256',
            name: 'userJoined',
            type: 'uint256',
          },
        ],
        internalType: 'struct NodeSale.WhiteList',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
    ],
    name: 'getRoundInfo',
    outputs: [
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint16',
            name: 'totalNodes',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'currentSale',
            type: 'uint16',
          },
        ],
        internalType: 'struct NodeSale.Round',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_address',
        type: 'address',
      },
      {
        internalType: 'uint8',
        name: '_roundId',
        type: 'uint8',
      },
    ],
    name: 'getUserWhitelist',
    outputs: [
      {
        components: [
          {
            internalType: 'bool',
            name: 'joined',
            type: 'bool',
          },
          {
            internalType: 'bool',
            name: 'purchased',
            type: 'bool',
          },
        ],
        internalType: 'struct NodeSale.UserWhitelist',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'implAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_roundId',
        type: 'uint8',
      },
    ],
    name: 'joinWhiteList',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'maxPercentDiscount',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'proUsed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'rootAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'roundActive',
    outputs: [
      {
        internalType: 'uint8',
        name: '',
        type: 'uint8',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address',
      },
      {
        internalType: 'bool',
        name: 'status',
        type: 'bool',
      },
    ],
    name: 'setApprover',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_capital',
        type: 'address',
      },
    ],
    name: 'setCapital',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
      {
        internalType: 'uint256',
        name: '_startTime',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_endTime',
        type: 'uint256',
      },
      {
        internalType: 'uint8',
        name: '_nodePerUser',
        type: 'uint8',
      },
      {
        internalType: 'uint16',
        name: '_totalNodes',
        type: 'uint16',
      },
      {
        internalType: 'uint8',
        name: '_discount',
        type: 'uint8',
      },
    ],
    name: 'setConfigWhitelist',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_implAddress',
        type: 'address',
      },
    ],
    name: 'setImplAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: '_percentMax',
        type: 'uint8',
      },
    ],
    name: 'setPercentDiscountMax',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_rootAddress',
        type: 'address',
      },
    ],
    name: 'setRootAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_timeout',
        type: 'uint256',
      },
    ],
    name: 'setTimeVerify',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ERC20',
        name: '_tokenBuy',
        type: 'address',
      },
    ],
    name: 'setToken',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes',
      },
    ],
    name: 'sigUsed',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'timeout',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'newOwner',
        type: 'address',
      },
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_verifyAddress',
        type: 'address',
      },
    ],
    name: 'updateAddressVerify',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'roundId',
        type: 'uint8',
      },
      {
        components: [
          {
            internalType: 'uint256',
            name: 'price',
            type: 'uint256',
          },
          {
            internalType: 'uint16',
            name: 'totalNodes',
            type: 'uint16',
          },
          {
            internalType: 'uint16',
            name: 'currentSale',
            type: 'uint16',
          },
        ],
        internalType: 'struct NodeSale.Round',
        name: '_round',
        type: 'tuple',
      },
    ],
    name: 'updateRound',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'promotionCode',
        type: 'bytes',
      },
    ],
    name: 'usedPromotionCode',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '_signature',
        type: 'bytes',
      },
    ],
    name: 'usedSignature',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'verifyAddress',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'contract ERC20',
        name: 'token',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
    ],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    stateMutability: 'payable',
    type: 'receive',
  },
] as const;
