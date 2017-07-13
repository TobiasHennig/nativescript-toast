//--------------------------
// nativescript-toast typings file.
//-------------------------


declare module 'nativescript-toast' {

  export enum duration {'long'}

  /**
   * A toast is a view containing a quick little message for the user. The toast class helps you create and show those.
   * When the view is shown to the user, appears as a floating view over the application. It will never receive focus. The user will probably be in the middle of typing something else. The idea is to be as unobtrusive as possible, while still showing the user the information you want them to see. Two examples are the volume control, and the brief message saying that your settings have been saved.
   * The easiest way to use this class is to call one of the static methods that constructs everything you need and returns a new Toast object.
   */
  export interface Toast {

    /**
     *  Set the view to show.
     */
    show(): void;
    /**
     *  Close the view if it's showing, or don't show it if it isn't showing yet.
     */
    cancel(): void;
    /**
     * Update the text in a Toast that was previously created using one of the makeText() methods.
     * @param text to set
     */
    setText(text: string): void;
    /**
     *  Close the view if it's showing, or don't show it if it isn't showing yet.
     */
    cancel(): void;
    /**
     *   Return the duration.
     */
    getDuration(): Number;
    /**
     *  Set how long to show the view for.
     * @param duration to use
     */
    setDuration(duration: Number): void;
  }

  export function makeText(text: string, duration?: string): Toast;

}
