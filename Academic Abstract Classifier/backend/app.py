import os

# Set environment variables before importing transformers
os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["HF_HOME"] = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", ".cache", "huggingface")

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from peft import PeftModel, PeftConfig

app = FastAPI(title="Academic Abstract Classifier")

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for model and tokenizer
model = None
tokenizer = None
id2label = {}

class AbstractRequest(BaseModel):
    text: str

class ClassificationResponse(BaseModel):
    label: str
    confidence: float

@app.on_event("startup")
async def load_model():
    global model, tokenizer, id2label
    
    # Define paths
    base_path = os.path.dirname(os.path.abspath(__file__))
    adapter_path = os.path.join(base_path, "..", "final_deberta_model")
    base_model_name = "microsoft/deberta-v3-small"
    
    print(f"Loading tokenizer from {base_model_name}...")
    try:
        # Load tokenizer with default settings to avoid NoneType errors
        tokenizer = AutoTokenizer.from_pretrained(base_model_name)
        print("Tokenizer loaded successfully!")
    except Exception as e:
        print(f"Error loading tokenizer: {e}")
        raise
    
    # Label mapping (verified from dataset)
    id2label = {
        0: 'Commutative Algebra', 
        1: 'Computer Vision and Pattern Recognition', 
        2: 'Artificial Intelligence', 
        3: 'Systems and Control', 
        4: 'Group Theory', 
        5: 'Computational Engineering, Finance, and Science', 
        6: 'Programming Languages', 
        7: 'Information Theory', 
        8: 'Data Structures and Algorithms', 
        9: 'Neural and Evolutionary Computing', 
        10: 'Statistics Theory'
    }
    
    num_labels = len(id2label)
    
    print(f"Loading base model {base_model_name}...")
    base_model = AutoModelForSequenceClassification.from_pretrained(
        base_model_name, 
        num_labels=num_labels,
        ignore_mismatched_sizes=True
    )
    
    print(f"Loading adapter from {adapter_path}...")
    model = PeftModel.from_pretrained(base_model, adapter_path)
    
    device = "cuda" if torch.cuda.is_available() else "cpu"
    print(f"Moving model to {device}...")
    model.to(device)
    model.eval()
    print("Model loaded successfully!")

@app.get("/")
def read_root():
    return {"status": "ok", "message": "Academic Abstract Classifier API is running"}

@app.post("/predict", response_model=ClassificationResponse)
def predict(request: AbstractRequest):
    if not model or not tokenizer:
        raise HTTPException(status_code=503, detail="Model not loaded")
    
    device = model.device
    
    inputs = tokenizer(
        request.text, 
        return_tensors="pt", 
        truncation=True, 
        max_length=512
    ).to(device)
    
    with torch.no_grad():
        outputs = model(**inputs)
        logits = outputs.logits
        probabilities = torch.softmax(logits, dim=1)
        confidence, predicted_class_id = torch.max(probabilities, dim=1)
        
    predicted_label = id2label[predicted_class_id.item()]
    
    return {
        "label": predicted_label,
        "confidence": float(confidence.item())
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
