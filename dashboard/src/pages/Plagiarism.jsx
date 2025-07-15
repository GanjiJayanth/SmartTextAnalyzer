import React from 'react';
import TextInputPanel from '../components/Plagrism/TextInputPanel';
import CheckboxGroup from '../components/Plagrism/CheckboxGroup';
import TipSection from '../components/Plagrism/TipSection';
import ComparisonReport from '../components/Plagrism/ComparisonReport';

function Plagiarism() {
  const placeholder = `Upload an image. It returns: Tags, Descriptions...`;
  const fakeDocText = `Yes :) Here are some free and reliable websites...`;

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInputPanel placeholder={placeholder} count={1476} />
          <TextInputPanel placeholder="Other text area" count={1476} />
        </div>
        <div className="mt-6 flex flex-col items-center">
          <CheckboxGroup />
          <button className="btn-primary w-full max-w-xs mt-2">Compare Now</button>
          <p className="text-xs text-gray-500 mt-2">Note: We don't save any data on our servers.</p>
        </div>
        {/* <TipSection /> */}
        <ComparisonReport firstDoc={fakeDocText} secondDoc={fakeDocText} />
      </div>
    </div>
  );
}

export default Plagiarism;
