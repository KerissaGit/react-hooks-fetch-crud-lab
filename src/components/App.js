import React, { useEffect, useState } from "react";
import AdminNavBar from "./AdminNavBar";
import QuestionForm from "./QuestionForm";
import QuestionList from "./QuestionList";

function App() {
  const [page, setPage] = useState("List");
  const [questions, setQuestions] = useState([])

    useEffect(() => {
      fetch("http://localhost:4000/questions")
      .then((resp) => resp.json())
      .then((data) => setQuestions(data));
    }, [])

    function addQuestion(newQuestion) {
      fetch("http://localhost:4000/questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newQuestion),
      })
        .then((response) => response.json())
        .then((addedQuestion) => {
          setQuestions((prevQuestions) => [...prevQuestions, addedQuestion]);
        })
    }
  
    function handleUpdateQuestion(id, newCorrectIndex) {
      fetch(`http://localhost:4000/questions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correctIndex: newCorrectIndex }),
      })
        .then((response) => response.json())
        .then((updatedQuestion) => {
          setQuestions((prevQuestions) =>
            prevQuestions.map((quests) =>
              quests.id === id ? { ...quests, correctIndex: updatedQuestion.correctIndex } : quests
            )
          );
      })
    }

  function deleteQuestion(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
    method: "DELETE" })
      .then(() => {
        setQuestions((prevQuestions) => prevQuestions.filter((quests) => quests.id !== id));
    })
  }


  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === "Form" ? (
        <QuestionForm addQuestion={addQuestion}/>
         ) : (
        <QuestionList 
          questions={questions}
          handleUpdateQuestion={handleUpdateQuestion}
          deleteQuestion={deleteQuestion}
        />)}
    </main>
  );
}

export default App;
