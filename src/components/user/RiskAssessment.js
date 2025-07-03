import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { submitRiskAssessment } from '../../store/slices/riskAssessmentSlice';

const RiskAssessment = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [answers, setAnswers] = useState({
    q1: '',
    q2: '',
    q3: '',
  });

  const questions = [
    {
      id: 'q1',
      question: 'How would you describe your investment knowledge?',
      options: [
        { text: 'Limited', value: 1 },
        { text: 'Some knowledge', value: 2 },
        { text: 'Good', value: 3 },
        { text: 'Extensive', value: 4 },
      ],
    },
    {
      id: 'q2',
      question: 'What is your primary investment goal?',
      options: [
        { text: 'Capital preservation', value: 1 },
        { text: 'Income generation', value: 2 },
        { text: 'Capital growth', value: 3 },
        { text: 'Aggressive growth', value: 4 },
      ],
    },
    {
      id: 'q3',
      question: 'How would you react to a 20% drop in your portfolio value?',
      options: [
        { text: 'Sell all investments', value: 1 },
        { text: 'Sell some investments', value: 2 },
        { text: 'Hold investments', value: 3 },
        { text: 'Buy more investments', value: 4 },
      ],
    },
  ];

  const handleChange = (e) => {
    setAnswers({ ...answers, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedAnswers = questions.map(q => ({
      questionId: q.id,
      value: parseInt(answers[q.id]),
    }));

    try {
      await dispatch(submitRiskAssessment({ answers: formattedAnswers })).unwrap();
      alert('Risk assessment submitted successfully!');
      navigate('/dashboard'); // Redirect after submission
    } catch (err) {
      console.error('Failed to submit risk assessment:', err);
      alert(`Failed to submit risk assessment: ${err.msg || 'Unknown error'}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Risk Assessment Questionnaire</h1>
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 max-w-2xl mx-auto">
        {questions.map((q) => (
          <div key={q.id} className="mb-6">
            <label className="block text-gray-700 text-lg font-bold mb-3">
              {q.question}
            </label>
            {q.options.map((option) => (
              <div key={option.value} className="mb-2">
                <input
                  type="radio"
                  id={`${q.id}-${option.value}`}
                  name={q.id}
                  value={option.value}
                  checked={answers[q.id] === String(option.value)}
                  onChange={handleChange}
                  className="mr-2 leading-tight"
                  required
                />
                <label htmlFor={`${q.id}-${option.value}`} className="text-gray-700">
                  {option.text}
                </label>
              </div>
            ))}
          </div>
        ))}

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
        >
          Submit Assessment
        </button>
      </form>
    </div>
  );
};

export default RiskAssessment;
