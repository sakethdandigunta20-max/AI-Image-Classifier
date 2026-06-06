import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from datasets import load_dataset
import numpy as np

# Set style
sns.set(style="whitegrid")

def perform_eda():
    print("Activity 1.1: Collect the dataset")
    print("Loading dataset 'ccdv/arxiv-classification'...")
    # Load a subset as in the notebook to be consistent and fast
    dataset = load_dataset("ccdv/arxiv-classification", split="train[:20000]")
    df = pd.DataFrame(dataset)
   
    # Feature Engineering for Analysis
    # Since this is text data, we create numerical features like 'text_length'
    df['text_length'] = df['text'].apply(len)
    df['word_count'] = df['text'].apply(lambda x: len(x.split()))
    
    print("\nActivity 2.1: Descriptive Statistics")
    print(df[['text_length', 'word_count']].describe())
    print("\nClass Distribution:")
    print(df['label'].value_counts())
    
    print("\nActivity 2.2: Visual Analysis - Class Distribution")
    plt.figure(figsize=(12, 6))
    sns.countplot(x='label', data=df, order=df['label'].value_counts().index)
    plt.title('Distribution of Academic Categories')
    plt.xlabel('Category ID')
    plt.ylabel('Count')
    plt.savefig('class_distribution.png')
    print("Saved class_distribution.png")
    
    
    print("\nActivity 2.4: Bivariate Analysis - Text Length by Category")
    plt.figure(figsize=(12, 6))
    sns.boxplot(x='label', y='text_length', data=df)
    plt.title('Abstract Length by Category')
    plt.xlabel('Category ID')
    plt.ylabel('Length')
    plt.savefig('length_by_category.png')
    print("Saved length_by_category.png")
    
    print("\nActivity 2.5: Correlation Analysis")
    # Correlation between text length and word count (obvious, but fits the requirement)
    plt.figure(figsize=(8, 6))
    sns.heatmap(df[['text_length', 'word_count']].corr(), annot=True, cmap='coolwarm')
    plt.title('Correlation Heatmap')
    plt.savefig('correlation_heatmap.png')
    print("Saved correlation_heatmap.png")
    
    print("\nActivity 2.6: Pairplot Analysis")
    sns.pairplot(df[['text_length', 'word_count', 'label']], hue='label', palette='viridis')
    plt.savefig('pairplot.png')
    print("Saved pairplot.png")

if __name__ == "__main__":
    perform_eda()
