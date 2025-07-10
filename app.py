from flask import Flask, request, jsonify
import pickle
import numpy as np
from flask_cors import CORS

popular_df = pickle.load(open('Book-recommender-system/popular.pkl', 'rb'))
pt = pickle.load(open('Book-recommender-system/pt.pkl', 'rb'))
books = pickle.load(open('Book-recommender-system/books.pkl', 'rb'))
similarity_scores = pickle.load(open('Book-recommender-system/similarity_scores.pkl', 'rb'))

app = Flask(__name__)
CORS(app)  # Enable CORS so React can connect

@app.route('/api/popular', methods=['GET'])
def get_popular():
    data = []
    for i in range(len(popular_df)):
        book = {
            'book_name': popular_df.iloc[i]['Book-Title'],
            'author': popular_df.iloc[i]['Book-Author'],
            'image': popular_df.iloc[i]['Image-URL-M'],
            'votes': int(popular_df.iloc[i]['num_ratings']),
            'rating': float(popular_df.iloc[i]['avg_rating']),
        }
        data.append(book)
    return jsonify(data)

@app.route('/api/recommend', methods=['POST'])
def recommend_books():
    try:
        user_input = request.json.get('user_input')
        index = np.where(pt.index == user_input)[0][0]
        similar_items = sorted(list(enumerate(similarity_scores[index])), key=lambda x: x[1], reverse=True)[1:6]

        data = []
        for i in similar_items:
            temp_df = books[books['Book-Title'] == pt.index[i[0]]].drop_duplicates('Book-Title')
            book = {
                'book_name': temp_df['Book-Title'].values[0],
                'author': temp_df['Book-Author'].values[0],
                'image': temp_df['Image-URL-M'].values[0]
            }
            data.append(book)

        return jsonify(data)
    
    except IndexError:
        return jsonify({'error': 'Book not found. Please enter a valid title.'}), 404

if __name__ == '__main__':
    app.run(debug=True)
