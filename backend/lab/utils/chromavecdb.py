from sentence_transformers import SentenceTransformer
from langchain_community.vectorstores.chroma import Chroma
from langchain.schema import Document

CHROMA_PATH = "./chroma_db"

class LocalEmbeddingFunction:
    def __init__(self):
        self.model = SentenceTransformer("all-MiniLM-L6-v2")

    def embed_documents(self, texts):
        return self.model.encode(texts).tolist()

    def embed_query(self, text):
        return self.model.encode([text])[0].tolist()

def get_embed():
    return LocalEmbeddingFunction()


def add_to_chroma(chunks: list[Document]):
    db = Chroma(
        persist_directory=CHROMA_PATH,
        embedding_function=get_embed()
    )

    last_id = None
    curr_ind = 0
    for chunk in chunks:
        source = chunk.metadata.get("source")
        page = chunk.metadata.get("page")
        curr_page_id = f"{source}:{page}"
        
        if curr_page_id != last_id:
            curr_ind = 0
        else:
            curr_ind += 1
        
        chunk_id = f"{curr_page_id}:{curr_ind}"
        chunk.metadata["id"] = chunk_id
        last_id = curr_page_id

    existing_items = db.get(include=[])
    existing_ids = set(existing_items["ids"])
    print(f"🔍 Number of existing documents in DB: {len(existing_ids)}")

    new_chunks = [chunk for chunk in chunks if chunk.metadata["id"] not in existing_ids]

    if new_chunks:
        new_chunk_ids = [chunk.metadata["id"] for chunk in new_chunks]
        db.add_documents(new_chunks, ids=new_chunk_ids)
        db.persist()
        print(f"✅ Added {len(new_chunks)} new documents.")
    else:
        print("✅ No new documents to add.")
