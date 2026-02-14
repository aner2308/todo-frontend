import { useState } from "react";
import "./TodoForm.css";

//Callback som körs när ny todo läggs till
interface TodoFormProps {
    onTodoAdded?: (todo: Post) => void;
}

//Interface för en todo
interface Post {
    _id: string;
    title: string;
    description: string;
    status: number;
}

const TodoForm = ({ onTodoAdded }: TodoFormProps) => {

    //FormData som lagrar användarens input
    interface FormData {
        title: string
        description: string
        status: number
    }

    //Interface för felmeddelanden
    interface ErrorsData {
        title?: string,
        description?: string
    }



    //state för formulär
    const [formData, setFormData] = useState<FormData>({ title: "", description: "", status: 0 })

    //state för errors
    const [errors, setErrors] = useState<ErrorsData>({})

    //Validerar formuläret innan det skickas
    const validateForm = ((data: FormData) => {

        //Tomt objekt för att lagra eventuella felmeddelanden
        const validationErrors: ErrorsData = {};

        //Felmeddelande vid saknad title
        if (!data.title || data.title.length < 3) {
            validationErrors.title = "Din titel måste vara minst tre tecken lång."
        }

        //Felmeddelande vid för lång beskrivning
        if (data.description.length > 200) {
            validationErrors.description = "Din beskrivning får max vara 200 tecken lång."
        }

        return validationErrors;
    })

    //Funktion som körs vid submit
    const submitForm = async (event: any) => {
        event?.preventDefault();

        //Validerar formuläret med funktionen validateForm
        const validationErrors = validateForm(formData);

        //Om felmeddelanden finns visas dom
        if (Object.keys(validationErrors).length > 0) {

            setErrors(validationErrors);
        } else {

            //Tömmer errors
            setErrors({});

            try {
                //POST till API med formulärdatan
                const resp = await fetch("https://todo-api-render.onrender.com/api/todos", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                //Vid fel
                if (!resp.ok) {
                    const errData = await resp.json();
                    alert("Fel: " + (errData.error || "Okänt fel"));
                    return;
                }

                //Hämtar nytt objekt från API respons
                const newTodo = await resp.json();
                console.log("Ny todo skapad:", newTodo);

                //Uppdterar listan
                if (onTodoAdded) {
                    onTodoAdded(newTodo);
                }

                // Töm formuläret
                setFormData({ title: "", description: "", status: 0 });


            } catch (err) {
                console.error("Fel vid API-anrop:", err);
            }
        }
    };

    return (
        <form onSubmit={submitForm}>
            <label htmlFor="title">Titel</label>
            <input type="text" name="title" id="title" value={formData.title}
                onChange={(event) => setFormData({ ...formData, title: event.target.value })} />

            {errors.title && <span className="errorMessage">{errors.title}</span>}

            <label htmlFor="description">Beskrivning</label>
            <textarea name="description" id="description" value={formData.description}
                onChange={(event) => setFormData({ ...formData, description: event.target.value })}></textarea>

            {errors.description && <span className="errorMessage">{errors.description}</span>}

            <label htmlFor="status">Status</label>
            <select name="status" id="status" value={formData.status}
                onChange={(event) => setFormData({ ...formData, status: Number(event.target.value) })}>
                <option value="0">Ej påbörjad</option>
                <option value="1">Pågående</option>
                <option value="2">Avklarad</option>
            </select>

            <button type="submit">Spara till listan</button>
        </form>
    )
}

export default TodoForm