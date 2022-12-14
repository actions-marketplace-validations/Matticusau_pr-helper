//
// Author:  Matt Lavery
// Date:    2020-06-20
// Purpose: Helpers for common messages
//
// When         Who         What
// ------------------------------------------------------------------------------------------
//

export class MessageHelper {
    
    prcommentautomationwelcome : string;
    prcommentautomationdirtypr : string;


    constructor() {
        // this.prcommentautomationwelcome = "### Hello from PR Helper\n\nIs your PR ready for review and processing? Mark the PR ready by including `#pr-ready` in a comment.\n\nIf you still have work to do, even after marking this ready. Put the PR on hold by including `#pr-onhold` in a comment.";
        this.prcommentautomationwelcome = "### Hello from PR Helper\n\nRemember to comment with one of the following states:\n\n`#pr-ready` to enable all auto processing and merging.\n\n`#pr-onhold` to prevent merging as you have other commits or discussions to make.\n\n\n\nIf you do not set the `#pr-ready` comment then the auto-merge capabilities will not be active.";
        this.prcommentautomationdirtypr = "Pull request is not mergable, please resolve any conflicts/issues first";
        
    }
}
