// Load TensorFlow.js
const tf = require('@tensorflow/tfjs');

// Function to extract features from URL
function extractFeatures(url)
{
   const features = {};

    // URL Length
    features['URLLength'] = url.length;

    // URL Depth
    features['URLDepth'] = (url.split('/').length - 1);

    // Https
    features['Https'] = url.startsWith('https://') ? 1 : 0;

    // Prefix/Suffix
    features['PrefixSuffix'] = url.includes('-') ? 1 : 0;

    // Presence of file extensions
    const fileExtensions = ['.php', '.html', '.info', '.js'];
    fileExtensions.forEach(ext => {
        features['Has' + ext.replace('.', '')] = url.includes(ext) ? 1 : 0;
    });

    // Num of periods
    features['NumPeriods'] = (url.match(/\./g) || []).length;

    // Num encoded char
    features['NumEncodedChar'] = (url.match(/%[0-9A-Fa-f]{2}/g) || []).length;

    // Num of parameters
    features['NumParameters'] = (url.match(/[\?&][^&=]+=[^&=]+/g) || []).length;

    // Num of digits
    features['NumDigits'] = (url.match(/\d/g) || []).length;

    // Num of spec char
    features['NumSpecChar'] = (url.match(/[^\w\s]/g) || []).length;

    // Tempting words
    const temptingWords = ['money', 'free', 'paypal', 'banking', 'password', 'verify', 'account'];
    features['TemptingWords'] = temptingWords.reduce((count, word) => count + (url.toLowerCase().includes(word) ? 1 : 0), 0);

    // Image
    features['Image'] = url.includes('image') ? 1 : 0;

    // Login or upload
    features['LoginOrUpload'] = url.includes('login') || url.includes('upload') ? 1 : 0;

    // Spelling check for each word in the domain - Placeholder as JavaScript doesn't have a direct equivalent of Python's SpellChecker
    // You may need to integrate an external service/API for spell checking
    features['SpellingErrorInDomain'] = 0; // Placeholder value

    // Raw word count
    features['RawWordCount'] = (url.match(/\w+/g) || []).length;

    // Hostname Length
    const parsedUrl = new URL(url);
    features['HostnameLength'] = parsedUrl.hostname.length;

    // Path Length
    features['PathLength'] = parsedUrl.pathname.length;

    return features;
}

// Convert feature vector object to array of values
function convertToValueArray(featureVector) 
{
    return Object.values(featureVector);
}

// Load the TensorFlow.js model
async function loadModel() 
{
    const modelUrl = chrome.runtime.getURL('tfjs_model/model.json');
');
    try {
        const model = await tf.loadLayersModel(modelUrl);
        return model;
    } catch (error) {
        console.error('Error loading the TensorFlow model:', error);
    }
}

// Predict URL safety
async function predictUrlSafety(url, model) 
{
    const featureVectorObject = extractFeatures(url);
    const featureVectorArray = convertToValueArray(featureVectorObject);
    const inputTensor = tf.tensor([featureVectorArray]);
    const prediction = await model.predict(inputTensor).data();
    return prediction;
}

// Display warning page
function displayWarningPage() 
{
    chrome.tabs.update({url: "alert.html"});
}

// Main listener for tab URL updates
chrome.tabs.onUpdated.addListener(async function(tabId, changeInfo, tab) {
    if (changeInfo.url) {
        const url = changeInfo.url;
        const model = await loadModel();
        const prediction = await predictUrlSafety(url, model);

        if (predictionShouldTriggerWarning(prediction)) {
            displayWarningPage();
        }
    }
});

// Function to determine if the prediction should trigger a warning
function predictionShouldTriggerWarning(prediction) 
{
    // Determine the index of the maximum value in the prediction array
    const maxIndex = prediction.indexOf(Math.max(...prediction));

    // Unsafe categories indices
    const unsafeCategories = [0, 1, 2, 3]; // Indices for spam, phishing, malware, defacement

    // Check if the maximum prediction index corresponds to an unsafe category
    return unsafeCategories.includes(maxIndex);
}



