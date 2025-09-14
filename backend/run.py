import time
from app import app, db

# Ajouter une boucle pour attendre que la base de données soit prête
attempts = 0
max_attempts = 5
while attempts < max_attempts:
    try:
        db.create_all()
        print("Database connected successfully")
        break
    except Exception as e:
        print(f"Database connection failed: {e}")
        attempts += 1
        print(f"Retrying in 5 seconds... (Attempt {attempts}/{max_attempts})")
        time.sleep(5)
else:
    print("Failed to connect to the database after multiple attempts.")
    exit(1)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
