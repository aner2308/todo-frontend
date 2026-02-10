import { useState } from "react";
import "./TodoForm.css";

const TodoForm = () => {

    interface FormData {
        title: string
        description: string
        status: number
    }

    const [formData, setFormData] = useState<FormData>({ title: "", description: "", status: 0 })

    const submitForm = ((event: any) => {
        event?.preventDefault();

        console.log("Test av funktion submit")
    }) 

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title">Titel</label>
            <input type="text" name="title" id="title" value={formData.title} 
            onChange={(event) => setFormData({...formData, title: event.target.value})}/>

            <label htmlFor="description">Beskrivning</label>
            <textarea name="description" id="description" value={formData.description}
            onChange={(event) => setFormData({...formData, description: event.target.value})}></textarea>

            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status}
            onChange={(event) => setFormData({...formData, status: Number(event.target.value)})}>
                <option value="0">Ej påbörjad</option>
                <option value="1">Pågående</option>
                <option value="2">Avklarad</option>
            </select>

            <button type="submit">Spara till listan</button>
        </form>
    )
}

export default TodoForm