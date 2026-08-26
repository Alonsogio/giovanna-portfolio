declare module 'gifuct-js' {
  export interface GifFrame {
    dims: {
      top: number;
      left: number;
      width: number;
      height: number;
    };
    patch: Uint8ClampedArray;
    delay: number;
    disposalType: number;
  }

  export interface ParsedGif {
    frames: GifFrame[];
    lsd: {
      width: number;
      height: number;
      gct?: Uint8Array;
    };
  }

  export function parseGIF(buffer: ArrayBuffer): ParsedGif;

  export function decompressFrames(gif: ParsedGif, buildImagePatches?: boolean): GifFrame[];
}
