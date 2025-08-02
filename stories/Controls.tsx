import React from "react";

interface Controls {
  animation: string;
  sep: string;
  windowSize: number;
  delayMultiplier: number;
  animationDuration: number;
  animationTimingFunction: string;
  simulateNetworkIssue: boolean;
  generationSpeed: number;
}

const Controls = ({
  controls,
  setControls,
}: {
  controls: Controls;
  setControls: React.Dispatch<React.SetStateAction<Controls>>;
}) => {
  const {
    animation,
    sep,
    windowSize,
    delayMultiplier,
    animationDuration,
    animationTimingFunction,
  } = controls;

  const handleAnimationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setControls({ ...controls, animation: e.target.value });
  };

  const handleSepChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setControls({ ...controls, sep: e.target.value });
  };

  const handleWindowSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setControls({ ...controls, windowSize: parseInt(e.target.value) });
  };

  const handleDelayMultiplierChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setControls({ ...controls, delayMultiplier: parseFloat(e.target.value) });
  };

  const handleAnimationDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setControls({ ...controls, animationDuration: parseFloat(e.target.value) });
  };

  const handleAnimationTimingFunctionChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setControls({ ...controls, animationTimingFunction: e.target.value });
  };

  const handleGenerationSpeedChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setControls({ ...controls, generationSpeed: parseInt(e.target.value) });
  };

  const handleSimulateNetworkIssueChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setControls({ ...controls, simulateNetworkIssue: e.target.checked });
  };

  return (
    <div className="space-y-4 p-6 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 shadow-xs">
      <div className="grid grid-cols-1 gap-4">
        {/* Animation Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Animation
          </label>
          <div className="relative">
            <select
              value={animation}
              onChange={handleAnimationChange}
              className="w-full px-3 py-2 pr-8 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 dark:text-zinc-100 appearance-none"
            >
              <option value="none">None</option>
              <option value="fadeIn">Fade In</option>
              <option value="blurIn">Blur In</option>
              <option value="fadeAndScale">Fade and Scale</option>
              <option value="colorTransition">Color Transition</option>
              <option value="highlight">Highlight</option>
              <option value="blurAndSharpen">Blur and Sharpen</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Separator Select */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Separator
          </label>
          <div className="relative">
            <select
              value={sep}
              onChange={handleSepChange}
              className="w-full px-3 py-2 pr-8 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 dark:text-zinc-100 appearance-none"
            >
              <option value="diff">Diff</option>
              <option value="word">Word</option>
              <option value="char">Character</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Grid for number inputs */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Window Size
            </label>
            <input
              type="number"
              value={windowSize}
              onChange={handleWindowSizeChange}
              className="w-full px-3 py-2 pr-8 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 dark:text-zinc-100 appearance-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
              Delay Multiplier
            </label>
            <input
              type="number"
              step="0.1"
              value={delayMultiplier}
              onChange={handleDelayMultiplierChange}
              className="w-full px-3 py-2 pr-8 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 dark:text-zinc-100 appearance-none"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Animation Duration (seconds)
          </label>
          <input
            type="number"
            step="0.1"
            value={animationDuration}
            onChange={handleAnimationDurationChange}
            className="w-full px-3 py-2 pr-8 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 dark:text-zinc-100 appearance-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
            Animation Timing Function
          </label>
          <div className="relative">
            <select
              value={animationTimingFunction}
              onChange={handleAnimationTimingFunctionChange}
              className="w-full px-3 py-2 pr-8 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 dark:text-zinc-100 appearance-none"
            >
              <option value="ease-in-out">Ease In Out</option>
              <option value="ease-in">Ease In</option>
              <option value="ease-out">Ease Out</option>
              <option value="linear">Linear</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg
                className="w-4 h-4 text-zinc-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Streaming Controls Section */}
        <div className="pt-4 border-t border-zinc-200 dark:border-zinc-700">
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 mb-3">
            Streaming Settings
          </h3>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                Generation Speed (tokens/sec)
              </label>
              <input
                type="number"
                min="1"
                max="200"
                value={controls.generationSpeed}
                onChange={handleGenerationSpeedChange}
                className="w-full px-3 py-2 pr-8 text-sm bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-xs focus:outline-hidden focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 dark:text-zinc-100 appearance-none"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="networkIssue"
                checked={controls.simulateNetworkIssue}
                onChange={handleSimulateNetworkIssueChange}
                className="w-4 h-4 text-zinc-600 bg-white dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 rounded-sm focus:ring-zinc-500 focus:ring-2"
              />
              <label
                htmlFor="networkIssue"
                className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
              >
                Simulate Network Issues
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Controls;
