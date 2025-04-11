// API endpoint
const API_URL = 'http://localhost:5000';

// // Event listener for file input
// document.getElementById('pdf-input').addEventListener('change', function () {
//     const fileName = this.files[0]?.name || 'No file chosen';
//     document.getElementById('file-name').textContent = fileName;
// });

// Show or hide the loader
function showLoader(show) {
    document.getElementById('loader').style.display = show ? 'block' : 'none';
}

// Display the result
function showResult(score) {
    // Round score to nearest integer
    const roundedScore = Math.round(score);

    // Display the score
    document.getElementById('score').textContent = roundedScore;

    // Update the score bar width
    document.getElementById('score-bar').style.width = `${roundedScore}%`;

    // Set the score bar color based on the score
    const scoreBar = document.getElementById('score-bar');
    if (roundedScore < 50) {
        scoreBar.style.backgroundColor = '#e74c3c'; // Red for low scores
    } else if (roundedScore < 75) {
        scoreBar.style.backgroundColor = '#f39c12'; // Orange for medium scores
    } else {
        scoreBar.style.backgroundColor = '#27ae60'; // Green for high scores
    }

    // Set interpretation text
    const interpretation = document.getElementById('interpretation');
    if (roundedScore < 30) {
        interpretation.textContent = 'Low match. The resume may need significant improvements to match the job requirements.';
        interpretation.style.backgroundColor = '#fadbd8';
    } else if (roundedScore < 70) {
        interpretation.textContent = 'Moderate match. The resume shows some relevant skills but could be improved to better match the job requirements.';
        interpretation.style.backgroundColor = '#fef9e7';
    } else {
        interpretation.textContent = 'Strong match! The resume aligns well with the job requirements.';
        interpretation.style.backgroundColor = '#d4efdf';
    }

    // Show the result section
    document.getElementById('result-section').style.display = 'block';
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('input-form');
    const pdfInput = document.getElementById('pdf-input');
    const textInput = document.getElementById('text-input');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from reloading the page

        const pdfFile = pdfInput.files[0];
        const text = textInput.value.trim();
        // console.log("this is file: ",pdfFile);

        if (!pdfFile && !text) {
            alert('Please upload a PDF file or enter text to analyze.');
            return;
        }

        const formData = new FormData();
        if (pdfInput.files.length > 0) {
            // formData.append('file', pdfFile); // Append the file
            formData.append("user-file", pdfInput.files[0], "file.pdf");
            console.log("this is file: ",pdfInput.files[0]);
            console.log("appended to data: ",formData);
        }

        if (text) {
            console.log('text',text);
            formData.append('text', text); // Append the text
        }

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            // console.log('Selected file:', pdfFile); // Debugging
            // console.log('FormData:', formData);    // Debugging

            const response = await fetch('http://localhost:5000/predict', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to process input');
            }

            const data = await response.json();
            showResult(data.score);
        } catch (error) {
            console.error('Error:', error);
            alert('Error processing input: ' + error.message);
        }
    });
});
