import type { Preview } from "@storybook/react";
import { themes } from "@storybook/theming";
import "../stories/tailwind.css";
import "./storybook-dark.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      // Override the default dark theme with comprehensive styling
      dark: {
        ...themes.dark,
        appBg: "#09090b", // zinc-950
        appContentBg: "#18181b", // zinc-900
        appBorderColor: "#27272a", // zinc-800
        appBorderRadius: 4,

        // Text colors
        textColor: "#f4f4f5", // zinc-100
        textInverseColor: "#18181b", // zinc-900

        // Toolbar
        barTextColor: "#f4f4f5", // zinc-100
        barSelectedColor: "#71717a", // zinc-500
        barBg: "#18181b", // zinc-900

        // Form colors
        inputBg: "#27272a", // zinc-800
        inputBorder: "#3f3f46", // zinc-700
        inputTextColor: "#f4f4f5", // zinc-100
        inputBorderRadius: 4,

        // Button colors
        buttonBg: "#27272a", // zinc-800
        buttonBorder: "#3f3f46", // zinc-700
        booleanBg: "#27272a", // zinc-800
        booleanSelectedBg: "#71717a", // zinc-500

        // Panel colors
        panelBg: "#18181b", // zinc-900
        addonPanelBg: "#18181b", // zinc-900

        // Brand
        brandTitle: "Flowtoken Storybook",
        brandUrl: "https://github.com/shumpei-oka/flowtoken",

        // Code colors
        colorPrimary: "#71717a", // zinc-500
        colorSecondary: "#52525b", // zinc-600

        // Grid
        gridCellSize: 12,
      },
      // Override the default light theme
      light: {
        ...themes.normal,
        appBg: "#ffffff",
        appContentBg: "#fafafa", // zinc-50
        appBorderColor: "#e4e4e7", // zinc-200

        // Brand
        brandTitle: "Flowtoken Storybook",
        brandUrl: "https://github.com/shumpei-oka/flowtoken",

        // Colors for light mode
        colorPrimary: "#52525b", // zinc-600
        colorSecondary: "#71717a", // zinc-500
      },
      // Apply dark/light classes to the preview iframe
      stylePreview: true,
      // Set the CSS class names for dark and light modes
      darkClass: "dark",
      lightClass: "light",
      // Apply classes to the HTML element
      classTarget: "html",
      // Set the initial theme (optional)
      current: "light",
    },
  },
};

export default preview;
