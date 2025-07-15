
function CheckboxGroup() {
  return (
    <div className="flex items-center space-x-2 mb-2">
      <input id="ignore-common" type="checkbox" className="checkbox" />
      <label htmlFor="ignore-common" className="checkbox-label">Ignore common words</label>
      <input id="find-similar" type="checkbox" className="checkbox" />
      <label htmlFor="find-similar" className="checkbox-label">Find similar sentences</label>
    </div>
  );
}

export default CheckboxGroup;
