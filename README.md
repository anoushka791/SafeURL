# SafeURL

This project utilizes TensorFlow.js to predict the safety of URLs based on various features extracted from the URL. It provides a Chrome extension that can warn users when they navigate to potentially unsafe websites.

## Features

- Extracts features from URLs such as length, depth, presence of HTTPS, file extensions, number of periods, encoded characters, parameters, digits, special characters, tempting words, and more.
- Loads a pre-trained TensorFlow.js model to predict the safety of a URL based on its features.
- Displays a warning page when a potentially unsafe URL is detected.

## Usage

To use the Chrome extension:

1. Clone the repository.
2. Install the extension by loading the unpacked extension in Chrome and selecting the `extension` folder.
3. Navigate to websites, and the extension will analyze the URLs and display warnings for potentially unsafe ones.

## Development

- The `extractFeatures` function extracts features from a given URL.
- The `loadModel` function loads the pre-trained TensorFlow.js model.
- The `predictUrlSafety` function predicts the safety of a URL using the loaded model.
- The `displayWarningPage` function displays a warning page for potentially unsafe URLs.
- The `predictionShouldTriggerWarning` function determines if the prediction should trigger a warning based on predefined unsafe categories.

