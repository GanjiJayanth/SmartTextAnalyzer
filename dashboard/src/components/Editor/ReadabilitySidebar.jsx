import { Link } from "react-router-dom";
import "./Editor.css";
function ReadabilitySidebar() {
  return (
    <aside className="readability-sidebar w-[380px] bg-[var(--white)] rounded-xl shadow-lg flex flex-col overflow-hidden shrink-0 @lg:w-[380px] @md:w-[320px]">
      <div className="border-b border-[var(--border-color)] px-1">
        <nav className="flex gap-1">
          <Link
            className="sidebar-tab flex-1 text-center py-3 px-2 text-sm font-medium text-[var(--text-secondary)] border-b-2 border-transparent"
            to="/dashboard/editor"
          >
            Grammar
          </Link>
          <Link
            className="sidebar-tab flex-1 text-center py-3 px-2 text-sm font-medium text-[var(--text-secondary)] border-b-2 border-transparent "
            to="/dashboard/editor/style"
          >
            Style
          </Link>
          <Link
            className="sidebar-tab flex-1 text-center py-3 px-2 text-sm font-medium text-[var(--text-secondary)] border-b-2 border-transparent"
            to="/dashboard/editor/tone"
          >
            Tone
          </Link>
          <Link
            className="sidebar-tab flex-1 text-center py-3 px-2 text-sm font-medium text-[var(--text-secondary)] border-b-2 border-transparent active"
            to="/dashboard/editor/readability"
          >
            Readability
          </Link>
        </nav>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <div className="space-y-3">
          <h3 className="text-[var(--text-primary)] text-md font-semibold mb-3">
            Readability Statistics
          </h3>

          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-[var(--text-primary)]">
                Flesch Reading Ease
              </p>
              <p className="text-sm font-semibold text-[var(--success-color)]">
                75 (Good)
              </p>
            </div>
            <div className="w-full h-2.5 bg-[var(--border-color)] rounded-full overflow-hidden">
              <div
                className="h-full readability-bar-good"
                style={{ width: "75%" }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-[var(--text-primary)]">
                Flesch-Kincaid Grade Level
              </p>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                8th Grade
              </p>
            </div>
            <div className="w-full h-2.5 bg-[var(--border-color)] rounded-full overflow-hidden">
              <div
                className="h-full readability-bar-medium"
                style={{ width: "60%" }}
              ></div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Ideal: 7th-8th Grade
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-[var(--text-primary)]">
                Average Words Per Sentence
              </p>
              <p className="text-sm font-semibold text-[var(--text-primary)]">
                15
              </p>
            </div>
            <div className="w-full h-2.5 bg-[var(--border-color)] rounded-full overflow-hidden">
              <div
                className="h-full readability-bar-good"
                style={{ width: "80%" }}
              ></div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Target: 15-20 words
            </p>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <p className="text-sm text-[var(--text-primary)]">
                Percentage of Complex Words
              </p>
              <p className="text-sm font-semibold text-[var(--warning-color)]">
                18%
              </p>
            </div>
            <div className="w-full h-2.5 bg-[var(--border-color)] rounded-full overflow-hidden">
              <div
                className="h-full readability-bar-medium"
                style={{ width: "18%" }}
              ></div>
            </div>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Target: Below 15%
            </p>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-color)]">
          <h3 className="text-[var(--text-primary)] text-md font-semibold mb-2">
            Style Suggestions
          </h3>
          <div className="space-y-3">
            <div className="suggestion-item p-3 rounded-lg border border-[var(--border-color)] hover:shadow-md transition-shadow duration-200">
              <p className="text-[var(--text-primary)] text-sm font-medium">
                "Utilize" could be "Use"
              </p>
              <p className="text-[var(--text-secondary)] text-xs mt-1">
                Simplicity: We should utilize more simple language.
              </p>
              <div className="mt-2 flex gap-2">
                <button className="text-xs font-semibold text-[var(--primary-color)] hover:underline">
                  Accept
                </button>
                <button className="text-xs font-semibold text-[var(--text-secondary)] hover:underline">
                  Ignore
                </button>
              </div>
            </div>

            <div className="suggestion-item p-3 rounded-lg border border-[var(--border-color)] hover:shadow-md transition-shadow duration-200">
              <p className="text-[var(--text-primary)] text-sm font-medium">
                Consider active voice
              </p>
              <p className="text-[var(--text-secondary)] text-xs mt-1">
                "The report was written by the team." vs "The team wrote the
                report."
              </p>
              <div className="mt-2 flex gap-2">
                <button className="text-xs font-semibold text-[var(--primary-color)] hover:underline">
                  Accept
                </button>
                <button className="text-xs font-semibold text-[var(--text-secondary)] hover:underline">
                  Ignore
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-[var(--border-color)]">
          <h3 className="text-[var(--text-primary)] text-md font-semibold mb-2">
            Adjust Tone
          </h3>
          <select
            className="form-select w-full rounded-lg text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)] border border-[var(--border-color)] bg-[var(--white)] h-11 px-3 text-sm placeholder:text-[var(--text-secondary)]"
            defaultValue="casual"
          >
            <option value="formal">Formal</option>
            <option value="casual">Casual</option>
            <option value="assertive">Assertive</option>
            <option value="friendly">Friendly</option>
          </select>
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

export default ReadabilitySidebar;
