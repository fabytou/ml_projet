from flask import request, jsonify
from app import app, db
from app.models import Student
from app.ml_model import predict_death_date

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    first_name = data['first_name']
    last_name = data['last_name']
    age = data['age']
    
    new_student = Student(first_name=first_name, last_name=last_name, age=age)
    db.session.add(new_student)
    db.session.commit()

    death_date = predict_death_date(age)
    return jsonify({
        'id': new_student.id,
        'first_name': first_name,
        'last_name': last_name,
        'age': age,
        'death_date': death_date
    })

@app.route('/students', methods=['GET'])
def get_students():
    students = Student.query.all()
    results = [{'id': student.id, 'first_name': student.first_name, 'last_name': student.last_name, 'age': student.age} for student in students]
    return jsonify(results)

@app.route('/predictions', methods=['GET'])
def get_predictions():
    students = Student.query.all()
    results = [{'id': student.id, 'first_name': student.first_name, 'last_name': student.last_name, 'age': student.age, 'death_date': predict_death_date(student.age)} for student in students]
    return jsonify(results)

@app.route('/predictions/<int:id>', methods=['DELETE'])
def delete_prediction(id):
    student = Student.query.get(id)
    if student:
        db.session.delete(student)
        db.session.commit()
        return jsonify({'message': 'Prediction deleted successfully'}), 200
    else:
        return jsonify({'message': 'Prediction not found'}), 404
