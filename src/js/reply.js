import { data } from "./data.js";
import renderComments from "./app.js";
export default function replyComment() {
    const replyBtn = document.querySelectorAll(".comment__reply-btn");
    replyBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            var _a;
            const replyContainer = (_a = btn.closest(".comment__container")) === null || _a === void 0 ? void 0 : _a.querySelector(".comment-reply");
            replyContainer === null || replyContainer === void 0 ? void 0 : replyContainer.classList.toggle("replyContainer-active");
            const replyBtnConfirm = replyContainer === null || replyContainer === void 0 ? void 0 : replyContainer.querySelector("button");
            replyBtnConfirm === null || replyBtnConfirm === void 0 ? void 0 : replyBtnConfirm.addEventListener("click", () => {
                var _a;
                //? Identificando o comentário a ser respondido
                const commentId = Number((_a = btn.closest(".comment")) === null || _a === void 0 ? void 0 : _a.id);
                const comment = findCommentById(data.comments, commentId);
                //? Reunindo as informações para a criação da resposta
                const newId = Number((Math.random() * 1000).toFixed(0));
                const profilePicture = data.currentUser.image.png;
                const user = data.currentUser.username; //
                const createdAt = "Just now";
                const score = 0;
                const replyingTo = comment.user.username;
                const replyContent = replyContainer.querySelector("textarea").value;
                const replies = [];
                const newComment = {
                    id: newId,
                    content: replyContent,
                    createdAt: createdAt,
                    score: score,
                    user: {
                        image: {
                            png: profilePicture,
                        },
                        username: user,
                    },
                    replies: replies,
                    replyingTo: replyingTo,
                };
                comment.replies.push(newComment);
                renderComments();
            });
        });
    });
}
export function findCommentById(comments, id) {
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
