import { useState } from "react";
import "./TodoForm.css";

const TodoForm = () => {

    interface FormData {
        title: string
        description: string
        status: number
    }

    const [formData, setFormData] = useState<FormData>({ title: "", description: "", status: 0 })

    return (
        <form action="">
            <label htmlFor="title">Titel</label>
            <input type="text" name="title" id="title" />

            <label htmlFor="description">Beskrivning</label>
            <textarea name="description" id="description"></textarea>

            <label htmlFor="status">Status</label>
            <select name="status" id="status">
                <option value="0">Ej påbörjad</option>
                <option value="1">Pågående</option>
                <option value="2">Avklarad</option>
            </select>

            <button type="submit">+ Spara till listan</button>
        </form>
    )
}

export default TodoForm