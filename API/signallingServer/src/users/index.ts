// I could store this in redis or memcache in the future
type TUser = {
  id: string;
  name: string;
  room: string;
};

let users: any = {};

export default users;
