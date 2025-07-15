from transformers import pipeline
import os

def summary(text):
    os.environ["HF_TOKEN"] = os.getenv("HF_TOKEN")
    pipe = pipeline(
        "summarization",
        model="Falconsai/text_summarization",
        token=os.environ["HF_TOKEN"]
    )
    summary = pipe(text,do_sample=False)
    return (summary[0]['summary_text'])
