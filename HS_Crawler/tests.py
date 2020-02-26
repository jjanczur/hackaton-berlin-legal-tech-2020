import unittest
import csv
import sys
import re


csv.field_size_limit(sys.maxsize)


class MyTestCase(unittest.TestCase):

    def test_import(self):

        import_list = []

        with open('labeled.csv', newline='') as csvfile:
            spamreader = csv.reader(csvfile, delimiter=' ', quotechar='|')
            for row in spamreader:

                import_list.append(', '.join(row))

        print(len(import_list))

        p = re.compile(r'.+(\d,\d,\d,\d,).+')

        clean_tweets = []

        for candidate in import_list:


            if p.findall(candidate):
                clean_tweets.append(candidate)

        print(len(clean_tweets))







if __name__ == '__main__':
    unittest.main()
