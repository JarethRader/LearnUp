/// <reference path="../../src/types/index.d.ts" />
declare const generateAudio: (tileList: IRequestTile[]) => Promise<string>;
declare const audioServices: Readonly<{
    generateAudio: (tileList: IRequestTile[]) => Promise<string>;
}>;
export default audioServices;
export { generateAudio };
//# sourceMappingURL=index.d.ts.map