#Necesssay Library
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.feature_extraction.text import TfidfTransformer, TfidfVectorizer
from sklearn.svm import SVC, NuSVC, LinearSVC
from sklearn.model_selection import GridSearchCV

from sklearn.externals import joblib
import cleaner
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')

#Loading Training Data
train = pd.read_csv('datasets/train.csv')
test = pd.read_csv('datasets/test.csv')
sample_sub = pd.read_csv('datasets/sample_submission.csv')

#Concation train and test data
total_data = train.append(test, ignore_index = True)



total_data['cleaned_tweets'] = total_data['tweet'].apply(lambda x: cleaner.clean_text(x))

train_data = total_data[total_data['label'].isnull() != True]
test_data = total_data[total_data['label'].isnull() == True]

# Linear_svm Model
params = {'tfidf__max_df': [0.9, 0.95],'tfidf__ngram_range': [(1,1), (1,2)], "svc__C": [0.001,.01, .1, 1, 10, 100]}

pipeline = Pipeline([
    ("tfidf", TfidfVectorizer(sublinear_tf=True, stop_words='english')),
    ("svc", LinearSVC(penalty='l2',dual=False,random_state=0, max_iter=1000,tol=0.01)),
])

gs = GridSearchCV(pipeline, params, cv=10, verbose=2, n_jobs=-1)
gs.fit(train_data['cleaned_tweets'], train_data['label'])
print(gs.best_estimator_)
print(gs.best_score_)

# load model
gs = joblib.load('filename.pkl')

predicted = gs.predict(test_data['cleaned_tweets'])
print(predicted)

sub_df = pd.DataFrame(columns=['id', 'label'])
sub_df['id'] = test['id']
sub_df['label'] = predicted
sub_df.to_csv('test_prediction_svm.csv', index=False)