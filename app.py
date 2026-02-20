from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from database import db
from models import Task

app = Flask(__name__)
app.config.from_object(Config)

CORS(app)
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/")
def home():
    return {"message": "Task Manager API running"}

# CREATE
@app.route("/tasks", methods=["POST"])
def create_task():
    data = request.json

    if not data or not data.get("title"):
        return jsonify({"error": "Title is required"}), 400

    new_task = Task(
        title=data["title"],
        description=data.get("description"),
        priority=data.get("priority"),
        due_date=data.get("due_date")
    )

    db.session.add(new_task)
    db.session.commit()

    return jsonify(new_task.to_dict()), 201

# READ
@app.route("/tasks", methods=["GET"])
def get_tasks():
    tasks = Task.query.all()
    return jsonify([task.to_dict() for task in tasks])

# UPDATE
@app.route("/tasks/<int:id>", methods=["PUT"])
def update_task(id):
    task = Task.query.get_or_404(id)
    data = request.json

    task.status = data.get("status", task.status)
    task.priority = data.get("priority", task.priority)

    db.session.commit()

    return jsonify(task.to_dict())

# DELETE
@app.route("/tasks/<int:id>", methods=["DELETE"])
def delete_task(id):
    task = Task.query.get_or_404(id)

    db.session.delete(task)
    db.session.commit()

    return jsonify({"message": "Task deleted"})

# SUMMARY
@app.route("/summary", methods=["GET"])
def get_summary():
    total = Task.query.count()
    completed = Task.query.filter_by(status="Completed").count()
    pending = total - completed

    return jsonify({
        "total": total,
        "completed": completed,
        "pending": pending
    })


if __name__ == "__main__":
    app.run(debug=True)
