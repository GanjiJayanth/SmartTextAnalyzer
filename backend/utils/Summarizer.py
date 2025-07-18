from transformers import pipeline
import os

def summary(text:str):
    pipe = pipeline(
        "summarization",
        model="Falconsai/text_summarization",
        token=""
    )
    summary = pipe(text,do_sample=False)
    return (summary[0]['summary_text'])