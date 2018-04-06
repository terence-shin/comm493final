import os
from flask import Flask, jsonify, request
from watson_developer_cloud import NaturalLanguageClassifierV1

natural_language_classifier = NaturalLanguageClassifierV1(
    username='36a6d82c-5b9f-4c1f-a48b-fd1494886b1e',
    password='fzZJBcI0q2Ik'
    )

classifier_id= '2fc31ex330-nlc-593'

app = Flask(__name__)

@app.route('/')
def Welcome():
    return app.send_static_file('sentiment.html') #this was changed

@app.route('/analyze', methods=['GET', 'POST'])
def Analyze():
    comment_text = request.form['text']
    analysis_results = {}
    
    if comment_text != "":
        analysis_results = natural_language_classifier.classify(classifier_id, comment_text)
        
    return jsonify(analysis_results)
   
port = os.getenv('PORT', '5000')
if __name__ == "__main__":
	app.run(host='0.0.0.0', port=int(port), debug=True)

