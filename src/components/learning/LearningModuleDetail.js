import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getLearningModuleById, completeLearningModule } from '../../store/slices/learningModuleSlice';
import CommentSection from '../ui/CommentSection';

const LearningModuleDetail = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const { currentModule, loading, error } = useSelector((state) => state.learningModule);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  useEffect(() => {
    if (slug) {
      dispatch(getLearningModuleById(slug));
    }
  }, [dispatch, slug]);

  if (loading) return <p>Loading module...</p>;
  if (error.message) return <p>Error: {error.message}</p>;
  if (!currentModule) return <p>Module not found.</p>;

  const currentSection = currentModule.content.sections[currentSectionIndex];

  const handleNextSection = async () => {
    if (currentSectionIndex < currentModule.content.sections.length - 1) {
      setCurrentSectionIndex(currentSectionIndex + 1);
    } else {
      // User finished the last section, mark module as complete
      try {
        await dispatch(completeLearningModule(currentModule._id)).unwrap();
        alert('Module completed! XP awarded.');
        navigate('/learn'); // Redirect to learning modules list
      } catch (err) {
        console.error('Failed to complete module:', err);
        alert('Failed to complete module.');
      }
    }
  };

  const handlePreviousSection = () => {
    if (currentSectionIndex > 0) {
      setCurrentSectionIndex(currentSectionIndex - 1);
    }
  };

  const handleQuizAnswerChange = (questionIndex, optionIndex) => {
    setQuizAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionIndex]: optionIndex
    }));
  };

  const handleQuizSubmit = () => {
    setQuizSubmitted(true);
    // TODO: Calculate score and potentially award XP/badges based on quiz performance
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <Link to="/learn" className="text-blue-500 hover:underline mb-4 inline-block">&larr; Back to Modules</Link>
      <h1 className="text-3xl font-bold text-gray-800 mb-4">{currentModule.title}</h1>
      <p className="text-gray-600 mb-6">{currentModule.description}</p>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">{currentSection.title}</h2>
        <div className="prose max-w-none mb-6" dangerouslySetInnerHTML={{ __html: currentSection.content }}></div>

        {currentSection.mediaType === 'video' && currentSection.mediaUrl && (
          <div className="mb-6">
            <video controls className="w-full rounded-lg">
              <source src={currentSection.mediaUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}

        {currentSection.quiz && currentSection.quiz.length > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Quiz</h3>
            {currentSection.quiz.map((q, qIndex) => (
              <div key={qIndex} className="mb-4">
                <p className="font-medium mb-2">{q.question}</p>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`q${qIndex}-o${oIndex}`}
                      name={`quiz-${qIndex}`}
                      className="mr-2"
                      checked={quizAnswers[qIndex] === oIndex}
                      onChange={() => handleQuizAnswerChange(qIndex, oIndex)}
                      disabled={quizSubmitted}
                    />
                    <label htmlFor={`q${qIndex}-o${oIndex}`}>{option}</label>
                    {quizSubmitted && quizAnswers[qIndex] === oIndex && (
                      q.correctAnswer === oIndex ? (
                        <span className="ml-2 text-green-600">&#10003; Correct!</span>
                      ) : (
                        <span className="ml-2 text-red-600">&#10007; Incorrect.</span>
                      )
                    )}
                    {quizSubmitted && q.correctAnswer === oIndex && quizAnswers[qIndex] !== oIndex && (
                      <span className="ml-2 text-green-600">Correct answer: {q.options[q.correctAnswer]}</span>
                    )}
                  </div>
                ))}
                {quizSubmitted && (
                  <p className="text-sm text-gray-600 mt-2">Explanation: {q.explanation}</p>
                )}
              </div>
            ))}
            {!quizSubmitted && (
              <button
                onClick={handleQuizSubmit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 mt-4"
              >
                Submit Quiz
              </button>
            )}
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            onClick={handlePreviousSection}
            disabled={currentSectionIndex === 0}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 disabled:opacity-50"
          >
            Previous
          </button>
          <button
            onClick={handleNextSection}
            disabled={currentSectionIndex === currentModule.content.sections.length - 1}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200 disabled:opacity-50"
          >
            {currentSectionIndex === currentModule.content.sections.length - 1 ? 'Finish Module' : 'Continue'}
          </button>
        </div>
      </div>
      <CommentSection targetType="learningModule" targetId={currentModule._id} />
    </div>
  );
};

export default LearningModuleDetail;
