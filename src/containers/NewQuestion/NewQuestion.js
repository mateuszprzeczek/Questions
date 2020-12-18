import React, { useState } from "react";
import axios from "../../axios";
import { Redirect } from "react-router-dom";

import useDropdown from '../../components/UI/Dropdown/useDropdown';
import classes from "./NewQuestion.module.css";

const NewQuestion = () => {
    const [title, setTitle] = useState("");
    const [questionBody, setQuestionBody] = useState("");
    const [author, setAuthor] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const categories = ["Career", "Pets", "Cars", "IT", "About Me", "Another"];
    const [category, CategoryDropdown] = useDropdown("", "Category", categories);

    const postDataHandler = () => {
        const data = {
            title: title,
            body: questionBody,
            author: author,
            category: category
        };
        axios.post("/questions.json", data).then((response) => {
            setSubmitted(true);
        });
    };

    let redirect = null;
    if (submitted) {
        redirect = <Redirect to="/questions" />;
    }
    return (
        <div className={classes.NewPost}>
            {redirect}
            <h1>Take a question</h1>
            <label>Title</label>
            <input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <label>Description</label>
            <textarea
                rows="4"
                value={questionBody}
                onChange={(event) => setQuestionBody(event.target.value)}
            />
            <label>Author</label>
            <input
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
            />
            <CategoryDropdown />
            <button onClick={postDataHandler}>Send</button>
        </div>
    );
};

export default NewQuestion;
