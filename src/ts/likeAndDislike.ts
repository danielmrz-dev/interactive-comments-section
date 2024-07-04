import renderComments, { commentsContainer } from "./app.js";
import { data } from "./data.js";

function findCommentById(comments: any, id: number) {
    for (const comment of comments) {
        if (comment.id === id) {
            return comment;
        }
        if (comment.replies && comment.replies.length > 0) {
            const foundReply: any = findCommentById(comment.replies, id);
            if (foundReply) {
                return foundReply;
            }
        }
    }
    return null;
}

const likedComments = new Map();
const dislikedComments = new Map();

export function like(): void {
    const likeBtn = document.querySelectorAll(".like");
    likeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idHTML = Number(btn.closest(".comment")?.id);
            const commentToLike = findCommentById(data.comments, idHTML);

            if (commentToLike) {
                if (likedComments.has(idHTML)) {
                    commentToLike.score--;
                    likedComments.delete(idHTML);
                } else {
                    if (dislikedComments.has(idHTML)) {
                        commentToLike.score++;
                        dislikedComments.delete(idHTML);
                    }
                    commentToLike.score++;
                    likedComments.set(idHTML, true);
                }
                commentsContainer!.innerHTML = "";
                renderComments();
            }
        });
    });
}

export function dislike(): void {
    const dislikeBtn = document.querySelectorAll(".dislike");
    dislikeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idHTML = Number(btn.closest(".comment")?.id);
            const commentToDisLike = findCommentById(data.comments, idHTML);

            if (commentToDisLike) {
                if (dislikedComments.has(idHTML)) {
                    commentToDisLike.score++;
                    dislikedComments.delete(idHTML);
                } else {
                    if (likedComments.has(idHTML)) {
                        commentToDisLike.score--;
                        likedComments.delete(idHTML);
                    }
                    commentToDisLike.score--;
                    dislikedComments.set(idHTML, true);
                }
                commentsContainer!.innerHTML = "";
                renderComments();
            }
        });
    });
}