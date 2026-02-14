import { useState } from "react";
import type { Post } from "../types";
import "./TodoCard.css";

//Interface för TodoCard
interface TodoCardProps {
    todos: Post[];
    onTodoDeleted?: (id: string) => void;
    onTodoUpdated?: (updatedTodo: Post) => void;
}

const TodoCard = ({ todos, onTodoDeleted, onTodoUpdated }: TodoCardProps) => {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editedStatus, setEditedStatus] = useState<number>(0);

    const statusText = ["Ej påbörjad", "Pågående", "Avklarad"];

    // Starta redigering
    const startEdit = (todo: Post) => {
        setEditingId(todo._id);
        setEditedStatus(todo.status);
    };

    // Spara ändring (PUT)
    const saveEdit = async (todo: Post) => {
        try {
            const resp = await fetch(
                `https://todo-api-render.onrender.com/api/todos/${todo._id}`,
                {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        title: todo.title,
                        description: todo.description,
                        status: editedStatus
                    })
                }
            );

            //Felmeddelande vid misslyckande
            if (!resp.ok) throw new Error("Kunde inte uppdatera todo");

            const updatedTodo = await resp.json();
            onTodoUpdated?.(updatedTodo);
            setEditingId(null);

        } catch (err) {
            console.error(err);
        }
    };

    // Ta bort todo (DELETE)
    const deleteTodo = async (id: string) => {
        try {
            const resp = await fetch(
                `https://todo-api-render.onrender.com/api/todos/${id}`,
                { method: "DELETE" }
            );

            //Felmeddelande vid misslyckande
            if (!resp.ok) throw new Error("Kunde inte ta bort todo");

            onTodoDeleted?.(id);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Att göra:</h2>

            <div className="PostGrid">
                {todos.map((post) => (
                    <section key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>

                        {/* Visar dropdown och spara/avbryt när en todo redigeras */}
                        {/* annars visas status samt redigera/radera-knappar */}
                        {editingId === post._id ? (
                            <select
                                value={editedStatus}
                                onChange={(e) => setEditedStatus(Number(e.target.value))}
                            >
                                <option value={0}>Ej påbörjad</option>
                                <option value={1}>Pågående</option>
                                <option value={2}>Avklarad</option>
                            </select>
                        ) : (
                            <p>{statusText[post.status]}</p>
                        )}
                        {editingId === post._id ? (
                            <>
                                <button onClick={() => saveEdit(post)}>Spara</button>
                                <button onClick={() => setEditingId(null)}>Avbryt</button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => startEdit(post)}>Redigera</button>
                                <button onClick={() => deleteTodo(post._id)}>Radera</button>
                            </>
                        )}
                    </section>
                ))}
            </div>
        </div>
    );
};

export default TodoCard;
