import random
from datetime import datetime

def predict_death_date(age):
    # Modèle humoristique de prédiction de la date de décès
    current_year = datetime.now().year
    predicted_death_age = age + (80 - age)  # Hypothèse simple que tout le monde vit jusqu'à 80 ans
    death_year = current_year + (predicted_death_age - age)
    
    # Générer un jour et un mois aléatoires
    death_month = random.randint(1, 12)
    death_day = random.randint(1, 28 if death_month == 2 else 30 if death_month in [4, 6, 9, 11] else 31)
    
    death_date = datetime(death_year, death_month, death_day).strftime('%d/%m/%Y')
    return death_date
