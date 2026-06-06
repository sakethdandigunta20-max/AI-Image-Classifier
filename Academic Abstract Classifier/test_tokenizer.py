import traceback
from transformers import AutoTokenizer

try:
    print("Attempting to load tokenizer...")
    try:
        tokenizer = AutoTokenizer.from_pretrained("microsoft/deberta-v3-small", use_fast=False)
        print("SUCCESS: Tokenizer loaded with use_fast=False!")
    except:
        print("Failed with use_fast=False, trying default...")
        tokenizer = AutoTokenizer.from_pretrained("microsoft/deberta-v3-small")
        print("SUCCESS: Tokenizer loaded!")
except Exception as e:
    print("ERROR occurred:")
    print(traceback.format_exc())
