// Algorithm to find total number of comments
export const totalComments = (comments) => {
  if (comments) {
    const numberOfComments = comments.length;
    const numberOfReplies = comments.reduce(
      (acc, val) => (val.replies ? acc + val.replies.length : acc),
      0
    );
    return numberOfReplies + numberOfComments;
  } else {
    return 0;
  }
};
