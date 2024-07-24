from fastapi import FastAPI
from gramformer import Gramformer
import torch
from pydantic import BaseModel
from transformers import pipeline
import spacy
from spacy import displacy
from collections import Counter
import en_core_web_sm
nlp = en_core_web_sm.load()

class GrammarCorrection(BaseModel):
   input: str

def set_seed(seed):
  torch.manual_seed(seed)
  if torch.cuda.is_available():
    torch.cuda.manual_seed_all(seed)

set_seed(1212)
gf = Gramformer(models = 1, use_gpu=False)

# EleutherAI/gpt-neo-2.7B
# EleutherAI/gpt-neo-1.3B
# EleutherAI/gpt-neo-125M
gen = pipeline('text-generation', model ='EleutherAI/gpt-neo-125M')


app = FastAPI()

@app.get("/", tags=["ROOT"])
async def root() -> dict:
    return {
        "Ping": "Pong"
    }

@app.post("/pos", tags=["NLP"])
async def pos(req: GrammarCorrection)-> dict:
   pass

@app.post("/ner", tags=["NLP"])
async def ner(req: GrammarCorrection) -> dict:
   doc = nlp(req.input)
   return {
      "entities": [(X.text, X.label_) for X in doc.ents]
   }

@app.post("/grammar", tags=["NLP"])
async def grammar(req: GrammarCorrection) -> dict:
    correction = gf.correct(req.input, max_candidates=1)
    edits = []
    highlights = []
    for c in correction:
       edits = gf.get_edits(req.input, c)
       highlights = gf.highlight(req.input, c)

    return {
          "result": correction,
          "highlights": highlights,
          "edits": edits
   }

@app.post("/suggest", tags=["AI"])
async def suggest(req: GrammarCorrection) -> dict:
    # todo: limit input to avoid 500 error
    output = gen(req.input, max_length=200, do_sample=True, temperature=0.9, truncation=True, return_full_text=False, prefix="You are a expert in storytelling your job is to suggest a better storyline to the following text: ")

    # todo: maybe truncate result based on punctuation 
    return output[0]
   


@app.post("/embed", tags=["Vectors"])
async def suggest(req: GrammarCorrection) -> dict:
   pass

