import React, {useState, useEffect} from 'react';
import axios from '../../axios';
import { Route } from 'react-router-dom';

import Post from '../../components/Post/Post';
import FullQuestion from '../FullQuestion/FullQuestion'
import classes from './Questions.module.css';

const Questions = (props) => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        axios.get('/questions.json')
        .then(response => {
            
            const questionsData = [];
            for (let key in response.data) {
                questionsData.push({
                    ...response.data[key],
                    id: key,
                });
            }
            setQuestions(questionsData)
            })
    }, [])

    let downloadedQuestions = questions.map(question => {
        return (
            <Post
                key={question.id}
                title={question.title}
                author={question.author}
                clicked={() => questionSelectedHandler(question.id)} />
        )
    })

    const questionSelectedHandler = (id) => {
        props.history.push('/questions/' + id);
        window.scrollTo(0, 0);
   } 

    return (
        <div>
             <Route path={props.match.url + '/:id'} exact component={FullQuestion} />
            <section className={classes.Questions}>
                {downloadedQuestions}
            </section>
           
        </div>
    )
}

export default Questions;