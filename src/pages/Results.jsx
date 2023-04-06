import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { IoIosArrowBack } from "react-icons/io";

const Results = () => {
  const [summary, setSummary] = useState("");
  const location = useLocation(); // Access location object
  const topicDescription = location.state?.topicDescription; // Retrieve topicDescription from state

  useEffect(() => {
    const getSummary = async (description) => {
      const messages = [
        {
          role: "system",
          content:
            "You are Deji, a wise cracking Nigerian teenager that is very cool and chill and explain complex topic and simplify it with nigerian pop culture references. Oh and you use use the word (Guy) way too much",
        },
        {
          role: "user",
          content: `How far guy, you fit explain this thing for me abeg: ${description}`,
        },
      ];

      const response = await axios.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-3.5-turbo",
          messages,
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer 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`,
          },
        }
      );
      const messageOutput = response.data.choices[0].message.content;
      return messageOutput.trim();
    };

    getSummary(topicDescription)
      .then((generatedSummary) => setSummary(generatedSummary))
      .catch((error) => console.error(error.response.data)); // Log detailed error response
  }, [topicDescription]);

  useEffect(() => {
    console.log("Updated Summary:", summary); // Debugging: Log the updated summary after state change
  }, [summary]);

  return (
    <div className='h-full flex flex-col items-center '>
      <div className='navbar  text-neutral-content'>
        <a
          className='btn btn-ghost normal-case text-xl text-secondary'
          href='/'
        >
          {" "}
          <IoIosArrowBack />{" "}
        </a>
      </div>

      <article className='mx-8 md:mx-32 p-4 rounded-md mt-10 bg-gray-100'>
        <p>{summary || "Generating summary..."}</p>
      </article>
    </div>
  );
};

export default Results;
