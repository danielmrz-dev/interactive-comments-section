import { data } from "./data.js";
import { renderModal } from "./renderModal.js";
import { like, dislike } from "./likeAndDislike.js";
import replyComment from "./reply.js";
import createNewComment from "./newComment.js";
export const commentsContainer = document.querySelector(".comments");
export default function renderComments() {
    const comments = data.comments;
    const currentUser = data.currentUser;
    commentsContainer.innerHTML = `

    <dialog>
        <div class="modal__container">
            <h2>Delete comment</h2>
            <p>Are you sure you want to delete this comment? This will remove the comment and can't be undone.</p>
            <button class="btnCancelDelete">No, Cancel</button>
            <button class="btnConfirmDelete">Yes, delete</button>					
        </div>
    </dialog>
    `;
    comments.forEach((comment) => {
        const comentario = {
            id: comment.id,
            content: comment.content,
            createdAt: comment.createdAt,
            score: comment.score,
            user: {
                image: {
                    png: comment.user.image.png,
                },
                username: comment.user.username,
            },
            replies: comment.replies,
            replyingTo: comment.replyingTo,
        };
        const respostasHTML = comentario.replies
            .map((resposta) => `
                <section class="comment" id="${resposta.id}">
                    <div class="comment__header">
                        <img src=${resposta.user.image.png} alt="Profile Picture"/>
                        <span class="comment__username">${resposta.user.username}</span>
						${resposta.user.username === currentUser.username
            ? `
							<span class="comment__username-you">you</span>
							`
            : ""}
                        <span class="comment__date">${resposta.createdAt}</span>
                    </div>
                    <p class="comment__content">
					<strong class="comment__replyingTo">@${resposta.replyingTo}</strong>
                    ${resposta.content}
                    </p>

                    ${resposta.user.username === currentUser.username ? `
                        <textarea class="comment__edit-content" rows="4"></textarea>

                        <button class="comment__content-update">
                            Update
                        </button>                        
                        ` : ""}

                    <div class="comment__likes">
                        <div class="comment__likes-box">
                            <button class="comment__likes-btn like">
                                +
                            </button>
                            <span>${resposta.score}</span>
                            <button class="comment__likes-btn dislike">
                                -
                            </button>
                        </div>
                    </div>

					${resposta.user.username === currentUser.username
            ? `
						<div class="comment__delete-edit">
							<button class="comment__delete">
								<img src="images/icon-delete.svg" />
								<span class="delete-btn">Delete</span>
							</button>
							<button class="comment__edit">
								<img src="images/icon-edit.svg" />
								<span>Edit</span>
							</button>
						</div>
						
						`
            : `
						<button class="comment__reply-btn">
							<img src="images/icon-reply.svg" />
							Reply							
						</button>`}

                </section>

            `)
            .join("");
        if (!commentsContainer)
            return;
        commentsContainer.innerHTML += `

                <div class="comment__container">
                    <section class="comment" id="${comentario.id}">
                        <div class="comment__header">
                            <img src=${comentario.user.image.png} alt="Profile Picture"/>
                            <span class="comment__username">${comentario.user.username}</span>
                            ${comentario.user.username === currentUser.username
            ? `
							<span class="comment__username-you">you</span>
							`
            : ""}
                            <span class="comment__date">${comentario.createdAt}</span>
                        </div>
                        <p class="comment__content">
                        ${comentario.content}
                        </p>
                        
                        <div class="comment__likes">
                            <div class="comment__likes-box">
                                <button class="comment__likes-btn like">
                                    +
                                </button>
                                <span>${comentario.score}</span>
                                <button class="comment__likes-btn dislike">
                                    -
                                </button>
                            </div>
                        </div>

                        ${comentario.user.username === currentUser.username
            ? `
						<div class="comment__delete-edit">
							<button class="comment__delete">
								<img src="images/icon-delete.svg" />
								<span class="delete-btn">Delete</span>
							</button>
							<button class="comment__edit">
								<img src="images/icon-edit.svg" />
								<span>Edit</span>
							</button>
						</div>
						
						`
            : `
						<button class="comment__reply-btn">
							<img src="images/icon-reply.svg" />
							Reply							
						</button>`}

                    </section>

                    <div class="comment-reply">
                        <img src=${currentUser.image.png}>
                        <textarea name="" id="" rows="4" placeholder="Add a comment..."></textarea>
                        <button class="comment__btn-confirm-reply">Reply</button>
                    </div>

                    ${comentario.replies.length === 0
            ? ""
            : `
                        <section class="comment__replies">
                            ${respostasHTML}
                        </section>
                    `}
                </div>
            `;
        renderModal();
        like();
        dislike();
        replyComment();
    });
    const newCommentElement = `
    <section class="new__comment">
        <form class="new__comment-form">
            <textarea name="" id="" placeholder="Add a comment..." rows="4" class="new__comment-content"></textarea>
            <img src="images/avatars/image-juliusomo.webp">
            <button class="new__comment-submit">SEND</button>
        </form>
    </section>
    `;
    commentsContainer === null || commentsContainer === void 0 ? void 0 : commentsContainer.insertAdjacentHTML("beforeend", newCommentElement);
    createNewComment();
}
renderComments();
