import React, { useState, useEffect } from "react";
import axios from "../../axios";
import { connect } from "react-redux";

import Answer from "../../components/UI/Answer/Answer";
import classes from "./FullQuestion.module.css";

const FullPost = (props) => {
    const [loadedQuestion, setLoadedQuestion] = useState([]);
    const [answer, setAnswer] = useState("");
    const [fetchedAnswer, setFethedAnswer] = useState([]);
    const [author, setAuthor] = useState("");
    const [isShowed, setIsShowed] = useState(false);

    const answerHandler = () => {
        const answerUpdate = {
            answer: answer,
            author: author,
            date: new Date().toUTCString(),
        };
        axios
            .post(
                "/questions/" + props.match.params.id + "/answers.json",
                answerUpdate
            )
            .then((response) => {
                props.history.push("/questions");
            });
    };
    useEffect(() => {
        let isSubscribed = true;
        if (props.match.params.id) {
            if (
                !loadedQuestion ||
                (loadedQuestion && loadedQuestion.id !== +props.match.params.id)
            ) {
                axios
                    .get("/questions/" + props.match.params.id + ".json")
                    .then((response) => {
                        if (isSubscribed) {
                            setLoadedQuestion(response.data);
                            if (response.data.answers) {
                                const commentsData = [];
                                for (let key in response.data.answers) {
                                    commentsData.push({
                                        ...response.data.answers[key],
                                        id: key,
                                    });
                                }
                                setFethedAnswer(commentsData);
                            }
                        }
                    });
            }
        }
        return () => (isSubscribed = false);
    }, []);

    const showAnswerHandler = () => {
        setIsShowed(true);
    };

    let downloadedAnswers = null;
    if (isShowed) {
        downloadedAnswers = fetchedAnswer.map((a) => {
            console.log(a);
            return (
                <Answer
                    key={a.id}
                    author={a.author}
                    date={a.date}
                    content={a.answer}
                />
            );
        });
    }

    let showAnswers = null;
    if (fetchedAnswer) {
        showAnswers = (
            <div>
                <button
                    className={classes.ShowAnswersButton}
                    onClick={showAnswerHandler}
                >
                    Show Answers
                </button>
            </div>
        );
    }

    let post = <p style={{ textAlign: "center" }}>Please select a Post!</p>;
    if (props.match.params.id) {
        post = <p style={{ textAlign: "center" }}>Loading...!</p>;
    }
    if (loadedQuestion) {
        post = (
            <React.Fragment>
                <div className={classes.FullPost}>
                    <h1>{loadedQuestion.title}</h1>
                    <p>{loadedQuestion.body}</p>
                    <div>{showAnswers}</div>
                    {props.isAuth ? (
                        <React.Fragment>
                            <div>
                                <label>
                                    <h3>Your Answer</h3>
                                </label>
                            </div>
                            <textarea
                                rows="4"
                                value={answer}
                                onChange={(event) =>
                                    setAnswer(event.target.value)
                                }
                            />
                            <div>
                                <label>
                                    <h3>Author</h3>
                                </label>
                            </div>
                            <input
                                type="text"
                                value={author}
                                onChange={(event) =>
                                    setAuthor(event.target.value)
                                }
                            />
                            <div className={classes.Edit}>
                                <button
                                    onClick={answerHandler}
                                    className={classes.Answer}
                                >
                                    Submit
                                </button>
                            </div>
                        </React.Fragment>
                    ) : null}
                </div>
                <div className={classes.GoBack} onClick={props.history.goBack}>
                    Go Back
                </div>
                {downloadedAnswers}
            </React.Fragment>
        );
    }
    return post;
};

const mapStateToProps = (state) => {
    return {
        isAuth: state.token !== null,
    };
};

export default connect(mapStateToProps)(FullPost);
