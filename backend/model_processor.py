import pdfplumber
import re
import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from sentence_transformers import SentenceTransformer, util

# Load NLTK resources
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('averaged_perceptron_tagger', quiet=True)

# Initialize model and stopwords
model = SentenceTransformer('all-MiniLM-L6-v2')
stop_words = set(stopwords.words('english'))


def preprocess_text(text):
    """Clean and preprocess text."""
    text = text.lower()
    text = re.sub(r'[^\w\s]', ' ', text)
    tokens = word_tokenize(text)
    filtered_tokens = [w for w in tokens if w not in stop_words]
    return " ".join(filtered_tokens)



def extract_text_from_pdf(pdf_path):
    text = ""
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page in pdf.pages:
                page_text = page.extract_text()
                if page_text:
                    text += page_text + "\n"
    except Exception as e:
        print(f"Error reading PDF: {e}")
    return text

def calculate_similarity(text1, text2):
    """Calculate cosine similarity between two texts."""
    embedding1 = model.encode(text1, convert_to_tensor=True)
    embedding2 = model.encode(text2, convert_to_tensor=True)
    similarity = util.cos_sim(embedding1, embedding2).item()
    return similarity

def process_document(pdf_path, job_description):
    document_text = extract_text_from_pdf(pdf_path)
    clean_text = preprocess_text(document_text)
    processed_job_description = preprocess_text(job_description)
    similarity_score = calculate_similarity(clean_text, processed_job_description)
    print(f"Similarity Score: {similarity_score}")  # Debugging
    return similarity_score * 100

process_text = preprocess_text