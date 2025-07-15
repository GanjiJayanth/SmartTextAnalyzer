import React, { useState } from 'react';
import TextInputPanel from '../components/Plagrism/TextInputPanel';
import CheckboxGroup from '../components/Plagrism/CheckboxGroup';
import ComparisonReport from '../components/Plagrism/ComparisonReport';
import axios from 'axios';

function Plagiarism() {
  const [textArea1, setTextArea1] = useState("");
  const [textArea2, setTextArea2] = useState("");
  const [common, setCommon] = useState(false);
  const [similar, setSimilar] = useState(false);
  const [wordMatches, setWordMatches] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [textReport1, settextReport1] = useState("");
  const [textReport2, settextReport2] = useState("");
  
  const onCompare = () => {
    if (
      !textArea1 ||
      !textArea2 ||
      textArea1.trim().split(/\s+/).length < 2 ||
      textArea2.trim().split(/\s+/).length < 2
    ) {
      alert("Please enter at least two words in both text areas.");
      return;
    }
    const reqBody = {
      textArea1,
      textArea2,
      common,
      similar,
    };
    axios
      .post("https://grammerly.free.beeceptor.com/plagiarism-check", reqBody)
      .then((res) => {
        // console.log(res)
        setPercentage(
          typeof res.data?.percentage === "number" ? Math.floor(res.data.percentage/100000000000000) : 0
        );
        setWordMatches(
          typeof res.data?.match === "number" ? Math.floor(res.data.match/100000000000000) : 0
        );

        settextReport1(textArea1)
        settextReport2(textArea2)

      })
      .catch(() => {
        setPercentage(0);
        setWordMatches(0);
        alert("Error checking plagiarism. Please try again.");
      });

  };

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-6">
      <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TextInputPanel
            count={typeof textArea1 === "string" ? textArea1.length : 0}
            setTextArea={setTextArea1}
          />
          <TextInputPanel
            count={typeof textArea2 === "string" ? textArea2.length : 0}
            setTextArea={setTextArea2}
          />
        </div>
        <div className="mt-6 flex flex-col items-center">
          <CheckboxGroup setCommon={setCommon} setSimilar={setSimilar} />
          <button
            className="btn-primary w-full max-w-xs mt-2"
            onClick={onCompare}
          >
            Compare Now
          </button>
          <p className="text-xs text-gray-500 mt-2">
            Note: We don't save any data on our servers.
          </p>
        </div>
        <ComparisonReport
          firstDoc={typeof textReport1 === "string" ? textReport1 : ""}
          secondDoc={typeof textReport2 === "string" ? textReport2 : ""}
          words={typeof wordMatches === "number" ? wordMatches : 0}
          percentage={typeof percentage === "number" ? percentage : 0}
        />
      </div>
    </div>
  );
}

export default Plagiarism;