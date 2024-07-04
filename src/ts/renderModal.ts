import { findCommentById } from "./reply.js";
import { data } from "./data.js";
import renderComments from "./app.js";

export function renderModal(): void {
    const modal: HTMLDialogElement | null = document.querySelector("dialog");
    document.addEventListener("click", (event) => {
        const target = event.target as HTMLElement;
        if (target.closest(".comment__delete")) {
            modal?.showModal();

            const commentId = Number(target.closest(".comment")!.id);
            const commentToDelete = findCommentById(data.comments, commentId);

            modal?.addEventListener("click", (evento) => {
                const target = evento.target as HTMLElement;
                if (target.classList.contains("btnConfirmDelete")) {
                    deleteCommentOrReplyById(commentToDelete.id);                  
                    renderComments();
                } else if (target.classList.contains("btnCancelDelete")) {
                    modal?.close();
                }
            })
        }

        const textarea: HTMLTextAreaElement | null = document.querySelector(".comment__edit-content");
        const updateCommentBtn: HTMLElement | null = document.querySelector(".comment__content-update");
        const currentCommentContainer = target.closest(".comment")?.querySelector(".comment__content");

        if (target.closest(".comment__edit")) {           
            if (textarea && updateCommentBtn && currentCommentContainer) {
                let currentCommentContent = currentCommentContainer.textContent;
                currentCommentContent = currentCommentContent!.trim().replace(/\s+/g, ' ');
                textarea.classList.add("active");
                textarea.value = currentCommentContent || "";
                updateCommentBtn.classList.add("active");
                currentCommentContainer.classList.add("inactive");           
            }
        }
        
        if (target.classList.contains("comment__content-update")) {
            const commentToAnswer = target.closest(".comment__container")?.querySelector(".comment__username")?.textContent;
            const commentId = Number(target.closest(".comment")!.id);
            const commentToUpdate = findCommentById(data.comments, commentId);
            commentToUpdate.content = textarea!.value;
            textarea!.classList.remove("active");
            updateCommentBtn!.classList.remove("active");
            currentCommentContainer!.classList.remove("inactive");         
            const newContentElement = target.closest(".comment")?.querySelector("p");
            newContentElement!.innerHTML = `<strong class="comment__replyingTo">@${commentToAnswer} </strong>${textarea!.value}`
        }
    });
}

function deleteCommentOrReplyById(commentIdToDelete: number) {
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