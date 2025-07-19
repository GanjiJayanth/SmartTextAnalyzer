# Smart Text Analyzer

## Overview

Smart Text Analyzer is a powerful web-based tool that helps you analyze and improve your writing. It provides a suite of features to check your grammar, rewrite the tone of your text, summarize long articles, and even generate quizzes from your content.

## Key Features

*   **Grammar Checker**: Identifies and corrects grammatical errors in your text.
*   **Tone Rewriter**: Rewrites your text in a different tone (e.g., formal, informal, friendly).
*   **Summarizer**: Generates a concise summary of a long text.
*   **Readability Score**: Calculates the readability of your text using various metrics.
*   **File Upload**: Upload your documents to analyze them directly.

## Tech Stack

*   **Frontend**: React, Vite
*   **Backend**: Flask, Python
*   **Database**: MongoDB

## Installation and Setup

### Backend

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment:
    ```bash
    python -m venv venv
    ```
3.  Activate the virtual environment:
    *   **Windows**: `venv\\Scripts\\activate`
    *   **macOS/Linux**: `source venv/bin/activate`
4.  Install the dependencies:
    ```bash
    pip install -r requirements.txt
    ```
5.  Run the application:
    ```bash
    python run.py
    ```

### Frontend & Dashboard

1.  Navigate to the `frontend` or `dashboard` directory:
    ```bash
    cd frontend
    # or
    cd dashboard
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the application:
    ```bash
    npm run dev
    ```

## Usage

Once the frontend and backend are running, you can access the application in your browser at `http://localhost:5173` (or another port if specified).

## Folder Structure

```
.
├── backend
│   ├── app
│   ├── instance
│   ├── run.py
│   └── requirements.txt
├── dashboard
│   ├── public
│   ├── src
│   ├── package.json
│   └── vite.config.js
└── frontend
    ├── public
    ├── src
    ├── package.json
    └── vite.config.js
```

## Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.
