import { Link } from "react-router-dom";
import "./Editor.css";

function ToneSidebar() {
  return (
    <aside className="tone-sidebar w-[380px] bg-[var(--white)] rounded-xl shadow-lg flex flex-col overflow-hidden shrink-0 @lg:w-[380px] @md:w-[320px]">
      <div className="border-b border-[var(--border-color)] px-1">
        <nav className="flex gap-1">
          <Link
            className="sidebar-tab flex-1 text-center py-3 px-2 text-sm font-medium text-[var(--text-secondary)] border-b-2 border-transparent"
            to="/dashboard/editor"
          >
            Grammar
          </Link>
          <Link
            className="sidebar-tab flex-1 text-center py-3 px-2 text-sm font-medium text-[var(--text-secondary)] border-b-2 border-transparent"
            to="/dashboard/editor/style"
          >
            Style
          </Link>
          <Link
            className="sidebar-tab flex-1 text-center py-3 px-2 text-sm font-medium text-[var(--text-secondary)] border-b-2 border-transparent active"
            to="/dashboard/editor/tone"
          >
            Tone
          </Link>
          <Link
            className="sidebar-tab flex-1 text-center py-3 px-2 text-sm font-medium text-[var(--text-secondary)] border-b-2 border-transparent"
            to="/dashboard/editor/readability"
          >
            Readability
          </Link>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-3">
          <h3 className="text-[var(--text-primary)] text-md font-semibold mb-3">
            Tone Analysis
          </h3>
          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-[var(--text-primary)]">Current Tone:</p>
              <p className="text-sm font-semibold text-[var(--primary-color)]">
                Casual
              </p>
            </div>

            <div className="flex rounded-full overflow-hidden border border-[var(--border-color)]">
              <div
                className="tone-meter-segment bg-red-500 inactive"
                style={{ borderTopLeftRadius: "9999px", borderBottomLeftRadius: "9999px" }}
              ></div>
              <div className="tone-meter-segment bg-orange-500 inactive"></div>
              <div className="tone-meter-segment bg-yellow-500 active"></div>
              <div className="tone-meter-segment bg-green-500 inactive"></div>
              <div
                className="tone-meter-segment bg-blue-500 inactive"
                style={{ borderTopRightRadius: "9999px", borderBottomRightRadius: "9999px" }}
              ></div>
            </div>

            <div className="flex justify-between text-xs text-[var(--text-secondary)] mt-1 px-1">
              <span>Formal</span>
              <span>Assertive</span>
              <span>Casual</span>
              <span>Friendly</span>
              <span>Informal</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-color)]">
          <h3 className="text-[var(--text-primary)] text-md font-semibold mb-2">
            Adjust Tone
          </h3>
          <div className="space-y-3">
            <div>
              <label
                htmlFor="tone-select"
                className="block text-sm font-medium text-[var(--text-primary)] mb-1"
              >
                Select Desired Tone:
              </label>
              <select
                id="tone-select"
                defaultValue="casual"
                className="form-select w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] border border-[var(--border-color)] bg-[var(--white)] h-11 px-3 text-sm placeholder:text-[var(--text-secondary)]"
              >
                <option value="formal">Formal</option>
                <option value="casual">Casual</option>
                <option value="assertive">Assertive</option>
                <option value="friendly">Friendly</option>
                <option value="informal">Informal</option>
                <option value="confident">Confident</option>
                <option value="empathetic">Empathetic</option>
              </select>
            </div>
            <button className="w-full flex items-center justify-center gap-2 rounded-lg h-10 bg-[var(--primary-color)] text-[var(--white)] text-sm font-semibold shadow-sm hover:bg-opacity-90 transition-colors duration-200">
              <span className="material-icons text-lg">tune</span>
              <span>Apply Tone</span>
            </button>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-color)]">
          <h3 className="text-[var(--text-primary)] text-md font-semibold mb-2">
            Tone Shift Suggestions
          </h3>
          <div className="space-y-3">
            <div className="suggestion-item p-3 rounded-lg border border-[var(--border-color)] hover:shadow-md transition-shadow duration-200">
              <p className="text-[var(--text-primary)] text-sm font-medium">
                Shift to Formal: "Hey guys" → "Dear Team"
              </p>
              <p className="text-[var(--text-secondary)] text-xs mt-1">
                Consider a more professional greeting for formal communication.
              </p>
              <div className="mt-2 flex gap-2">
                <button className="text-xs font-semibold text-[var(--primary-color)] hover:underline">
                  Apply Suggestion
                </button>
                <button className="text-xs font-semibold text-[var(--text-secondary)] hover:underline">
                  Ignore
                </button>
              </div>
            </div>

            <div className="suggestion-item p-3 rounded-lg border border-[var(--border-color)] hover:shadow-md transition-shadow duration-200">
              <p className="text-[var(--text-primary)] text-sm font-medium">
                Shift to Assertive: "Maybe we could try" → "We will implement"
              </p>
              <p className="text-[var(--text-secondary)] text-xs mt-1">
                Use stronger, more direct language for assertive statements.
              </p>
              <div className="mt-2 flex gap-2">
                <button className="text-xs font-semibold text-[var(--primary-color)] hover:underline">
                  Apply Suggestion
                </button>
                <button className="text-xs font-semibold text-[var(--text-secondary)] hover:underline">
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-[var(--border-color)] bg-slate-50">
        <button className="w-full flex items-center justify-center gap-2 rounded-lg h-10 bg-[var(--success-color)] text-[var(--white)] text-sm font-semibold shadow-sm hover:bg-opacity-90 transition-colors duration-200">
          <span className="material-icons text-lg">done_all</span>
          <span>Apply All Suggestions</span>
        </button>
      </div>
    </aside>
  );
}

export default ToneSidebar;
