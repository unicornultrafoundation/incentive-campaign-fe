export const BASE_REQUEST_OPTIONS = {
  timeout: 5000,
  headers: {
    redirect: 'follow',
  },
};

/** API endpoints for proxy api requests **/
export const SERVER_ENDPOINTS = {
  CONNECT: '/auth/connect',
};

/** API endpoints for client-side api requests **/
export const API_ENDPOINTS = {
  CONNECT: '/auth/connect',
  DISCONNECT: '/public/disconnect',
  GET_PROFILE: '/api/user/info',
  GET_MEMBER: '/api/user/members',
  UPDATE_PERCENT_COM: '/api/admin/users/update-percent-com',
  GET_TRANSACTION: '/api/admin/transactions',
  GET_DETAIL_TRANSACTION: '/api/admin/transactions',
  GET_BUY_HISTORY: '/api/user/buy-history',
  UPLOAD_FILE: '/api/admin/upload-file',
  APPROVE_DATA: 'api/admin/approve-data',
  GET_NODE: 'api/public/rounds',
  GET_CODE: 'api/user',
  GET_PROMOTION_CODE: 'api/user/promotion',
  GET_REF_ADDRESS: '/api/public/root-address',
  GET_DISCOUNT_INFO: '/api/user/discount-info',
  UPDATE_PERCENT: '/api/admin/users/update-discount',
  JOIN_WAITLIST: 'api/user/join-waitlist',
  GET_WAITLIST: 'api/user/get-join-waitlist',
  GET_USER: '/api/admin/users',
  GET_CLAIM_NFT: 'api/user/claim-nft/',
  SEARCH_NODE: 'api/public/search/',
};
