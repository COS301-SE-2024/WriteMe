from fastapi import FastAPI
from gramformer import Gramformer
import torch
from pydantic import BaseModel
from transformers import pipeline
import spacy
from spacy import displacy
from collections import Counter
# import en_core_web_sm
# nlp = en_core_web_sm.load()
import language_tool_python
# import nltk
# nltk.download()
# from nltk.corpus import stopwords
# from nltk.tokenize import word_tokenize, sent_tokenize
# stop_words = set(stopwords.words('english'))

from flair.data import Sentence
from flair.nn import Classifier
from flair.models import SequenceTagger, TextClassifier
from flair.embeddings import TransformerWordEmbeddings
from flair.splitter import SegtokSentenceSplitter


class GrammarCorrection(BaseModel):
   input: str

def set_seed(seed):
  torch.manual_seed(seed)
  if torch.cuda.is_available():
    torch.cuda.manual_seed_all(seed)

set_seed(1212)
# gf = Gramformer(models = 1, use_gpu=False)

# EleutherAI/gpt-neo-2.7B
# EleutherAI/gpt-neo-1.3B
# EleutherAI/gpt-neo-125M
gen = pipeline('text-generation', model ='EleutherAI/gpt-neo-125M')

# lang_tool = language_tool_python.LanguageTool('en-US')
lang_tool = language_tool_python.LanguageToolPublicAPI('en-US')

# sentiment_tagger = Classifier.load('sentiment')
sentiment_tagger = TextClassifier.load('./ml_backend/models/sentiment-en-mix-distillbert_4.pt')
ner_tagger = Classifier.load('ner')
# ner_tagger = SequenceTagger.load("flair/ner-english-ontonotes")
pos_tagger = Classifier.load('pos')
# pos_tagger = SequenceTagger.load("flair/pos-english-fast")
embedding = TransformerWordEmbeddings('bert-base-uncased')
splitter = SegtokSentenceSplitter()



app = FastAPI()

@app.get("/", tags=["ROOT"])
async def root() -> dict:
    return {
        "Ping": "Pong"
    }

@app.post("/analysis", tags=["NLP"])
async def sentiment(req: GrammarCorrection)-> dict:
   sentences = splitter.split(req.input)
   sentiment_tagger.predict(sentences)
   ner_tagger.predict(sentences)
   pos_tagger.predict(sentences)
   res = [ l.to_dict() for l in sentences]
   return {
      "analysis": res
   }

@app.post("/sentiment", tags=["NLP"])
async def sentiment(req: GrammarCorrection)-> dict:
   sentences = splitter.split(req.input)
   sentiment_tagger.predict(sentences)
   res = [ l.to_dict() for l in sentences]
   return {
      "sentiment": res
   }

@app.post("/pos", tags=["NLP"])
async def pos(req: GrammarCorrection)-> dict:
   # tokenized = sent_tokenize(req.input)
   # for i in tokenized:  
   #    # Word tokenizers is used to find the words 
   #    # and punctuation in a string
   #    wordsList = nltk.word_tokenize(i)
 
   #    # removing stop words from wordList
   #    wordsList = [w for w in wordsList if not w in stop_words] 
 
   #    #  Using a Tagger. Which is part-of-speech 
   #    # tagger or POS-tagger. 
   #    tagged = nltk.pos_tag(wordsList)
   sentences = splitter.split(req.input)
   print(sentences)
   pos_tagger.predict(sentences)
   tagged = [ l.to_dict() for l in sentences]
   print(tagged)
   return {
      "pos": tagged
   }

@app.post("/ner", tags=["NLP"])
async def ner(req: GrammarCorrection) -> dict:
   # doc = nlp(req.input)
   # return {
   #    "entities": [(X.text, X.label_) for X in doc.ents]
   # }
   sentences = splitter.split(req.input)
   ner_tagger.predict(sentences)
   res = [ l.to_dict() for l in sentences]
   return {
      "entities": res
   }



# @app.post("/grammar", tags=["NLP"])
# async def grammar(req: GrammarCorrection) -> dict:
#     correction = gf.correct(req.input, max_candidates=1)
#     edits = []
#     highlights = []
#     for c in correction:
#        edits = gf.get_edits(req.input, c)
#        highlights = gf.highlight(req.input, c)

#     return {
#           "result": correction,
#           "highlights": highlights,
#           "edits": edits
# }

@app.post("/grammar", tags=["NLP"])
async def grammar(req: GrammarCorrection) -> dict:
    matches = lang_tool.check(req.input)
    correction = language_tool_python.utils.correct(req.input, matches)
    safe_matches = [{
       "rule": m.message,
       "replacements": m.replacements,
       "context": m.context,
       "offset": m.offset,
       "errorLength": m.errorLength
    } for m in matches]
    print(safe_matches, correction)

    return {
          "result": correction,
         #  "highlights": highlights,
          "edits": safe_matches
   }



@app.post("/suggest", tags=["AI"])
async def suggest(req: GrammarCorrection) -> dict:
   # todo: limit input to avoid 500 error
   output = gen(req.input, max_length=200, do_sample=True, temperature=0.9, truncation=True, return_full_text=False, prefix="You are a expert in storytelling your job is to suggest a better storyline to the following text: ")
   # todo: maybe truncate result based on punctuation 
   return output[0]

# Supported tones:
#  Formal
#  Humourous
#  Serious
#  Friendly

@app.post("/suggest/{tone}", tags=["AI"])
async def suggest(req: GrammarCorrection, tone: str) -> dict:
   # todo: limit input to avoid 500 error
   if tone == "formal":
      output = gen(req.input, max_length=200, do_sample=True, temperature=0.9, truncation=True, return_full_text=False, prefix="You are a expert in Advanced English, rewrite the following in a formal tone: ")
   elif tone == "humourous":
      output = gen(req.input, max_length=200, do_sample=True, temperature=0.9, truncation=True, return_full_text=False, prefix="You are a expert in Advanced English and Humour, rewrite the following in a humourous tone: ")
   elif tone == "serious":
      output = gen(req.input, max_length=200, do_sample=True, temperature=0.9, truncation=True, return_full_text=False, prefix="You are a expert in Advanced English, rewrite the following in a serious tone: ")
   else:
      output = gen(req.input, max_length=200, do_sample=True, temperature=0.9, truncation=True, return_full_text=False, prefix="You are a expert in Advanced English, rewrite the following in a friendly tone: ")
   # todo: maybe truncate result based on punctuation 
   return output[0]


@app.post("/embed", tags=["Vectors"])
async def suggest(req: GrammarCorrection) -> dict:
   sentences = splitter.split(req.input)
   embeddings = embedding.embed(sentences)
   
   return {
      "embedding": [list(e.embedding.numpy()) for e in embeddings]
   }

