//--------------------------
// nativescript-toast typings file.
//-------------------------


declare module 'nativescript-toast' {

    export enum duration {'long'}

    export function makeText(text: string, duration?: duration): void;

}