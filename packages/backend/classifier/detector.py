#Necesssay Library
import pandas as pd
import cleaner
import nltk
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
from sklearn.externals import joblib


# Loading Data
total_data = pd.read_csv('datasets/test2.csv')

# Clean
total_data['cleaned_tweets'] = total_data['tweet'].apply(lambda x: cleaner.clean_text(x))

# Load model
gs = joblib.load('filename.pkl')

predicted = gs.predict(total_data['cleaned_tweets'])
length = len(predicted)
sum_predicted = sum(predicted)
hate_speech_percent = round((sum_predicted*100)/length, 2)
print(hate_speech_percent)

sub_df = pd.DataFrame(columns=['id', 'label', 'tweet'])
sub_df['id'] = total_data['id']
sub_df['label'] = predicted
sub_df['tweet'] = total_data['tweet']
sub_df.to_csv('test_prediction_svm.csv', index=False)