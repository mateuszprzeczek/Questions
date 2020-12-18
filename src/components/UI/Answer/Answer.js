import React from "react";
import faker from "faker";

const Answer = (props) => {
    return (
        <div className="ui container comments">
            <div className="comment">
                <a href="/" className="avatar">
                    <img alt="avatar" src={faker.image.people()} />
                </a>
                <div className="content">
                    <a href="/" className="author">
                        {props.author}
                    </a>
                    <div className="metadata">
                        <span className="date">{props.date}</span>
                    </div>
                    <div className="text">{props.content}</div>
                </div>
            </div>
        </div>
    );
};

export default Answer;
