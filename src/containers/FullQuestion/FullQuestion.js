import React, {useState, useEffect} from 'react';
import axios from '../../axios';
import {connect} from 'react-redux'

import classes from'./FullQuestion.module.css';

const FullPost = (props) => {
    const [loadedQuestion, setLoadedQuestion] = useState([]);
    const [answer, setAnswer] = useState('');
    const [showAnswer, setShowAnswer] = useState('');

    const answerHandler = () => {
        const answerData = {
            title: loadedQuestion.title,
            body: loadedQuestion.body,
            author: loadedQuestion.author,
            answer: answer}
        axios.put('/questions/' + props.match.params.id + '.json', answerData )
            .then(response => {
                props.history.push('/questions');
            });
    }
    useEffect(() => {
        let isSubscribed = true;
        if ( props.match.params.id ) {
            if ( !loadedQuestion || (loadedQuestion && loadedQuestion.id !== +props.match.params.id) ) {
                axios.get( '/questions/' + props.match.params.id + '.json' )
                    .then( response => {
                        if (isSubscribed)
                        setLoadedQuestion(response.data)
                    } );
            }
        }
        return () => isSubscribed = false;
    }, [props.match.params.id, loadedQuestion])
    
    const showAnswerHandler = () => {
        const loadedAnswer = loadedQuestion.answer;
        setShowAnswer(loadedAnswer);
    }

    let showAnswers = null;
    if(loadedQuestion.answer) {
        showAnswers = (
            <div>
                <button className={classes.ShowAnswersButton} onClick={showAnswerHandler}>Show Answers</button>
            </div>
        )
    }

        let post = <p style={{ textAlign: 'center' }}>Please select a Post!</p>;
        if ( props.match.params.id ) {
            post = <p style={{ textAlign: 'center' }}>Loading...!</p>;
        }
        if ( loadedQuestion ) {
            post = (
                <React.Fragment>
                    <div className={classes.FullPost}>
                         <h1>{loadedQuestion.title}</h1>
                         <p>{loadedQuestion.body}</p>
                    <div>
                    {showAnswers}
                     <p className={classes.ShowAnswer}>
                    {showAnswer}
                    </p>
                    </div>
                    {props.isAuth ? 
                    (<React.Fragment>
                        <div>
                            <label><h3>Your Answer</h3></label>
                        </div>
                        <textarea rows='4' value={answer} onChange={event => setAnswer(event.target.value)} />
                            <div className={classes.Edit}>
                                <button onClick={answerHandler} className={classes.Answer}>Submit</button>
                            </div>
                    </React.Fragment>)
                     : null}
                </div>
                <div className={classes.GoBack} onClick={props.history.goBack}>Go Back</div>
                </React.Fragment>
            );
        }
        return post;
    }

    const mapStateToProps = (state) => {
        return {
            isAuth: state.token !== null,
        }
    }

export default connect(mapStateToProps) (FullPost);