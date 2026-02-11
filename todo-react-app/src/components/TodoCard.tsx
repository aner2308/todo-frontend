import { useState, useEffect } from "react";
import "./TodoCard.css";



const TodoCard = () => {

    interface Post {
        title: string,
        description: string,
        _id: string,
        status: number
    }

    const [posts, setPosts] = useState<Post[] | []>([]);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const statusText = ["Ej påbörjad", "Pågående", "Avklarad"];

    useEffect(() => {
        getPosts();
    }, [])

    const getPosts = async () => {
        try {
            setLoading(true);

            const resp = await fetch("https://todo-api-render.onrender.com/api/todos");

            if (!resp.ok) {
                throw Error;
            } else {
                const data = await resp.json();

                setPosts(data);
                setError(null);
            }

        } catch (error) {
            console.log(error);
            setError("Något gick fel vid hämtning av poster..")
        } finally {

            //Lägger in text att data laddas in
            setLoading(false);
        }
    }

    return <div>
        <h2>Att göra:</h2>

        {
            error && <p className="info">{error}</p>
        }

        {
            loading && <p className="info">Laddar in poster...</p>
        }

        <div className="PostGrid">
            {
                posts.map((post) => {

                    return <section key={post._id}>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <p>{statusText[post.status]}</p>
                    </section>
                })
            }
        </div>
    </div>

}

export default TodoCard