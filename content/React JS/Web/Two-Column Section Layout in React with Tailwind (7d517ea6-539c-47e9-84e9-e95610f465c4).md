# Two-Column Section Layout in React with Tailwind #

Two-Column layouts are very popular in UX designs. It's commonly used in the hero section, about, and other parts of a website.

This guide provides a screen-size two-column layout in React JS using Tailwind CSS. You can copy the code for your own projects and customize it for your own needs. Before starting, make sure you have the prerequisites.

## Prerequisites ##

* A React JS Project.
* Tailwind CSS installed in the project.

## Steps ##

### 1. Copy the code ###

Let's assume you have a `components` directory at the root folder of your project. Inside the `components` folder, create a file and name it `TwoColumnSection.jsx`. Copy the React JS code below and paste it into the newly created file, then save. You've just created a new React JS component.

```javascript
import React from "react";

const TwoColumnSection = () => {
  return (
    <section className="h-screen flex flex-col md:flex-row box-border">
      {/* LEFT COLUMN */}
      <div className="flex-col flex-1 flex items-start justify-center md:p-16 p-4 box-border md:gap-8 gap-2">

            {/* Sample content for the left column. Tailor to your needs. */}
            <div className="flex-col flex items-start box-border md:gap-4 gap-0">
                <h1 className="md:text-6xl text-4xl  font-bold mb-4 text-left">Heading Here</h1>
                <p className="text-xl text-left ">The worst feature of Windows Sticky Keys is its tendency to be accidentally enabled, causing frustrating typing disruptions.</p>
            </div>
            <div className="mt-8">
                <button className="bg-blue-500 text-white font-semibold px-8 py-4 rounded-2xl shadow-md hover:bg-blue-400 transition duration-300 text-lg">
                    Click Me
                </button>
            </div>
      </div>

      {/* RIGHT COLUMN */}
      <div className="flex-col flex-1 flex items-end justify-center md:p-16 p-4 box-border gap-8">

        {/* Sample content for the right column. Tailor to your needs. */}
        <img src="https://placehold.co/600x400" alt="Placeholder" className="rounded-2xl w-full" />
        <div className="flex flex-col items-end w-full p-4">
            <p className="text-lg md:text-xl text-right">More content on the right column.</p>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnSection;
```

### 2. Import the component to render ###

Import the React component to render it. For a quick demo, paste the code below into your `App.jsx` located in the root directory of your project.

```javascript
import { useState } from 'react'
import TwoColumnSection from "./components/TwoColumnSection";
import './App.css'

function App() {
  return (
    <div>
      <TwoColumnSection />
    </div>
  );
}

export default App;
```

### 3. Save and run ###

Save the files. To run, open your terminal and navigate to your project's root directory. Once there, enter the command `npm run dev` on the terminal.

Your development server should now start. You should be able to see a URL in the terminal similar to `http://localhost:5173/`. Copy the URL and paste it into your browser. You will now see the rendered two-column layout

## Start using for your projects ##

You can copy the code in Step 1 and use it without needing to create a new file. Replace the placeholders with your own content. Make sure to replace the Tailwind classes to match your project's styling.

It already uses media queries with Tailwind so your layout is responsive and mobile friendly.
