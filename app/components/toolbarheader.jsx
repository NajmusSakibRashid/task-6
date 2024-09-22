import { FiPenTool } from "react-icons/fi";
import { forwardRef, useState } from "react";
import AllTools from "./alltools";

const ToolBarHeader = forwardRef(({ savedState }, ref) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className={`fixed top-0 left-0 p-4 m-4 z-10 bg-yellow-200 rounded-xl drop-shadow-xl ${
        show ? "rotate-0" : "rotate-45"
      } cursor-pointer transition-all`}
      onClick={(e) => setShow(!show)}
    >
      {show && <AllTools ref={ref} savedState={savedState} />}
      <FiPenTool />
    </div>
  );
});

ToolBarHeader.displayName = "ToolBarHeader";

export default ToolBarHeader;
