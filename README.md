# MindHaven Chatbot

**Domain-Specific Mental Health Assistant Built with T5 & FastAPI + React**

**MindHaven** is a domain-specific mental health chatbot designed to support individuals seeking mental health guidance. It leverages a fine-tuned Transformer model (T5) and delivers responses through a seamless, user-friendly web interface. This project demonstrates the power of NLP in providing supportive, empathetic responses to mental health queries and is fine-tuned on the [Mental Health Counseling Conversations dataset](https://huggingface.co/datasets/Amod/mental_health_counseling_conversations).

---

## Project Overview

- **Domain**: Mental Health & Emotional Well-being
- **Model**: `T5-small` fine-tuned on curated Q&A mental health dataset
- **Frameworks**: TensorFlow, Hugging Face Transformers, FastAPI (backend), React + Tailwind CSS (frontend)
- **Deployment**: Backend hosted on Render | Frontend on Vercel

---

## Details

- Built a chatbot tailored to the mental health domain
- Fine-tuned a transformer model for generative Q&A
- Built an intuitive web UI for real-time interaction
- Evaluated performance using BLEU, F1-score and qualitative feedback

---

## Tech Stack

- **Backend**: FastAPI + TensorFlow (T5 fine-tuned model)
- **Frontend**: React + Tailwind CSS + TypeScript
- **Model**: `t5-small` (fine-tuned)
- **Dataset**: [Mental Health Counseling Conversations](https://huggingface.co/datasets/Amod/mental_health_counseling_conversations.

  ---
  
## Dataset

- **Name**: `mindhaven_dataset.json`
- **Format**: JSON lines file with `Context` and `Response` fields
- **Source**: Hugging face [Mental Health Counseling Conversations](https://huggingface.co/datasets/Amod/mental_health_counseling_conversations.
- **Preprocessing**:
  - Lowercasing and whitespace normalization
  - Removal of nulls and noise
  - Renamed `Context` ➝ `input_text`, `Response` ➝ `target_text`

---

## Model Architecture & Training

| Component         | Configuration                          |
|------------------|----------------------------------------|
| Model            | T5-small                               |
| Optimizer        | AdamW (`create_optimizer`)             |
| Learning Rate    | 0.001                                  |
| Warmup Steps     | 200                                    |
| Batch Size       | 8                                      |
| Epochs           | 40                                     |
| Tokenizer        | T5Tokenizer                            |
| Max Length       | 128 tokens                             |

Model was trained using `TFT5ForConditionalGeneration` with early stopping and regularization techniques like:
- `repetition_penalty = 1.8`
- `no_repeat_ngram_size = 3`
- `num_beams = 5`

---

## Performance Metrics

| Metric           | Score     |
|------------------|-----------|
| BLEU Score       | 0.0000    |
| Token-level F1   | 0.1276    |

**Note**: BLEU scores are often low for generative models in open-ended tasks. The F1-score reflects partial word overlap with reference answers.

---

## Qualitative testing Samples

| Question                                           | Response (Generated) |
|---------------------------------------------------|-----------------------|
| I feel anxious and can't sleep at night. What do I do? | It’s a good idea to talk to a mental health counselor... |
| I'm overwhelmed and can't focus.                  | Consider taking breaks and reaching out for support. |
| I'm feeling lost and empty.                       | You are not alone. A therapist may help clarify your feelings. |

---

## Frontend (React + Tailwind)

- Built a responsive, elegant layout with:
  - Gradient background from dusty pink → deep violet
  - Soft bubble UI with labels: MindHaven (bot) & user
  - Send button with animation
- Dynamic fetch to FastAPI `/predict` endpoint

### Backend API (FastAPI)
```bash
POST /predict
{
  "question": "I'm feeling very low lately"
}


Returns:

```json
{
  "response": "You may benefit from talking to a therapist or support group..."
}
```

---

## Deployment

The frontend is locally connected to the backend (FastAPI).

---

## How to Run Locally

### 1. Clone Repo

```bash
git clone https://github.com/g-tumwesigye/Mindhaven_Chatbot.git
cd Mindhaven_Chatbot
```

### 2. Create Virtual Environment

```bash
python -m venv mindhaven_env
source mindhaven_env/bin/activate
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Run FastAPI

```bash
uvicorn app.main:app --reload
```

---

## File Structure

```
Mindhaven_Chatbot/
├── app/
│   ├── main.py
│   └── model/
│       └── mindhaven_t5_model_tf/
├── requirements.txt
├── README.md
├── mindhaven_chatbot_UI/
│   └── src/
│       └── App.tsx, ChatWindow, hooks, services
```

---

## 🎥 Demo Video

> 🔗 [Click to Watch Demo Video (YouTube)](https://youtu.be/your-demo-link)

---

## 💬 Contributors

* **Name**: \[Geofrey Tumwesigye]
* **Email**: \[g.tumwesigy@alustudent.com]
* **Institution**: \[African Leadership University]
* **Role**: Software Engineering Student

---

## Project Status

- Dataset cleaning
- T5 model fine-tuned
- FastAPI backend
- React UI
- BLEU & F1 metrics
- Report & Video Demo 

---

## Author

Geofrey Tumwesigye

```

---

