from transformers import T5Tokenizer, TFT5ForConditionalGeneration
from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allowing CORS for all origins
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Loading the tokenizer and model using the correct relative path
try:
    tokenizer = T5Tokenizer.from_pretrained("app/model/mindhaven_t5_model_tf")
    model = TFT5ForConditionalGeneration.from_pretrained("app/model/mindhaven_t5_model_tf")
except Exception as e:
    raise RuntimeError(f"Failed to load model or tokenizer: {e}")

class Query(BaseModel):
    question: str

@app.get("/")
def root():
    return {"message": "MindHaven Chatbot is running."}

@app.post("/predict")
def generate_response(query: Query):
    prompt = f"Mental health support: {query.question.strip()}"
    inputs = tokenizer(prompt, return_tensors="tf", padding="max_length", truncation=True, max_length=128)

    output_ids = model.generate(
        input_ids=inputs.input_ids,
        attention_mask=inputs.attention_mask,
        max_length=100,
        min_length=30,
        no_repeat_ngram_size=3,
        repetition_penalty=1.8,
        num_beams=5,
        early_stopping=True
    )

    response = tokenizer.decode(output_ids[0], skip_special_tokens=True)
    return {"response": response}

