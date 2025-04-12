# **Resume Analysis Tool**

A web-based application that helps job seekers analyze their resumes by comparing them with job descriptions. The tool provides a **match score** and actionable feedback to improve resumes for specific job requirements.

---

## **Features**
- **Upload Resume**: Upload a PDF resume for analysis.
- **Job Description Input**: Paste a job description to compare with the resume.
- **Match Score**: Calculates a similarity score between the resume and job description.
- **Feedback**: Provides actionable feedback based on the match score.
- **Dark Mode**: User-friendly interface with light and dark themes.
- **Real-Time Analysis**: Instant results after uploading the resume and job description.

---

## **Technology Stack**
### **Frontend**
- **HTML**: For structuring the web page.
- **CSS**: For styling the application, including light and dark themes.
- **JavaScript**: For dynamic interactions and API calls.

### **Backend**
- **Flask**: Lightweight Python web framework for handling requests.
- **Flask-CORS**: To handle cross-origin requests.
- **pdfplumber**: For extracting text from PDF resumes.
- **nltk**: For text preprocessing (e.g., tokenization, stopword removal).
- **sentence-transformers**: For generating embeddings and calculating similarity.
- **torch**: Used internally by `sentence-transformers` for deep learning operations.

---

## **Setup Instructions**
### **1. Clone the Repository**
```bash
git clone https://github.com/090rohit/Resume-Analyzer.git
cd Resume-Analyzer
```

### **2. Backend Setup**
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install the required Python libraries:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the Flask server:
   ```bash
   python app.py
   ```
   The backend will run on `http://localhost:5000`.

### **3. Frontend Setup**
1. Navigate to the `frontend` directory:
   ```bash
   cd ../frontend
   ```
2. Open `index.html` in your browser or serve it using a local development server:
   ```bash
   python -m http.server 8000
   ```
3. Access the frontend at `http://localhost:8000`.

---

## **Dependencies**
The following Python libraries are required for the backend:
```plaintext
flask==2.0.1
flask-cors==3.0.10
pdfplumber==0.7.1
nltk==3.8.1
sentence-transformers==2.2.2
torch==1.11.0
```

Install them using:
```bash
pip install -r requirements.txt
```

---

## **How It Works**
1. **Input Handling**:
   - Upload a PDF resume or paste a job description.
2. **Text Preprocessing**:
   - Clean and tokenize the text (e.g., remove punctuation, stopwords).
3. **Embedding Generation**:
   - Convert the resume and job description into vector embeddings using `sentence-transformers`.
4. **Similarity Calculation**:
   - Compute cosine similarity between the embeddings to determine the match score.
5. **Feedback**:
   - Provide actionable feedback based on the match score.

---

## **Project Structure**
```
Resume-Analyzer/
├── backend/
│   ├── app.py                # Flask backend
│   ├── model_processor.py    # Text processing and similarity calculation
│   └── requirements.txt      # Python dependencies
├── frontend/
│   ├── index.html            # Frontend HTML
│   ├── style.css            # Frontend CSS
│   └── script.js            # Frontend JavaScript
└── README.md                # Project documentation
```

---

## **Future Enhancements**
- Add support for multiple job descriptions.
- Deploy the application to a cloud platform (e.g., AWS, Heroku).
- Add multilingual support for resumes in different languages.
- Integrate with LinkedIn for real-time job postings.

---

## **Contributing**
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature-name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

---

## **License**
This project is licensed under the MIT License. See the `LICENSE` file for details.

