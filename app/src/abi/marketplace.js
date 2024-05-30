export const MARKETPLACE_ABI = [
  {
    inputs: [
      { internalType: 'address', name: '_treasury', type: 'address' },
      { internalType: 'uint256', name: '_royaltyPercent', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'uint256', name: 'itemId', type: 'uint256' }],
    name: 'ClosedItem',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'uint256', name: 'itemId', type: 'uint256' }],
    name: 'ForceRemovedItem',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'itemId', type: 'uint256' },
      {
        components: [
          { internalType: 'address', name: 'nft', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'timeSaleStart', type: 'uint256' },
          { internalType: 'uint256', name: 'timeSaleEnd', type: 'uint256' },
          { internalType: 'uint256', name: 'salePrice', type: 'uint256' },
          { internalType: 'address', name: 'feeReceiver', type: 'address' },
        ],
        indexed: false,
        internalType: 'struct MarketItemParams',
        name: 'marketItem',
        type: 'tuple',
      },
    ],
    name: 'ListedItem',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
      { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
    ],
    name: 'OwnershipTransferred',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'itemId', type: 'uint256' },
      { indexed: true, internalType: 'address', name: 'buyer', type: 'address' },
    ],
    name: 'PurchasedItem',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'user', type: 'address' },
      { indexed: false, internalType: 'bool', name: 'allow', type: 'bool' },
    ],
    name: 'SetAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'uint256', name: 'oldRoyaltyPercent', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'newRoyaltyPercent', type: 'uint256' },
    ],
    name: 'SetRoyaltyPercent',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: 'address', name: 'oldTreasury', type: 'address' },
      { indexed: false, internalType: 'address', name: 'newTreasury', type: 'address' },
    ],
    name: 'SetTreasury',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'uint256', name: 'itemId', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'price', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timeSaleStart', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'timeSaleEnd', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'salePrice', type: 'uint256' },
    ],
    name: 'UpdatedItem',
    type: 'event',
  },
  {
    inputs: [],
    name: 'HUNDRED_PERCENT',
    outputs: [{ internalType: 'uint16', name: '', type: 'uint16' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'MAX_BATCH_PURCHASE_ITEM',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'admins',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_itemId', type: 'uint256' }],
    name: 'closeItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_itemId', type: 'uint256' }],
    name: 'forceRemoveItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_account', type: 'address' }],
    name: 'isAdmin',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'itemIds',
    outputs: [{ internalType: 'uint256', name: '_value', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'nft', type: 'address' },
          { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
          { internalType: 'uint256', name: 'price', type: 'uint256' },
          { internalType: 'uint256', name: 'timeSaleStart', type: 'uint256' },
          { internalType: 'uint256', name: 'timeSaleEnd', type: 'uint256' },
          { internalType: 'uint256', name: 'salePrice', type: 'uint256' },
          { internalType: 'address', name: 'feeReceiver', type: 'address' },
        ],
        internalType: 'struct MarketItemParams',
        name: '_marketItemParams',
        type: 'tuple',
      },
    ],
    name: 'listItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    name: 'marketItems',
    outputs: [
      { internalType: 'uint256', name: 'itemId', type: 'uint256' },
      { internalType: 'address', name: 'nft', type: 'address' },
      { internalType: 'uint256', name: 'tokenId', type: 'uint256' },
      { internalType: 'uint256', name: 'price', type: 'uint256' },
      { internalType: 'uint256', name: 'timeSaleStart', type: 'uint256' },
      { internalType: 'uint256', name: 'timeSaleEnd', type: 'uint256' },
      { internalType: 'uint256', name: 'salePrice', type: 'uint256' },
      { internalType: 'address', name: 'seller', type: 'address' },
      { internalType: 'address', name: 'feeReceiver', type: 'address' },
      { internalType: 'address', name: 'buyer', type: 'address' },
      { internalType: 'uint256', name: 'timePurchased', type: 'uint256' },
      { internalType: 'enum ItemStatus', name: 'status', type: 'uint8' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint256', name: '', type: 'uint256' },
      { internalType: 'bytes', name: '', type: 'bytes' },
    ],
    name: 'onERC721Received',
    outputs: [{ internalType: 'bytes4', name: '', type: 'bytes4' }],
    stateMutability: 'pure',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256[]', name: '_itemIds', type: 'uint256[]' }],
    name: 'purchaseItems',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [],
    name: 'royaltyPercent',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_user', type: 'address' },
      { internalType: 'bool', name: '_allow', type: 'bool' },
    ],
    name: 'setAdmin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address[]', name: '_users', type: 'address[]' },
      { internalType: 'bool', name: '_allow', type: 'bool' },
    ],
    name: 'setAdmins',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_royaltyPercent', type: 'uint256' }],
    name: 'setRoyaltyPercent',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_treasury', type: 'address' }],
    name: 'setTreasury',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'treasury',
    outputs: [{ internalType: 'address', name: '', type: 'address' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_itemId', type: 'uint256' },
      { internalType: 'uint256', name: '_price', type: 'uint256' },
      { internalType: 'uint256', name: '_timeSaleStart', type: 'uint256' },
      { internalType: 'uint256', name: '_timeSaleEnd', type: 'uint256' },
      { internalType: 'uint256', name: '_salePrice', type: 'uint256' },
    ],
    name: 'updateItem',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
];
