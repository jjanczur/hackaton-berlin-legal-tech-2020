import unittest
import csv
import sys
import re

import matplotlib
import pandas_profiling
import nltk
import numpy as np
import pandas as pd
import re
import matplotlib.pyplot as plt
import seaborn as sb
from nltk.corpus import stopwords
import warnings

from plotly import express

warnings.filterwarnings("ignore")
import unidecode
from wordcloud import WordCloud
from nltk.stem import WordNetLemmatizer
nltk.download('wordnet')
from nltk.stem import PorterStemmer
nltk.download('punkt')
nltk.download('stopwords')
from nltk.tokenize import word_tokenize
import matplotlib.animation as animation
import operator
import plotly.express as px
from collections import Counter

import numpy as np



csv.field_size_limit(sys.maxsize)


class MyTestCase(unittest.TestCase):

    def test_tweet_import_and_cleaning(self):
        df = pd.read_csv('train_E6oV3lV.csv')
        #df = pd.read_csv('labeled.csv')

        print(df.head())

        pandas_profiling.ProfileReport(df)

        print(df.head())

        print(df.shape)

        df.drop_duplicates(inplace = True)

        df['clean_tweet'] = df['tweet'].apply(
            lambda x: ' '.join([tweet for tweet in x.split() if not tweet.startswith("@")]))

        print(df.head())

        # Removing the word 'hmm' and it's variants
        df['clean_tweet'] = df['clean_tweet'].apply(
            lambda x: ' '.join([word for word in x.split() if not word == 'h(m)+']))

        # Code for removing slang words
        d = {'luv': 'love', 'wud': 'would', 'lyk': 'like', 'wateva': 'whatever', 'ttyl': 'talk to you later',
             'kul': 'cool', 'fyn': 'fine', 'omg': 'oh my god!', 'fam': 'family', 'bruh': 'brother',
             'cud': 'could', 'fud': 'food'}  ## Need a huge dictionary
        words = "I luv myself"
        words = words.split()
        reformed = [d[word] if word in d else word for word in words]
        reformed = " ".join(reformed)

        df['clean_tweet'] = df['clean_tweet'].apply(
            lambda x: ' '.join(d[word] if word in d else word for word in x.split()))

        # Finding words with # attached to it
        df['#'] = df['clean_tweet'].apply(lambda x: ' '.join([word for word in x.split() if word.startswith('#')]))

        frame = df['#']

        frame = pd.DataFrame(frame)

        frame = frame.rename({'#': 'Count(#)'}, axis='columns')

        frame[frame['Count(#)'] == ''] = 'No hashtags'

        data_frame = pd.concat([df, frame], axis=1)

        data_frame.drop('#', axis=1, inplace=True)

        # Column showing whether the corresponding tweet has a hash tagged word or not
        data_frame = data_frame.rename({'Count(#)': 'Hash words'}, axis='columns')

        # Removing stopwords
        data_frame['clean_tweet'] = data_frame['clean_tweet'].apply(
            lambda x: ' '.join([word for word in x.split() if not word in set(stopwords.words('english'))]))

        # Lemmitization
        lemmatizer = WordNetLemmatizer()
        data_frame['clean_tweet'] = data_frame['clean_tweet'].apply(
            lambda x: ' '.join([lemmatizer.lemmatize(word) for word in x.split()]))

        # Stemming
        ps = PorterStemmer()
        adwait = data_frame
        # adwait.head()
        data_frame['clean_tweet'] = data_frame['clean_tweet'].apply(
            lambda x: ' '.join([ps.stem(word) for word in x.split()]))

        # Tokenization
        corpus = []
        for i in range(0, 31962):
            tweet = data_frame['clean_tweet'][i]
            tweet = tweet.lower()
            tweet = tweet.split()
            tweet = [ps.stem(word) for word in tweet if not word in set(stopwords.words('english'))]
            tweet = ' '.join(tweet)
            corpus.append(tweet)

        print(len(corpus))

        normal_words = ' '.join([word for word in data_frame['clean_tweet'][data_frame['label'] == 0]])
        wordcloud = WordCloud(width=800, height=500, max_font_size=110, max_words=100).generate(normal_words)
        print('Normal words')
        plt.figure(figsize=(12, 8))
        plt.imshow(wordcloud, interpolation='bilinear', cmap='viridis')
        plt.axis('off')

        normal_words = ' '.join([word for word in data_frame['clean_tweet'][data_frame['label'] == 0]])
        wordcloud = WordCloud(width=800, height=500, max_font_size=110, max_words=100).generate(normal_words)
        print('Normal words')
        plt.figure(figsize=(12, 8))
        plt.imshow(wordcloud, interpolation='bilinear', cmap='viridis')
        plt.axis('off')

        normal_words = ' '.join([word for word in data_frame['clean_tweet'][data_frame['label'] == 1]])
        wordcloud = WordCloud(width=800, height=500, max_font_size=110, max_words=100).generate(normal_words)
        print('Normal words')
        plt.figure(figsize=(12, 8))
        plt.imshow(wordcloud, interpolation='bilinear')
        plt.axis('off')

        # Collecting positive hashtags

        hash_positive = []
        hash_negative = []

        def hashtag_extract(x):
            hashtags = []
            # Loop over the words in the tweet
            for i in x:
                ht = re.findall(r"#(\w+)", i)
                hashtags.append(ht)

            return hashtags

        hash_positive = hashtag_extract(data_frame['clean_tweet'][data_frame['label'] == 0])

        # extracting hashtags from racist/sexist tweets
        hash_negative = hashtag_extract(data_frame['clean_tweet'][data_frame['label'] == 1])

        # Converting a multidimensional list to a 1-D list
        hash_positive = sum(hash_positive, [])
        hash_negative = sum(hash_negative, [])

        q = Counter(hash_positive)
        q = dict(q.most_common())

        from sklearn.feature_extraction.text import TfidfVectorizer
        tfidf_vectorizer = TfidfVectorizer(max_df=0.90, min_df=2, stop_words='english')
        # TF-IDF feature matrix
        X1 = tfidf_vectorizer.fit_transform(corpus).toarray()
        Y1 = df.loc[:, 'label'].values

        print(X1, Y1)

    def test_final(self):
        df = pd.read_csv("train_E6oV3lV.csv")

        dff = df.drop(['label'], axis=1)

        from sklearn.model_selection import train_test_split
        X_temp, X_test, y_temp, y_test = train_test_split(dff, list(df.label), test_size=0.1)

        X_temp['label'] = y_temp

        nonhate = X_temp[X_temp['label'] == 0]

        hate = X_temp[X_temp.label == 1]

        nonhatesample = nonhate.sample(n=hate.shape[0])

        ds = pd.concat([hate, nonhatesample], axis=0)

        ds.to_csv("train_E6oV3lV.csv")
        ds = pd.read_csv("train_E6oV3lV.csv")
        ds_temp = ds
        testdf = X_test
        testdf['label'] = y_test
        ds = pd.concat([ds_temp, testdf], axis=0)

        list(testdf.index)

        corpus = []
        for i in range(ds.shape[0]):
            corpus.append(ds.iloc[i][0])

        from sklearn.feature_extraction.text import TfidfVectorizer
        vectorizer = TfidfVectorizer()
        X = vectorizer.fit_transform(corpus)
        feature_names = vectorizer.get_feature_names()
        dense = X.todense()
        denselist = dense.tolist()
        df2 = pd.DataFrame(denselist, columns=feature_names)
        df2



if __name__ == '__main__':
    unittest.main()
