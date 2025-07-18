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

#summary(""" The rapid advancement of technology in the 21st century has significantly transformed various aspects of human life. Among the most profound changes are those brought about by the rise of the internet, artificial intelligence, and automation. These innovations have reshaped the way we communicate, work, learn, and entertain ourselves. The internet has connected billions of people across the globe, enabling instant access to information, online education, remote work opportunities, and digital marketplaces. Meanwhile, artificial intelligence (AI) is becoming increasingly prevalent in everyday applications—from recommendation systems on streaming platforms and e-commerce sites to virtual assistants and predictive analytics in healthcare.""")