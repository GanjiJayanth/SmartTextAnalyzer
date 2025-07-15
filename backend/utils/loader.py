from langchain_community.document_loaders.pdf import PyPDFDirectoryLoader
DATA_PATH = "./uploads"

def load_pdfs():
    loader = PyPDFDirectoryLoader(DATA_PATH)
    return loader.load()

if __name__ == "__main__":
    docs = load_pdfs()
    print(f"✅ Loaded {len(docs)} documents")
    for doc in docs[:3]:
        print(doc.metadata)

