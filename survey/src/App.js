import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import SurveyQuestion from "./SurveyQuestion";

function App() {
  const [questions, setQuestions] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:1337/api/surveys")
      .then((response) => {
        setQuestions(response.data.data);
      })
      .catch((error) => {
        console.error("An error occurred while retrieving questions:", error);
      });
  }, []);

  const handleResponseSubmit = (questionId, response) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: response,
    });
  };

  const addTask = async (question, answer) => {
    try {
      const response = await axios.post(
        "http://localhost:1337/api/responses/",
        {
          data: {
            Email: email,
            surveyQuestion: question,
            surveyResponse: answer,
          },
        }
      );
      console.log("Answers sent!", response.data);
    } catch (error) {
      console.error("An error occurred while submitting answers:", error);
    }
  };

  const handleSubmit = () => {
    const responsesToSubmit = [];
    for (const questionId in selectedAnswers) {
      responsesToSubmit.push({
        Email: email,
        surveyQuestion: questionId,
        surveyResponse: selectedAnswers[questionId],
      });
      addTask(questionId, selectedAnswers[questionId]);
    }

    setIsSubmitted(true);
    setEmail("");
    setSelectedAnswers({});

    questions.forEach((question) => {
      const radioButtons = document.getElementsByName(
        `question_${question.id}`
      );
      radioButtons.forEach((radioButton) => {
        radioButton.checked = false;
      });
    });
  };

  return (
    <div className="container mx-auto p-4 flex flex-col gap-8">
      <h1 class="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl text-center">
        <span class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          Quiz App
        </span>
        <span class="bg-blue-100 text-blue-800 text-2xl font-semibold mr-2 px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ml-2">
          PRO
        </span>
      </h1>
      <div class="relative mb-6">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 16"
          >
            <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
            <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
          </svg>
        </div>
        <input
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Enter your e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      {questions.map((question) => (
        <SurveyQuestion
          key={question.id}
          question={question}
          onAnswerSelect={handleResponseSubmit}
        />
      ))}
      {isSubmitted ? (
        <div
          class="flex items-center p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400"
          role="alert"
        >
          <svg
            class="flex-shrink-0 inline w-4 h-4 mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
          </svg>
          <span class="sr-only">Info</span>
          <div>
            <span class="font-medium">Success!</span> The form has been sent,
            thanks!.
          </div>
        </div>
      ) : (
        <button
          onClick={handleSubmit}
          className="self-center text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
          Submit
        </button>
      )}
    </div>
  );
}

export default App;
