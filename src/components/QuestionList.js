import React from "react";

function QuestionList({ questions, handleUpdateQuestion, deleteQuestion }) {

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map((question) => (
        <li>{question.prompt}
          <label>
            Correct Answer:
            <select
              value={question.correctIndex}
              onChange={(e) => handleUpdateQuestion(question.id, parseInt(e.target.value)
            )}>
              {question.answers.map((answer, index) => (
                <option key={index} value={index}>
                  {answer}
                </option>
              ))}
            </select>
          </label>
          <button onClick={() => deleteQuestion(question.id)}>Delete Question</button>
        </li>
      ))}</ul>
    </section>
  );
}

export default QuestionList;
