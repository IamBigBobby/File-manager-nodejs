import os from 'os';

export function getSystemUserName() {
  const userInfo = os.userInfo();
  console.log(`Current system user: ${userInfo.username}`);
}
