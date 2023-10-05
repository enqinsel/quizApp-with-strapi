import React from "react";

function SurveyQuestion({ question, onAnswerSelect }) {
  return (
    <div className="grid grid-cols gap-3   p-4 rounded-lg text-gray-500 bg-gray-50 border border-gray-300">
      <p>{question.attributes.question}</p>
      <label className="self-start flex gap-1 items-center">
        <input
          type="radio"
          name={`question_${question.id}`}
          value="a"
          onClick={() =>
            onAnswerSelect(question.attributes.question, question.attributes.a)
          }
          className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span className="">{question.attributes.a}</span>
      </label>
      <label className="self-start flex gap-1 items-center">
        <input
          type="radio"
          name={`question_${question.id}`}
          value="b"
          onClick={() =>
            onAnswerSelect(question.attributes.question, question.attributes.b)
          }
          className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span>{question.attributes.b}</span>
      </label>
      <label className="self-start flex gap-1 items-center">
        <input
          type="radio"
          name={`question_${question.id}`}
          value="c"
          onClick={() =>
            onAnswerSelect(question.attributes.question, question.attributes.c)
          }
          className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        />
        <span>{question.attributes.c}</span>
      </label>
    </div>
  );
}

export default SurveyQuestion;
