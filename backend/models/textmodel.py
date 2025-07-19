from pydantic import BaseModel, Field
class TextModel(BaseModel):
    user : str = Field(..., description="The user who created the text")
    text : str = Field(..., description="The text content to be checked for grammar issues")


