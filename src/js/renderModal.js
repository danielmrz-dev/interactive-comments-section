import { findCommentById } from "./reply.js";
import { data } from "./data.js";
import renderComments from "./app.js";
export function renderModal() {
    const modal = document.querySelector("dialog");
    document.addEventListener("click", (event) => {
        var _a, _b, _c, _d;
        const target = event.target;
        if (target.closest(".comment__delete")) {
            modal === null || modal === void 0 ? void 0 : modal.showModal();
            const commentId = Number(target.closest(".comment").id);
            const commentToDelete = findCommentById(data.comments, commentId);
            modal === null || modal === void 0 ? void 0 : modal.addEventListener("click", (evento) => {
                const target = evento.target;
                if (target.classList.contains("btnConfirmDelete")) {
                    deleteCommentOrReplyById(commentToDelete.id);
                    renderComments();
                }
                else if (target.classList.contains("btnCancelDelete")) {
                    modal === null || modal === void 0 ? void 0 : modal.close();
                }
            });
        }
        const textarea = document.querySelector(".comment__edit-content");
        const updateCommentBtn = document.querySelector(".comment__content-update");
        const currentCommentContainer = (_a = target.closest(".comment")) === null || _a === void 0 ? void 0 : _a.querySelector(".comment__content");
        if (target.closest(".comment__edit")) {
            if (textarea && updateCommentBtn && currentCommentContainer) {
                let currentCommentContent = currentCommentContainer.textContent;
                currentCommentContent = currentCommentContent.trim().replace(/\s+/g, ' ');
                textarea.classList.add("active");
                textarea.value = currentCommentContent || "";
                updateCommentBtn.classList.add("active");
                currentCommentContainer.classList.add("inactive");
            }
        }
        if (target.classList.contains("comment__content-update")) {
            const commentToAnswer = (_c = (_b = target.closest(".comment__container")) === null || _b === void 0 ? void 0 : _b.querySelector(".comment__username")) === null || _c === void 0 ? void 0 : _c.textContent;
            const commentId = Number(target.closest(".comment").id);
            const commentToUpdate = findCommentById(data.comments, commentId);
            commentToUpdate.content = textarea.value;
            textarea.classList.remove("active");
            updateCommentBtn.classList.remove("active");
            currentCommentContainer.classList.remove("inactive");
            const newContentElement = (_d = target.closest(".comment")) === null || _d === void 0 ? void 0 : _d.querySelector("p");
            newContentElement.innerHTML = `<strong class="comment__replyingTo">@${commentToAnswer} </strong>${textarea.value}`;
        }
    });
}
function deleteCommentOrReplyById(commentIdToDelete) {
    for (let i = 0; i < data.comments.length; i++) {
        const comment = data.comments[i];
        if (comment.id === commentIdToDelete) {
            data.comments.splice(i, 1);
            return true;
        }
        for (let j = 0; j < comment.replies.length; j++) {
            const reply = comment.replies[j];
            if (reply.id === commentIdToDelete) {
                comment.replies.splice(j, 1);
                return true;
            }
        }
    }
    return false;
}
