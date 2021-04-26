/** @format */

export const STORE_USERID = "STORE_USERID";

export const storeUserInfo = (id, role) => ({
  type: STORE_USERID,
  id,
  role
});
