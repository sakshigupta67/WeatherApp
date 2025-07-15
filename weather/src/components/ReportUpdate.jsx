import React, { useState } from 'react';

const ReportUpdate = () => {
  const [reportType, setReportType] = useState('Bug');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // Here you could add logic to send the report to a backend or service
  };

  return (
    <div className='bg-white/10 border border-white/20 rounded-2xl shadow-lg p-6 flex flex-col min-h-[120px] w-full items-center justify-center mt-6' style={{ maxWidth: '320px', minHeight: '180px' }}>
      <span className='font-medium text-lg text-gray-900 mb-2 text-center block'>Found a bug?</span>
      {submitted ? (
        <span className='text-emerald-900 font-semibold'>Thank you for your feedback!</span>
      ) : (
        <form onSubmit={handleSubmit} className='flex flex-col items-center w-full'>
          <select
            className='mb-3 p-2 rounded border border-gray-300 w-full text-gray-800'
            value={reportType}
            onChange={e => setReportType(e.target.value)}
          >
            <option value='Bug'>Bug</option>
            <option value='Incorrect Data'>Incorrect Data</option>
            <option value='UI Issue'>UI Issue</option>
            <option value='Other'>Other(visit Home Page)</option>
          </select>
          <button
            type='submit'
            className='bg-emerald-900 text-white px-4 py-2 rounded hover:bg-emerald-800 transition-colors w-full font-semibold'
          >
            Help us improve
          </button>
        </form>
      )}
    </div>
  );
};

export default ReportUpdate; 