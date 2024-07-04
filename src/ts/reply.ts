import { data } from "./data.js";
import renderComments, { commentsContainer } from "./app.js";

export default function replyComment() {
    const replyBtn: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
        ".comment__reply-btn"
    );
    replyBtn.forEach((btn) => {
        btn.addEventListener("click", () => {
            const replyContainer = btn.closest(".comment__container")?.querySelector(".comment-reply");
            replyContainer?.classList.toggle("replyContainer-active");

            const replyBtnConfirm = replyContainer?.querySelector("button");
            replyBtnConfirm?.addEventListener("click", () => {
                //? Identificando o comentário a ser respondido
                const commentId: number = Number(btn.closest(".comment")?.id);
                const comment = findCommentById(data.comments, commentId);

                //? Reunindo as informações para a criação da resposta

                const newId = Number((Math.random() * 1000).toFixed(0));
                const profilePicture = data.currentUser.image.png;
                const user = data.currentUser.username; //
                const createdAt = "Just now";
                const score = 0;
                const replyingTo = comment.user.username;
                const replyContent =
                    replyContainer!.querySelector("textarea")!.value;
                const replies: [] = [];

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

export function findCommentById(comments: any, id: number) {
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
