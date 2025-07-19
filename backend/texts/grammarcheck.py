import language_tool_python


tool = language_tool_python.LanguageTool('en-US')
def gram_check(text):
    matches = tool.check(text)
    if not matches:
        return {"message" : "No grammatical mistakes"}
    issues= []
    for match in matches:
        issues.append({
            "error":text[match.offset:match.offset+match.errorlength],
            "suggestions": match.replacements,
            "message": match.message,
        })
    return issues,match.corrected(text)

    
        
    