export {};

declare global {
  interface TileType {
    letters: string;
    color: string;
  }

  interface ITileList {
    uid: string;
    tile: TileType;
    delta: {
      x: number;
      y: number;
    };
  }
}
