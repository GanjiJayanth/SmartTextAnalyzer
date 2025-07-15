import { useState } from "react";

function CheckboxGroup({setCommon,setSimilar}) {
  const [checkbox1,setCheckbox1]=useState(false)
  const [checkbox2,setCheckbox2]=useState(false)

  const onCheckbox1=(e)=>{
    const temp1 = !checkbox1
    setCheckbox1(temp1)
    setCommon(temp1)
  }

  const onCheckbox2=(e)=>{
    const temp2  = !checkbox2
    setCheckbox2(temp2)
    setSimilar(temp2)
  }

  return (
    <div className="flex items-center space-x-2 mb-2">
      <input id="ignore-common" type="checkbox" className="checkbox"  onChange={onCheckbox1}/>
      <label htmlFor="ignore-common" className="checkbox-label">Ignore common words</label>
      <input id="find-similar" type="checkbox" className="checkbox"  onChange={onCheckbox2}/>
      <label htmlFor="find-similar" className="checkbox-label">Find similar sentences</label>
    </div>
  );
}

export default CheckboxGroup;
