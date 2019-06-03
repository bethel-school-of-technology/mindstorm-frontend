/**
 * The Story class.
 * See {@link StoryService} for its use in the service.
 */
export class Story {
  /** The story id */
  id: string;

  /** The story title */
  storyTitle: string;

  /** The story details */
  storyBody: string;

  /** The story image loader */
  imagePath: string;

  /** The story's creator */
  creator: string;
}
