import { forwardRef } from "react";
import { FaFileImport } from "react-icons/fa";
import { FaFileExport } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { FaRedo } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
const AllTools = forwardRef(({ savedState: [saved, setSaved] }, ref) => {
  return (
    <div
      className="absolute top-full left-0 w-auto flex gap-4 p-4 m-2 ml-0 bg-yellow-500 rounded-xl transition-all cursor-default"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => {
          ref.current.loadPaths(saved);
        }}
      >
        <FaFileImport />
      </button>
      <button onClick={async (e) => setSaved(await ref.current.exportPaths())}>
        <FaFileExport />
      </button>
      <button onClick={() => ref.current.undo()}>
        <FaUndo />
      </button>
      <button onClick={() => ref.current.redo()}>
        <FaRedo />
      </button>
      <button onClick={() => ref.current.clearCanvas()}>
        <FaTrash />
      </button>
    </div>
  );
});

AllTools.displayName = "AllTools";

export default AllTools;
