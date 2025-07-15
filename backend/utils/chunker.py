from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain.schema.document import Document  
from utils.loader import load_pdfs

def chunk(documents: list[Document]):
    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200,
        length_function=len,
        is_separator_regex=False
    )
    
    chunks = text_splitter.split_documents(documents)
    
    # 👇 Ensure all chunks have source and page
    for i, chunk in enumerate(chunks):
        if "source" not in chunk.metadata:
            chunk.metadata["source"] = "unknown.pdf"
        if "page" not in chunk.metadata:
            chunk.metadata["page"] = 0
    return chunks
