import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Books from "../data/Books";

const Home = () => {
  const [searchText, setSearchText] = useState("");
  const [filteredTopics, setFilteredTopics] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // Extract topics and subtopics from the Books.json file, including their descriptions
  const topics = [];
  Books.forEach((book) => {
    book.chapters.forEach((chapter) => {
      chapter.topics.forEach((topic) => {
        topics.push({ name: topic.name, description: topic.description }); // Add topic with description
        if (topic.subtopics) {
          topic.subtopics.forEach((subtopic) => {
            topics.push({
              name: subtopic.name,
              description: subtopic.description,
            }); // Add subtopic with description
          });
        }
      });
    });
  });

  useEffect(() => {
    if (searchText === "") {
      setFilteredTopics([]);
      setShowDropdown(false);
    } else {
      const filtered = topics.filter((topic) =>
        topic.name.toLowerCase().startsWith(searchText.toLowerCase())
      );
      setFilteredTopics(filtered);
      setShowDropdown(true);
    }
  }, [searchText]);

  const navigate = useNavigate(); // React Router hook to programmatically navigate

  // Navigate to the Results page with the selected topic name as a URL parameter
  const handleTopicSelection = (topicName, topicDescription) => {
    navigate(`/results/${topicName}`, {
      state: { topicDescription },
    });
  };

  return (
    <div className='h-screen flex flex-col justify-center items-center w-full px-8 md:px-32 bg-gradient-to-bl from-[#f3f4f6] via-[#eeeef9] to-[#e5eeff]'>
      <div className='w-full'>
        <div className='flex justify-center w-full items-center gap-3 mb-10'>
          <h1 className='m-0 text-3xl font-bold '>Yabatech CS summerizer</h1>
          {/* <span>
            <svg
              width='30'
              height='30'
              viewBox='0 0 18 18'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M5.19748 11.745C5.43185 11.9119 5.71249 12.0015 6.00022 12.0012C6.28796 12.0009 6.56843 11.9108 6.80248 11.7435C7.03763 11.5699 7.21572 11.3302 7.31398 11.055L7.83448 9.45448C7.95912 9.07729 8.17026 8.73448 8.45103 8.45345C8.7318 8.17242 9.07441 7.96097 9.45148 7.83598L11.0805 7.30648C11.3537 7.20849 11.5892 7.02713 11.7537 6.78802C11.9182 6.54892 12.0034 6.26417 11.9972 5.97401C11.9911 5.68384 11.8939 5.40295 11.7195 5.17101C11.545 4.93907 11.3021 4.76783 11.025 4.68148L9.42148 4.16248C9.04413 4.03782 8.70113 3.8267 8.41986 3.54595C8.13859 3.2652 7.92683 2.9226 7.80148 2.54548L7.27198 0.919475C7.17646 0.650595 6.99967 0.418079 6.76612 0.254138C6.53258 0.0901968 6.25382 0.00294683 5.96848 0.00447531C5.67921 0.0032443 5.39687 0.0929455 5.16135 0.260903C4.92583 0.428861 4.74905 0.666583 4.65598 0.940475L4.12198 2.57548C3.99658 2.94142 3.79004 3.27426 3.51781 3.54909C3.24558 3.82391 2.91472 4.03361 2.54998 4.16248L0.923982 4.68898C0.652344 4.78497 0.417417 4.96331 0.251942 5.19915C0.0864667 5.43499 -0.00131436 5.71658 0.000831896 6.00468C0.00297815 6.29277 0.0949447 6.57302 0.263915 6.80637C0.432886 7.03971 0.670443 7.21454 0.943482 7.30648L2.54398 7.82698C2.92174 7.95343 3.2649 8.16604 3.54633 8.44798C3.82775 8.72993 4.03972 9.07348 4.16548 9.45148L4.69348 11.0715C4.78798 11.3415 4.96498 11.577 5.19898 11.7435L5.19748 11.745ZM12.8025 17.7765C13.006 17.9205 13.2491 17.998 13.4985 17.9985C13.7502 17.9953 13.9948 17.9143 14.1986 17.7666C14.4024 17.6189 14.5556 17.4117 14.637 17.1735L15.009 16.0305C15.0872 15.7924 15.2203 15.5761 15.3974 15.3989C15.5746 15.2217 15.7909 15.0887 16.029 15.0105L17.187 14.6325C17.4265 14.5504 17.6339 14.3946 17.7795 14.1874C17.9251 13.9803 18.0015 13.7324 17.9976 13.4792C17.9938 13.226 17.91 12.9806 17.7582 12.7779C17.6064 12.5753 17.3944 12.4258 17.1525 12.351L16.0065 11.9775C15.7693 11.8985 15.5537 11.7656 15.3767 11.5891C15.1997 11.4126 15.0661 11.1974 14.9865 10.9605L14.6085 9.79948C14.5272 9.56104 14.3729 9.35425 14.1675 9.20841C13.962 9.06257 13.7159 8.98507 13.464 8.98689C13.2121 8.98872 12.9672 9.06977 12.7639 9.21858C12.5606 9.36739 12.4093 9.57639 12.3315 9.81598L11.961 10.959C11.8843 11.1938 11.7545 11.4078 11.5818 11.5844C11.4091 11.761 11.198 11.8955 10.965 11.9775L9.80098 12.357C9.62479 12.4182 9.4653 12.5197 9.33518 12.6534C9.20507 12.7871 9.10791 12.9492 9.05141 13.127C8.99492 13.3048 8.98065 13.4933 9.00974 13.6775C9.03883 13.8618 9.11047 14.0367 9.21898 14.1885C9.36748 14.3985 9.57748 14.556 9.81898 14.6385L10.9635 15.009C11.2015 15.0886 11.4177 15.2227 11.5947 15.4005C11.7718 15.5784 11.9049 15.7951 11.9835 16.0335L12.363 17.1945C12.4452 17.4292 12.5997 17.6325 12.8025 17.7765Z'
                fill='url(#paint0_linear_302_1805)'
              />
              <defs>
                <linearGradient
                  id='paint0_linear_302_1805'
                  x1='2'
                  y1='2'
                  x2='16.5'
                  y2='17'
                  gradientUnits='userSpaceOnUse'
                >
                  <stop stop-color='#6366F1' />
                  <stop offset='0.805592' stop-color='#0EA5E9' />
                  <stop offset='1' stop-color='#10B981' />
                </linearGradient>
              </defs>
            </svg>
          </span> */}
        </div>
        <div className='form-control '>
          <input
            type='text'
            placeholder='Explain…'
            className='input rounded-full w-full focus:outline-none shadow'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {showDropdown && (
            <ul className='menu bg-base-100 w-full p-2 rounded-box border mt-4'>
              {filteredTopics.length > 0 ? (
                filteredTopics.map((topic, index) => (
                  <li
                    key={index}
                    onClick={() =>
                      handleTopicSelection(topic.name, topic.description)
                    }
                  >
                    <a>{topic.name}</a>
                  </li>
                ))
              ) : (
                <div className='dropdown-item'>No topic like this, dear</div>
              )}
            </ul>
          )}
        </div>
      </div>
      <div className='w-full text-center my-8'>
        <h2 className='mb-6'>How it works</h2>

        <div className='flex flex-wrap w-full justify-center gap-4 md:gap-10'>
          <h3 className='bg-base-100 rounded-box p-4 text-left'>
            Search for a Topic 🔎
          </h3>
          <h3 className='bg-base-100 rounded-box p-4 text-left'>
            Select a summary preference 💡
          </h3>
          <h3 className='bg-base-100 rounded-box p-4 text-left'>
            Rinse Repeat ♻
          </h3>
        </div>
      </div>
    </div>
  );
};

export default Home;
