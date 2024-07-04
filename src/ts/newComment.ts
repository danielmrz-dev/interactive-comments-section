import { data } from "./data.js";
import renderComments, { commentsContainer } from "./app.js";

export default function createNewComment() {

    const submitBtn: HTMLButtonElement | null = document.querySelector(".new__comment-submit");
    const textarea: HTMLTextAreaElement | null = document.querySelector(".new__comment-content");

    submitBtn?.addEventListener("click", (evento) => {
        evento.preventDefault()

        const newId = Number((Math.random() * 1000).toFixed(0));
        const profilePicture = data.currentUser.image.png || "";
        const createdAt = "Just now";
        const score = 0;
        const content = textarea!.value;
        const replies: [] = [];

        if (textarea!.value.length !== 0) {
            const newComment = {
                id: newId,
                content: content,
                createdAt: createdAt,
                score: score,
                user: {
                    image: {
                        png: profilePicture,
                        webp: "",
                    },
                    username: data.currentUser.username,
                },
                replies: replies,
            };
            data.comments.push(newComment)
            renderComments()            
        }
    })
}