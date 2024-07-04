import renderComments, { commentsContainer } from "./app.js";
import { data } from "./data.js";
function findCommentById(comments, id) {
    for (const comment of comments) {
        if (comment.id === id) {
            return comment;
        }
        if (comment.replies && comment.replies.length > 0) {
            const foundReply = findCommentById(comment.replies, id);
            if (foundReply) {
                return foundReply;
            }
        }
    }
    return null;
}
const likedComments = new Map();
const dislikedComments = new Map();
export function like() {
    const likeBtn = document.querySelectorAll(".like");
    likeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            var _a;
            const idHTML = Number((_a = btn.closest(".comment")) === null || _a === void 0 ? void 0 : _a.id);
            const commentToLike = findCommentById(data.comments, idHTML);
            if (commentToLike) {
                if (likedComments.has(idHTML)) {
                    commentToLike.score--;
                    likedComments.delete(idHTML);
                }
                else {
                    if (dislikedComments.has(idHTML)) {
                        commentToLike.score++;
                        dislikedComments.delete(idHTML);
                    }
                    commentToLike.score++;
                    likedComments.set(idHTML, true);
                }
                commentsContainer.innerHTML = "";
                renderComments();
            }
        });
    });
}
export function dislike() {
    const dislikeBtn = document.querySelectorAll(".dislike");
    dislikeBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            var _a;
            const idHTML = Number((_a = btn.closest(".comment")) === null || _a === void 0 ? void 0 : _a.id);
            const commentToDisLike = findCommentById(data.comments, idHTML);
            if (commentToDisLike) {
                if (dislikedComments.has(idHTML)) {
                    commentToDisLike.score++;
                    dislikedComments.delete(idHTML);
                }
                else {
                    if (likedComments.has(idHTML)) {
                        commentToDisLike.score--;
                        likedComments.delete(idHTML);
                    }
                    commentToDisLike.score--;
                    dislikedComments.set(idHTML, true);
                }
                commentsContainer.innerHTML = "";
                renderComments();
            }
        });
    });
}
