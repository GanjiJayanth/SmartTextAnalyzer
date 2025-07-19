import MatchStats from './MatchStats';


function ComparisonReport({ firstDoc, secondDoc,words,percentage }) {
  return (
    <div className="mt-8 border border-gray-200 rounded-lg">
      <div className="p-4 bg-gray-50 rounded-t-lg flex justify-between items-center border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800">Comparison Report</h2>
        <button className="btn-primary flex items-center">
          <span className="material-icons text-sm mr-1">download</span> Download Report
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12">
        <div className="md:col-span-5 p-4">
          <h3 className="text-md font-medium text-gray-700 mb-2">First Document</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{firstDoc}</p>
        </div>
        <div className="md:col-span-2 p-4 flex flex-col items-center justify-center border-l border-r border-gray-200">
          <p className="text-sm text-gray-500 mb-1">Matches</p>
          <div className="text-center">
            <p className="text-2xl font-semibold text-red-500">&lt;&gt; {words}</p>
            <p className="text-xs text-gray-500">words</p>
          </div>
          <div className="my-4 border-t border-gray-300 w-16"></div>
          <div className="text-center">
            <p className="text-2xl font-semibold text-red-500">1</p>
            <p className="text-xs text-gray-500">matches</p>
            <p className="text-xs text-gray-500">found</p>
          </div>
        </div>
        <div className="md:col-span-5 p-4">
          <h3 className="text-md font-medium text-gray-700 mb-2">Second Document</h3>
          <p className="text-sm text-gray-600 leading-relaxed">{secondDoc}</p>
        </div>
      </div>
      <MatchStats  percentage={percentage} words={words} totalwords1={firstDoc.length} totalwords2={secondDoc.length}/>
    </div>
  );
}

export default ComparisonReport;
